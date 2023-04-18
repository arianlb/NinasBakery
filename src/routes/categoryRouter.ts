import { Router } from "express";
import { categoriesGet, categoryDelete, categoryGet, categoryPost, categoryPut } from "../controllers/categoryController";

const router = Router();

router.get('/', categoriesGet);
router.get('/:id', categoryGet);
router.post('/', categoryPost);
router.put('/:id', categoryPut);
router.delete('/:id', categoryDelete);

export default router;