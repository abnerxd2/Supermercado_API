import { Router } from "express";
import { generateInvoice } from "./factura.controller.js";
import { validateJWT } from "../middlewere/validar-jwt.js"; // Middleware para validar el JWT

const router = Router();

/**
 * @swagger
 * /generate:
 *   get:
 *     summary: Generate an invoice
 *     security:
 *       - bearerAuth: []
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Invoice generated successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/generate", validateJWT, generateInvoice);

export default router;
