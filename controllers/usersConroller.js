const configuration = require("../database");
exports.addUser= async function (req, res) {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    try {
        const newUser = await configuration.query(
            'INSERT INTO users (firstName, lastName, email, password, isAdmin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstName, lastName, email, password, isAdmin]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding new user');
    }
}