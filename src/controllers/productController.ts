import { NextFunction, Request, Response } from "express";

import Category from '../models/category';
import Product from '../models/product';
import { deleteFile, upload } from "../helpers/uploadPicture";
import { deleteProductFromCategory } from '../helpers/deleteProductFromCategory';

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
        const picture = 'https://res.cloudinary.com/dqjs90sqs/image/upload/v1687710346/no-image_nnyrxi.jpg';
        const product = new Product({ name, description, price, inStock, category: category.name, picture });
        category.products.push(product._id);

        await Promise.all([product.save(), category.save()]);
        res.json(product);

    } catch (error: any) {
        next(error);
    }
}

export const productPut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { picture, category, ...rest } = req.body;
        
        const productDB = await Product.findById(req.params.id, '_id category');
        if (!productDB) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }

        if (category && category !== productDB.category) {
            const categoryDB = await Category.findOne({ name: category });
            if (!categoryDB) {
                return res.status(404).json({ msg: 'No existe la categoria con el nombre: ' + category });
            }
            deleteProductFromCategory(productDB.category, productDB._id);
            categoryDB.products.push(productDB._id);
            categoryDB.save();
            rest.category = category;
        }

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
        
        deleteProductFromCategory(product.category, product._id);
        
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