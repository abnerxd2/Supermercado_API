import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, assignClientRole,loginValidator } from "../middlewere/user-validators.js"

const router = Router();


router.post(
    "/register",
    registerValidator, 
    assignClientRole,
    register
);
router.post( 
    "/login",
    loginValidator,
    login)
export default router;