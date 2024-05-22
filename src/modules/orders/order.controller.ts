import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderServices } from './order.service';
import { ProductModel } from '../product/product.model';

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parsedOrderData = orderValidationSchema.parse(orderData);

    const product = await ProductModel.findOne({
      _id: parsedOrderData.productId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    if (product!.inventory.quantity < parsedOrderData.quantity) {
      return res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    product!.inventory.quantity -= parsedOrderData.quantity;
    product!.inventory.inStock = product!.inventory.quantity > 0;

    await product?.save();

    const result = await orderServices.createOrderIntoDB(parsedOrderData);

    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong!',
      error,
    });
  }
};

// get all order with get email based user order
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    const result = await orderServices.getAllOrderFromDB(email as string);

    if (email && result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        email !== null
          ? 'Orders fetched successfully for user email!'
          : 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'something went wrong',
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
