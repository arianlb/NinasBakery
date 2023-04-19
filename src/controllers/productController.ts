import { Request, Response } from "express";

import Category from '../models/category';
import Product from '../models/product';

export const productGet = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) { 
            req.log.warn(`El producto con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        res.json(product);
        req.log.info('Obtuvo el producto con el id: ' + req.params.id);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const productsGet = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
        req.log.info('Obtuvo todos los productos');
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const productPost = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }

        const { name, description, price, offer } = req.body;
        const product = new Product({ name, description, price, offer, category: category.name });
        category.products.push(product._id);

        await Promise.all([product.save(), category.save()]);
        res.json(product);
        req.log.info('Creo el producto: ' + product._id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const productPut = async (req: Request, res: Response) => {
    try {
        const { _id, picture, ...rest } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(product);
        req.log.info('Actualizo el producto con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}

export const productDelete = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado' });
        req.log.info('Elimino el producto con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
}