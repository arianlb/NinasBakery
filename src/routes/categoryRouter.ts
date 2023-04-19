import { Router } from "express";
import { check } from 'express-validator';

import { categoriesGet, categoryDelete, categoryGet, categoryPost, categoryPut } from "../controllers/categoryController";
import { validate } from "../middlewares/validateFields";
import { categoryExistsById } from "../helpers/dbValidators";

const router = Router();

router.get('/', categoriesGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(categoryExistsById),
    validate
], categoryGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    validate
], categoryPost);

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(categoryExistsById),
    validate
], categoryPut);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(categoryExistsById),
    validate
], categoryDelete);

export default router;