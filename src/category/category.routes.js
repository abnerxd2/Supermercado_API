import { Router } from "express";
import { addCategory, deleteCategoy } from "./category.controller.js";
const router = Router();


router.post("/add",  addCategory);


router.delete("/delete", deleteCategoy);

export default router;
