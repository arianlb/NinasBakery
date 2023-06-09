import { NextFunction, Request, Response } from 'express';

export const hasAnyRole = (...roles: string[]) => { 
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.authUserRole) { 
            return res.status(403).json({ msg: 'No hay rol en la petición' });
        }
        
        if (!roles.includes(req.query.authUserRole as string)) {
            return res.status(403).json({ msg: 'No tiene permisos para realizar esta acción' });
        }
        
        next();
    }
}