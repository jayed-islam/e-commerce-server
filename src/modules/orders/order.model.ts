import { Schema, model } from 'mongoose';
import { IOrderType } from './order.interface';
import { ProductModel } from '../product/product.model';

const orderSchema = new Schema<IOrderType>({
  email: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

orderSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const order = this;
  try {
    const product = await ProductModel.findOne({ _id: order.productId });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory.quantity < order.quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }

    product.inventory.quantity = product.inventory.quantity - order.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    product.save();
    next();
  } catch (error) {
    throw new Error('Something was wrong');
  }
});

export const OrderModel = model('Order', orderSchema);
