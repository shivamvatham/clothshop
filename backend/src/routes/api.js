const express = require('express');
const helloController = require('../controllers/helloController');
const productController = require('../controllers/productController');

const router = express.Router();

// Hello World route
router.get('/hello', helloController.getHello);

// Product routes
router.post('/products', productController.upload.array('images', 5), productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/collection/:collection', productController.getProductsByCollection);
router.get('/products/:id', productController.getProduct);

module.exports = router;