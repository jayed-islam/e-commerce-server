import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parsedOrderData = orderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderIntoDB(parsedOrderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '',
      error,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrderFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
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