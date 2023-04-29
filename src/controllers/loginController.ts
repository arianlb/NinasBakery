import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';
import { jwt } from "../helpers/generateJWT";

export const login = async (req: Request, res: Response) => { 
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            //req.log.warn(`El usuario ${username} no existe en la BD`);
            return res.status(404).json({ msg: 'Username incorrecto' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            //req.log.warn('La contraseña es incorrecta');
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        const token = await jwt(user._id.toString(), user.role, user.username);
        res.json(token);
        //req.log.info('Inicio sesion el usuario: ' + user.username);
        
    } catch (error: any) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
}