import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from "jsonwebtoken";

export const validateToken = (req: Request, res: Response, next: NextFunction) => { 
    const token = req.header('Authorization');
    if (!token) {
        //req.log.warn('No hay token en la peticion');
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid, role, username }: any = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'CualquierMierdadSecreta7');
        req.query.uid = uid;
        req.query.role = role;
        req.query.username = username;
        next();

    } catch (error: any) {
        res.status(401).json({ msg: 'Token no válido' });
        //req.log.warn('Token no valido');
    }
}