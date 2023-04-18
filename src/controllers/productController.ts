import { Request, Response } from "express";

export const productGet = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'productGet',
        id
    });
}

export const productsGet = (req: Request, res: Response) => {
    res.json({
        msg: 'productsGet'
    });
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