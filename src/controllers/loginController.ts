import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";

import User from '../models/user';
import { jwt } from "../helpers/generateJWT";

export const login = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const username = req.body.username.toString();
        const password = req.body.password.toString();
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'Username o Password incorrecto' });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(404).json({ msg: 'Username o Password incorrecto' });
        }

        const token = await jwt(user._id.toString());
        res.json(token);
        
    } catch (error: any) {
        next(error);
    }
}

//Funcion de prueba experimental
export const loading = async (req: Request, res: Response) => { 
    const msg = await loginController();
    res.json({msg});
}

const loginController = async () => {
    return new Promise((resolve, reject) => { 
        try {
            setTimeout(() => { 
                resolve('ok');
            }, 7000);
        } catch (error) {
            reject('error');
        }
    });
}