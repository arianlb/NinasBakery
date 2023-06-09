import { Router } from "express";
import { check } from 'express-validator';

import { validate } from "../middlewares/validateFields";
//import { validateToken } from "../middlewares/validateJWT";
//import { hasAnyRole } from "../middlewares/validateRole";
import { validateUpload } from "../middlewares/validateFile";
import { productExistsById } from "../helpers/dbValidators";

import { productDelete, productGet, productPost, productPut, productsByCategory, productsGet, updatePicture } from "../controllers/productController";

const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productGet);

router.get('/category/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productsByCategory);

router.post('/category/:id', [
    // validateToken,
    // hasAnyRole('ROLE_ADMIN'),
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productPost);

router.put('/:id', [
    // validateToken,
    // hasAnyRole('ROLE_ADMIN'),
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(productExistsById),
    validate
], productPut);

router.delete('/:id', [
    // validateToken,
    // hasAnyRole('ROLE_ADMIN'),
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productDelete);

router.put('/:id/picture', [
    // validateToken,
    // hasAnyRole('ROLE_ADMIN'),
    validateUpload,
    check('id', 'No es un Id valido').isMongoId(),
    validate
], updatePicture);

export default router;