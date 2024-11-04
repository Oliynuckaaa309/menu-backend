const configuration = require('../database');
exports.getSenders = async function (req, res) {
    try {
        const senders = await configuration.query("SELECT * FROM users" +
            " JOIN (SELECT DISTINCT sender_id FROM messages) as m ON users.id=m.sender_id" +
            " WHERE users.email != 'support@gmail.com'");
        res.json(senders.rows);

    } catch (err) {
        res.status(500).send('Error during retrieving senders');
    }
}

exports.getPreviousMessages = async function (req, res) {
    const userId = req.params.id;
    try {
        const messages = await configuration.query("SELECT * FROM messages WHERE sender_id=$1 OR recipient_id=$1 ORDER BY \"createdAt\" ASC ", [userId])
        res.json(messages.rows);
    } catch (err) {
        console.log(err)
        res.status(500).send('Error during retrieving previous messages');
    }
}
