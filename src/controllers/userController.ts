import { Request, Response } from "express";

import User from '../models/user';

export const usersGet = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
}

export const userGet = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'userGet',
        id
    });
}

export const userPost = (req: Request, res: Response) => {
    const { body } = req;
    res.json({
        msg: 'userPost',
        body
    });
}

export const userPut = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'userPut',
        id,
        body
    });
}

export const userDelete = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        msg: 'userDelete',
        id
    });
}