import { Router } from "express";
import { check } from 'express-validator';

import { categoriesGet, categoryDelete, categoryGet, categoryPost, categoryPut, updatePicture } from "../controllers/categoryController";
import { validate } from "../middlewares/validateFields";
import { categoryExistsById } from "../helpers/dbValidators";
//import { validateUpload } from "../middlewares/validateFile";

const router = Router();

router.get('/', categoriesGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
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

router.put('/:id/picture', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], updatePicture);

export default router;