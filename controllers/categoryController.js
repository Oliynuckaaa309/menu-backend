const configuration = require("../database");


exports.getAllCategories = async function (req, res) {
        try {
            const result = await configuration.query('SELECT * FROM categories');
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving sets data from database');
        }
}