import { NextFunction, Request, Response } from 'express';

export const hasAnyRole = (roles: string[]) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.role) { 
            return res.status(401).json({ msg: 'No hay rol en la petición' });
        }
        
        if (!roles.includes(req.query.role as string)) {
            return res.status(401).json({ msg: 'No tiene permisos para realizar esta acción' });
        }
        
        next();
    }
}