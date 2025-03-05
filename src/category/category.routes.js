import { Router } from "express";
import { addCategory, deleteCategoy } from "./category.controller.js";
const router = Router();

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Bad request
 */
router.post("/add",  addCategory);

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/delete", deleteCategoy);

export default router;
