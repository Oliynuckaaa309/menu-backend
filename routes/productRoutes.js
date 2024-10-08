const express = require('express');
const {getProducts, addProduct, editProduct} = require("../controllers/productsController");
const router = express.Router();
const {upload} = require("../middleware/imagesMiddware");

router.get('/', getProducts);
router.post('/', upload.single('image'), addProduct);
router.put('/:id', upload.single('image'), editProduct);

module.exports = router;
