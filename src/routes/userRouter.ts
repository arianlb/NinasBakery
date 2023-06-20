import { Router } from "express";
import { check } from 'express-validator';

import { validate } from "../middlewares/validateFields";
import { validateToken } from "../middlewares/validateJWT";
import { hasAnyRole } from "../middlewares/validateRole";
import { userExistsById, usernameExists, isRoleValid } from '../helpers/dbValidators';

import { userDelete, userGet, userPost, userPut, usersGet } from "../controllers/userController";

const router = Router();

router.get('/', [
    validateToken,
    hasAnyRole('ROLE_ADMIN')
], usersGet);

router.get('/:id', [
    validateToken,
    hasAnyRole('ROLE_ADMIN'),
    check('id', 'No es un Id válido').isMongoId(),
    validate
], userGet);

router.post('/', [
    validateToken,
    hasAnyRole('ROLE_ADMIN'),
    check('username', 'El username es obligatorio').notEmpty(),
    check('username').custom(usernameExists),
    check('password', 'El password es obligatorio').notEmpty(),
    check('role', 'El rol es obligatorio').notEmpty(),
    check('role').custom(isRoleValid),
    validate
], userPost);

router.put('/:id', [
    validateToken,
    hasAnyRole('ROLE_ADMIN'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),
    validate
], userPut);

router.delete('/:id', [
    validateToken,
    hasAnyRole('ROLE_ADMIN'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(userExistsById),
    validate
], userDelete);

export default router;