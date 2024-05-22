import { z } from 'zod';

const varientsSchema = z.object({
  type: z.string({ required_error: 'Varient type is required' }),
  value: z.string({ required_error: 'Varient value is required' }),
});

const inventorySchema = z.object({
  quantity: z.number({ required_error: 'Quantity is required' }),
  inStock: z.boolean({ required_error: 'inStock is required' }),
});

const productValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  description: z.string({ required_error: 'Description is required' }),
  price: z.number({ required_error: 'Price is required' }),
  category: z.string({ required_error: 'Category is required' }),
  tags: z.array(z.string(), { required_error: 'Tags is required' }),
  variants: z.array(varientsSchema),
  inventory: inventorySchema,
});

export default productValidationSchema;
