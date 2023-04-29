import { NextFunction, Request, Response } from 'express';

export const validateUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        //req.log.warn('No hay archivo que subir');
        return res.status(400).json({ msg: 'No hay archivo que subir' });
    }

    next();
}