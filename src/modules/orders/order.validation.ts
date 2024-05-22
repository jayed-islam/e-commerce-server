import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }),
  productId: z.string({ required_error: 'Product Id is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});

export default orderValidationSchema;
