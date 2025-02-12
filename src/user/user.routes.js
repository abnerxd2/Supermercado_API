import { Router } from "express";
import {  listcustomer} from "../user/user.controller.js"; 
import { validateJWT } from "../middlewere/validate-jwt.js";
import { listcustomers } from "../middlewere/user-validators.js";

const router = Router();

// listar solo clientes Activos
router.get(
    "/customer",
    validateJWT,
    listcustomers,
    listcustomer
)
export default router;  