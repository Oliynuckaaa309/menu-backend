const configuration = require("../database");

exports.getProducts = async (req, res) => {
    try {
        let result;
        console.log(req.query.categoryName)
        if (req.query.categoryName) {
            result = await configuration.query('SELECT products.* FROM products ' +
                'JOIN categories on products.category_id=categories.id ' +
                `WHERE categories.name = '${req.query.categoryName}'`);
        } else {
            result = await configuration.query('SELECT * FROM products');
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error retrieving products data from database');
    }


}
exports.addProduct = async (req, res) => {
    const { name, weight, price, ingredients, image, categoryName } = req.body;
    try {

        const categoryResult = await configuration.query(
            'SELECT id FROM categories WHERE name = $1',
            [categoryName]
        );

        if (categoryResult.rows.length === 0) {
            return res.status(400).send('Category not found');
        }

        const category_id = categoryResult.rows[0].id;
        const productResult = await configuration.query(
            'INSERT INTO products (name, weight, price, ingredients, image, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, weight, price, ingredients, image, category_id]
        );

        res.json(productResult.rows[0]);  // Повертаємо доданий продукт
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding product to the database');
    }
};
exports.editProduct = async (req, res) => {
    const id= req.params.id;
    const { name, weight, price, ingredients, image, categoryName } = req.body;
    try {
        const productExist = await configuration.query('SELECT * FROM products WHERE id = $1', [id]);
        if (productExist.rows.length === 0) {
            return res.status(400).send('Product not found');
        }
        const updatedProduct = await configuration.query(
            'UPDATE products SET name = $1, weight = $2, price = $3, ingredients = $4, image = $5, category_id = (SELECT id FROM categories WHERE name = $6) WHERE id = $7 RETURNING *',
            [name, weight, price, ingredients, image, categoryName, id]
        );

        res.json(updatedProduct.rows[0]);
    }
    catch(error){
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product in the database');
    }
}