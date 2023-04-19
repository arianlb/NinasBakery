import { Request, Response } from "express";

import Product from '../models/product';

export const productGet = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    res.json({
        msg: 'productGet'
    });
}

export const productsGet = async (req: Request, res: Response) => {
    const products = await Product.find();
    req.log.info('Obtuvo todos los productos');
    res.json(products);
}

export const productPost = (req: Request, res: Response) => {
    const { body } = req;
    res.json({
        msg: 'productPost',
        body
    });
}

export const productPut = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'productPut',
        id,
        body
    });
}

export const productDelete = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'productDelete',
        id
    });
}