const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Rutas de productos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/categories', productController.getCategories);

module.exports = router;
