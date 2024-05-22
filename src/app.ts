import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/product/product.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRoutes);

const getAController = (req: Request, res: Response) => {
  res.json('App is running');
};

app.get('/', getAController);

export default app;
