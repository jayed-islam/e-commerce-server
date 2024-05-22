import { IProductTypes } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: IProductTypes) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

const updateSingleProductFromDB = async (
  updatedData: Partial<IProductTypes>,
  _id: string,
) => {
  const result = await ProductModel.findOneAndUpdate({ _id }, updatedData, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
