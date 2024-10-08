const jwt = require('jsonwebtoken');
require('dotenv').config();
const configuration = require("../database");
const bcrypt = require("bcryptjs");

exports.loginUser = async function (req, res) {
    const {email, password} = req.body;
    try {
        const userResult = await configuration.query('SELECT * FROM users WHERE email=$1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        const user = userResult.rows[0];

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send('Invalid password or email');
        }
        const token = jwt.sign({
            userId: user.id,
            email: user.email
        }, process.env.JWT_SECRET);

        res.json({message: 'User logged in successfully', token, user});
    } catch (error) {
        console.log(error);
        res.status(5000).send('Server Error');
    }
}