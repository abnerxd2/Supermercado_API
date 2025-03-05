import { Router } from 'express';
import { addProduct, listProducts,  updateProduct, deleteProduct,filterProducts } from './product.controller.js'; 

const router = Router();


router.post('/add', addProduct);


router.get('/', listProducts);

router.get('/:id');


router.get("/filter", filterProducts);


router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
