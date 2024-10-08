const configuration = require("../database");

exports.getAllCategories = async function (req, res) {
    try {
        const result = await configuration.query('SELECT * FROM categories');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving sets data from database');
    }
}

exports.addCategory = async (req, res) => {
    const {name} = req.body;
    const imagePath = req.file ? `http://localhost:8080/${req.file.path}` : '';

    try {
        const result = await configuration.query(
            'INSERT INTO categories (name, image) VALUES ($1, $2) RETURNING *',
            [name, imagePath]
        );
        const newCategory = result.rows[0];
        res.status(201).json(newCategory);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error adding new category');
    }
};

exports.editCategory = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    const imagePath = req.file ? `http://localhost:8080/${req.file.path}` : '';
    try {
        const categoryExist = await configuration.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (categoryExist.rows.length === 0) {
            return res.status(400).send('Category not found');
        }
        let updatedCategory;
        if (imagePath) {
            updatedCategory = await configuration.query(
                'UPDATE categories SET name = $1, image = $2 WHERE id = $3  RETURNING *',
                [name, imagePath, id]
            );
        }
        else {
            updatedCategory = await configuration.query(
                'UPDATE categories SET name = $1 WHERE id = $2  RETURNING *',
                [name, id]
            );
        }

        res.json(updatedCategory.rows[0]);

    }
    catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send('Error updating category in the database');
    }
}