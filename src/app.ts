import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/product/product.routes';
import { orderRoutes } from './modules/orders/order.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const getAController = (req: Request, res: Response) => {
  res.json('App is running');
};

app.get('/', getAController);

export default app;
