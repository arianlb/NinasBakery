import { Router } from "express";
import { productDelete, productGet, productPost, productPut, productsGet } from "../controllers/productController";

const router = Router();

router.get('/', productsGet);
router.get('/:id', productGet);
router.post('/', productPost);
router.put('/:id', productPut);
router.delete('/:id', productDelete);

export default router;