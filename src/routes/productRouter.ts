import { Router } from "express";
import { check } from 'express-validator';

import { productDelete, productGet, productPost, productPut, productsGet } from "../controllers/productController";
import { validate } from "../middlewares/validateFields";

const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productGet);

router.post('/', productPost);

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productPut);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validate
], productDelete);

export default router;