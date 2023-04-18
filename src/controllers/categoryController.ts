import { Request, Response } from "express";

export const categoryGet = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'categoryGet',
        id
    });
}

export const categoriesGet = (req: Request, res: Response) => {
    res.json({
        msg: 'categoriesGet'
    });
}

export const categoryPost = (req: Request, res: Response) => {
    const { body } = req;
    res.json({
        msg: 'categoryPost',
        body
    });
}

export const categoryPut = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'categoryPut',
        id,
        body
    });
}

export const categoryDelete = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'categoryDelete',
        id
    });
}