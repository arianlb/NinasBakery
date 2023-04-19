import { Router } from "express";
import { check } from 'express-validator';

import { validate } from "../middlewares/validateFields";
import { login } from "../controllers/loginController";

const router = Router();

router.post('/', [
    check('username', 'El username es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validate
], login)

export default router;