import { Router } from "express";
import { check } from 'express-validator';

import { userDelete, userGet, userPost, userPut, usersGet } from "../controllers/userController";
import { validate } from "../middlewares/validateFields";
import { userExistsById, usernameExists, isRoleValid } from '../helpers/dbValidators';

const router = Router();

router.get('/', usersGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], userGet);

router.post('/', [
    check('username', 'El username es obligatorio').notEmpty(),
    check('username').custom(usernameExists),
    check('password', 'El password es obligatorio').notEmpty(),
    check('role', 'El rol es obligatorio').notEmpty(),
    check('role').custom(isRoleValid),
    validate
], userPost);

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),
    validate
], userPut);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(userExistsById),
    validate
], userDelete);

export default router;