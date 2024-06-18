import express from 'express';
import { getAllProducts, getProductById, getProductsByCategory, getCategories } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/category/:category', getProductsByCategory);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
