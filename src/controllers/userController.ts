import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';

export const usersGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.json(users);
        
    } catch (error: any) {
        next(error);
    }
}

export const userGet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'No existe el usuario con el id: ' + req.params.id });
        }

        res.json(user);

    } catch (error: any) {
        next(error);
    }
}

export const userPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, role } = req.body;
        const encryptedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
        const user = new User({ username, password: encryptedPassword, role });
        await user.save();
        res.json(user);

    } catch (error: any) {
        next(error);
    }
}

export const userPut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id, password, ...rest } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(user);

    } catch (error: any) {
        next(error);
    }
}

export const userDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado' });

    } catch (error: any) {
        next(error);
    }
}