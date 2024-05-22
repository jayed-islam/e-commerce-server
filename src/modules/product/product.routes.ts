import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

router.get('/:productId', productController.getSingleProduct);
router.put('/:productId', productController.updateSingleProduct);
router.delete('/:productId', productController.deleteSingleProduct);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProduct);

export const productRoutes = router;
