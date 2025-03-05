import { Router } from 'express';
import { addProduct, listProducts,  updateProduct, deleteProduct,filterProducts } from './product.controller.js'; 

const router = Router();

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 */
router.post('/add', addProduct);

/**
 * @swagger
 * /:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', listProducts);

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Filter products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Filtered products
 */
router.get("/filter", filterProducts);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put('/:id', updateProduct);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', deleteProduct);

export default router;
