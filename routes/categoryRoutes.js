const express = require('express');
const router = express.Router();
const {getAllCategories, addCategory, editCategory} = require("../controllers/categoryController");
const {upload} = require("../middleware/imagesMiddware");

router.get('/', getAllCategories);
router.post('/', upload.single('image'), addCategory);
router.put('/:id', upload.single('image'), editCategory);
module.exports = router;

