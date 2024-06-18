import express from 'express';
import * as CarritoController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', CarritoController.getCarts);
router.get('/:user_Id', CarritoController.getCartByUserId);
router.post('/add', CarritoController.addToCart);
router.put('/update', CarritoController.updateCartItem);
router.delete('/:user_Id', CarritoController.deleteCartByUserId);

export default router;