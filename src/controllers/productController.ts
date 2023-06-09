import { NextFunction, Request, Response } from "express";

import Category from '../models/category';
import Product from '../models/product';
import { deleteFile, upload } from "../helpers/uploadPicture";

export const productGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) { 
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        res.json(product);
        
    } catch (error: any) {
        next(error);
    }
}

export const productsGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        res.json(products);
        
    } catch (error: any) {
        next(error);
    }
}

export const productsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id).populate('products');
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        res.json(category.products);

    } catch (error: any) {
        next(error);
    }
}

export const productPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }

        const { name, description, price, inStock } = req.body;
        const product = new Product({ name, description, price, inStock, category: category.name });
        category.products.push(product._id);

        await Promise.all([product.save(), category.save()]);
        res.json(product);

    } catch (error: any) {
        next(error);
    }
}

export const productPut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, picture, category, ...rest } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(product);

    } catch (error: any) {
        next(error);
    }
}

export const productDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id, '_id category picture');
        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }

        if (product.picture && product.picture.length > 1) {
            deleteFile(product.picture);
        }
        
        await deleteProductFromCategory(product.category, product._id);
        
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado' });

    } catch (error: any) {
        next(error);
    }
}

export const updatePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }

        if (product.picture && product.picture.length > 1) {
            deleteFile(product.picture);
        }

        product.picture = await upload(req.files!.file) || '';
        await product.save();
        res.json(product);

    } catch (error: any) {
        next(error);
    }
}

const deleteProductFromCategory = async (categoryName: string, productId: any) => { 
    const category = await Category.findOne({ name: categoryName });
    if (category) {
        for (let i = 0; i < category.products.length!; i++) {
            if (category.products[i].equals(productId)) {
                category.products.splice(i, 1);
                break;
            }
        }
        category.save();
    }
}