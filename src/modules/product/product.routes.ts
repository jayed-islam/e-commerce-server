import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

// get single product
router.get('/:productId', productController.getSingleProduct);

// update partial update of product
router.put('/:productId', productController.updateSingleProduct);

// delete product fully from database
router.delete('/:productId', productController.deleteSingleProduct);

// create a product
router.post('/', productController.createProduct);

// get all product with search based product
router.get('/', productController.getAllProduct);

export const productRoutes = router;
