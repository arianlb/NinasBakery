import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //req.log.warn(errors.array()[0].msg);
        return res.status(400).json(errors);
    }

    next();
}