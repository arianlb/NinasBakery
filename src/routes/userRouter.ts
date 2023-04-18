import { Router } from "express";
import { userDelete, userGet, userPost, userPut, usersGet } from "../controllers/userController";

const router = Router();

router.get('/', usersGet);
router.get('/:id', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/:id', userDelete);

export default router;