import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/product/product.routes';
import { orderRoutes } from './modules/orders/order.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes

// product routes
app.use('/api/products', productRoutes);
// order routes
app.use('/api/orders', orderRoutes);

const getAController = (_req: Request, res: Response) => {
  res.json('App is running');
};

app.get('/', getAController);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((_req, res, _next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
