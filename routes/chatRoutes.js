const express = require('express');
const { getSenders, getPreviousMessages } = require('../controllers/chatController');
const router = express.Router();

router.get('/user/:id', getPreviousMessages);
router.get('/senders', getSenders);
module.exports = router;
