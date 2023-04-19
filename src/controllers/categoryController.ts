import { Request, Response } from "express";

import Category from '../models/category';

export const categoryGet = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        
        res.json(category);
        req.log.info('Obtuvo la categoria con el id: ' + req.params.id);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const categoriesGet = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.json(categories);
        req.log.info('Obtuvo todas las categorias');
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const categoryPost = async (req: Request, res: Response) => {
    try {
        const category = new Category({ name: req.body.name });
        await category.save();
        res.json(category);
        req.log.info('Creo la categoria: ' + category.name);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const categoryPut = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(category);
        req.log.info('Actualizo la categoria con el id: ' + req.params.id);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const categoryDelete = async (req: Request, res: Response) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ id: req.params.id });
        req.log.info('Elimino la categoria con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}