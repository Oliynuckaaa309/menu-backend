const express = require('express');
const {addUser} = require("../controllers/usersConroller");
const router = express.Router();

router.post('/', addUser);
module.exports = router;