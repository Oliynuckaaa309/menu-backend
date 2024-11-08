const configuration = require('../database');
exports.getSenders = async function (req, res) {
    try {
        const senders = await configuration.query("SELECT users.*, COALESCE(unread_counts.unread_count, 0) AS unread_count" +
            " FROM users JOIN (SELECT DISTINCT sender_id FROM messages) AS m ON users.id = m.sender_id" +
            " LEFT JOIN (SELECT sender_id, COUNT(*) AS unread_count FROM messages" +
            " WHERE read_by_support = FALSE GROUP BY sender_id) AS unread_counts ON users.id = unread_counts.sender_id" +
            " WHERE users.email != 'support@gmail.com' ORDER BY unread_count DESC;");
        res.json(senders.rows);

    } catch (err) {
        console.log(err)
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

exports.markMessageAsRead = async function (messageId) {
    try {
        await configuration.query("UPDATE messages SET read_by_support = true WHERE id=$1", [messageId])
    } catch (err) {
        console.log(err)
    }
}
