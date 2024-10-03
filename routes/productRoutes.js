const express = require('express');
const {getProducts, addProduct, editProduct} = require("../controllers/productsController");
const bodyParser = require("body-parser");
const router = express.Router();

const jsonParser = bodyParser.json()

router.get('/', getProducts);
router.post('/', jsonParser, addProduct);
router.put('/:id', jsonParser, editProduct);


module.exports = router;
