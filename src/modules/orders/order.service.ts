import { IOrderType } from './order.interface';
import { OrderModel } from './order.model';

// create order service
const createOrderIntoDB = async (order: IOrderType) => {
  const result = await OrderModel.create(order);
  return result;
};

// get all order
const getAllOrderFromDB = async (email: string | null) => {
  if (!email) {
    const result = await OrderModel.find();
    return result;
  }
  const result = await OrderModel.find({ email });
  return result;
};

export const orderServices = {
  getAllOrderFromDB,
  createOrderIntoDB,
};
