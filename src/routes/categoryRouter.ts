import { Router } from "express";
import { check } from 'express-validator';

import { validate } from "../middlewares/validateFields";
//import { validateToken } from "../middlewares/validateJWT";
//import { hasAnyRole } from "../middlewares/validateRole";
import { validateUpload } from "../middlewares/validateFile";
import { categoryHasNotProducts } from "../helpers/dbValidators";

import { categoriesGet, categoryDelete, categoryGet, categoryGetNames, categoryPost, categoryPut, updatePicture } from "../controllers/categoryController";

const router = Router();

router.get('/', categoriesGet);

router.get('/names', categoryGetNames);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], categoryGet);

router.post('/', [
    //validateToken,
    //hasAnyRole('ROLE_ADIMN'),
    check('name', 'El nombre es obligatorio').notEmpty(),
    validate
], categoryPost);

router.put('/:id', [
    //validateToken,
    //hasAnyRole('ROLE_ADIMN'),
    check('id', 'No es un Id valido').isMongoId(),
    check('name', 'El nombre es obligatorio').notEmpty(),
    validate
], categoryPut);

router.delete('/:id', [
    //validateToken,
    //hasAnyRole('ROLE_ADIMN'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(categoryHasNotProducts),
    validate
], categoryDelete);

router.put('/:id/picture', [
    //validateToken,
    //hasAnyRole('ROLE_ADIMN'),
    validateUpload,
    check('id', 'No es un Id valido').isMongoId(),
    validate
], updatePicture);

export default router;