import { Router } from "express";
import { generateInvoice } from "./factura.controller.js";
import { validateJWT } from "../middlewere/validar-jwt.js"; // Middleware para validar el JWT

const router = Router();

router.get("/generate", validateJWT, generateInvoice);

export default router;
