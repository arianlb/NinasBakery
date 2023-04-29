import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';

export const usersGet = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
        //req.log.info('Obtuvo todos los usuarios')
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const userGet = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            //req.log.warn(`El usuario con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe el usuario con el id: ' + req.params.id });
        }

        res.json(user);
        //req.log.info('Obtuvo el usuario con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const userPost = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        const encryptedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync());
        const user = new User({ username, password: encryptedPassword, role });
        await user.save();
        res.json(user);
        //req.log.info('Creo el usuario: ' + user.username);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const userPut = async (req: Request, res: Response) => {
    try {
        const { _id, password, ...rest } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(user);
        //req.log.info('Actualizo el usuario con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}

export const userDelete = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado' });
        //req.log.info('Elimino el usuario con el id: ' + req.params.id);

    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}