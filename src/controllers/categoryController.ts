import { NextFunction, Request, Response } from "express";

import Category from '../models/category';
import Product from '../models/product';
import { deleteFile, upload } from "../helpers/uploadPicture";

export const categoryGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        
        res.json(category);
        
    } catch (error: any) {
        next(error);
    }
}

export const categoriesGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        res.json(categories);
        
    } catch (error: any) {
        next(error);
    }
}

export const categoryGetNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find({}, '_id name');
        res.json(categories);
        
    } catch (error: any) {
        next(error);
    }
}

export const categoryPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = new Category({ name: req.body.name });
        category.picture = 'https://res.cloudinary.com/dqjs90sqs/image/upload/v1687710346/no-image_nnyrxi.jpg';
        await category.save();
        res.json(category);
        
    } catch (error: any) {
        next(error);
    }
}

export const categoryPut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const categoryDB = await Category.findById(req.params.id).populate('products');
        if (!categoryDB) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        
        const products = categoryDB?.products;
        if (products) {
            await Product.updateMany({ _id: { $in: products } }, { category: name });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(category);
        
    } catch (error: any) {
        next(error);
    }
}

export const categoryDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        if (category.picture && category.picture.length > 1) {
            deleteFile(category.picture);
        }
        
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Categoria Eliminada' });

    } catch (error: any) {
        next(error);
    }
}

export const updatePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }

        if (category.picture && category.picture.length > 1) {
            deleteFile(category.picture);
        }

        category.picture = await upload(req.files!.file) || '';
        await category.save();
        res.json(category);

    } catch (error: any) {
        next(error);
    }
}