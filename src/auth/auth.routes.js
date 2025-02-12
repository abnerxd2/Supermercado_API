import { Router } from "express"
import { register } from "./auth.controller.js"
import { registerValidator, assignClientRole } from "../middlewere/user-validators.js"

const router = Router();

// metodo rejistrar
router.post(
    "/register",
    registerValidator, 
    assignClientRole,
    register
);

export default router;