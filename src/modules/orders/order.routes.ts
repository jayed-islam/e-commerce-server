import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();

// create order
router.post('/', orderController.createOrder);

// get all order
router.get('/', orderController.getAllOrder);

export const orderRoutes = router;
