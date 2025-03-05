import { Router } from "express";
import {  listcustomer, } from "../user/user.controller.js"; 
import { validateJWT } from "../middlewere/validar-jwt.js";
import { listcustomers } from "../middlewere/user-validators.js";

const router = Router();

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: List active customers
 *     security:
 *       - bearerAuth: []
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of active customers
 *       401:
 *         description: Unauthorized
 */
// listar solo clientes Activos
router.get(
    "/customer",
    validateJWT,
    listcustomers,
    listcustomer
)

export default router;