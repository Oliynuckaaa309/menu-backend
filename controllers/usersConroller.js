const configuration = require('../database');
const bcrypt = require('bcryptjs');
exports.addUser = async function (req, res) {
    const {firstName, lastName, email, password, isAdmin} = req.body;
    try {
        const existingUser = await configuration.query('SELECT * FROM users WHERE email=$1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).send('User with this email already exists');
        }
        const hashedPassword = bcrypt.hashSync(password, 12);
        const newUser = await configuration.query(
            'INSERT INTO users ("firstName", "lastName", email, password, "isAdmin") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstName, lastName, email, hashedPassword, isAdmin]
        );

        res.status(201).json({message: 'User registered successfully', newUser});
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error adding new user');
    }
}
