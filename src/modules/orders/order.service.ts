import { IOrderType } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: IOrderType) => {
  const result = await OrderModel.create(order);
  return result;
};

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
