import { Request, Response } from 'express';
import { productService } from './product.service';
import productValidationSchema from './product.validation';

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product data is required',
      });
    }

    const zodParseData = productValidationSchema.parse(product);
    const result = await productService.createProductIntoDB(zodParseData);

    return res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'something went wrong',
      error: error,
    });
  }
};

// get all product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm || null;

    const products = await productService.getAllProductFromDB(
      searchTerm as string,
    );

    return res.status(200).json({
      success: true,
      message:
        searchTerm !== null
          ? `Products matching search term '${searchTerm}' fetched successfully!`
          : 'Products fetched successfully!',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'something went wrong',
      error: error,
    });
  }
};

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await productService.getSingleProductFromDB(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'something went wrong',
      error: error,
    });
  }
};

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const product = await productService.updateSingleProductFromDB(
      updatedData,
      productId,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'something went wrong',
      error: error,
    });
  }
};

// delete single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteSingleProductFromDB(productId);

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'something went wrong',
      error: error,
    });
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
