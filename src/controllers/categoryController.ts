import { Request, Response } from "express";

import Category from '../models/category';
import Product from '../models/product';
import { deleteFile, upload } from "../helpers/uploadPicture";

export const categoryGet = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            //req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        
        res.json(category);
        //req.log.info('Obtuvo la categoria con el id: ' + req.params.id);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const categoriesGet = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.json(categories);
        //req.log.info('Obtuvo todas las categorias');
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const categoryGetNames = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({}, '_id name');
        res.json(categories);
        //req.log.info('Obtuvo los nombres de las categorias');
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const categoryPost = async (req: Request, res: Response) => {
    try {
        const category = new Category({ name: req.body.name });
        await category.save();
        res.json(category);
        //req.log.info('Creo la categoria: ' + category._id);
        
    } catch (error: any) {
        res.status(500).json({ error });
        //req.log.error(error.messge);
    }
}

export const categoryPut = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const categoryDB = await Category.findById(req.params.id).populate('products');
        if (!categoryDB) {
            //req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        
        const products = categoryDB?.products;
        if (products) {
            await Product.updateMany({ _id: { $in: products } }, { category: name });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(category);
        //req.log.info('Actualizo la categoria con el id: ' + req.params.id);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const categoryDelete = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            //req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        if (category.picture && category.picture.length > 1) {
            deleteFile(category.picture);
        }
        
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Categoria Eliminada' });
        //req.log.info('Elimino la categoria con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const updatePicture = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            //req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }

        if (category.picture && category.picture.length > 1) {
            deleteFile(category.picture);
        }

        category.picture = await upload(req.files!.file) || '';
        await category.save();
        res.json(category);
        //req.log.info('Actualizo la imagen de la categoria: ' + category._id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}