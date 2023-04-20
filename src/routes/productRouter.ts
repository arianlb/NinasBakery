import { Router } from "express";
import { check } from 'express-validator';

import { productDelete, productGet, productPost, productPut, productsGet, updatePicture } from "../controllers/productController";
import { validate } from "../middlewares/validateFields";
import { productExistsById } from "../helpers/dbValidators";

const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productGet);

router.post('/category/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productPost);

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(productExistsById),
    validate
], productPut);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(productExistsById),
    validate
], productDelete);

router.put('/:id/picture', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], updatePicture);

export default router;