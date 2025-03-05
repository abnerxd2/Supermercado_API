import express from 'express';
import { addProductToCart, } from '../carrito/carrito.controller.js';
import { validateJWT } from '../middlewere/validar-jwt.js';

const router = express.Router();

/**
 * @swagger
 * /addcar:
 *   post:
 *     summary: Add a product to the cart
 *     security:
 *       - bearerAuth: []
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/addcar', validateJWT, addProductToCart);

export default router;
