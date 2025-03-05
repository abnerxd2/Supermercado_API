import express from 'express';
import { addProductToCart, } from '../carrito/carrito.controller.js';
import { validateJWT } from '../middlewere/validar-jwt.js';

const router = express.Router();


router.post('/addcar', validateJWT, addProductToCart);



export default router;
