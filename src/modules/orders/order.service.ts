import { IOrderType } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: IOrderType) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const orderServices = {
  getAllOrderFromDB,
  createOrderIntoDB,
};
