import express from 'express';
import {
   addNewProduct,
   getAllProducts,
   updateProductById,
   deleteProductById,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', addNewProduct);

router.delete('/:id', deleteProductById);

router.put('/:id', updateProductById);

export default router;
