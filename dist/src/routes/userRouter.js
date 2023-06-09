"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
//import { validateToken } from "../middlewares/validateJWT";
//import { hasAnyRole } from "../middlewares/validateRole";
const dbValidators_1 = require("../helpers/dbValidators");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', /*[
    validateToken,
    hasAnyRole('ROLE_ADMIN')
],*/ userController_1.usersGet);
router.get('/:id', [
    //validateToken,
    //hasAnyRole('ROLE_ADMIN'),
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], userController_1.userGet);
router.post('/', [
    //validateToken,
    //hasAnyRole('ROLE_ADMIN'),
    (0, express_validator_1.check)('username', 'El username es obligatorio').notEmpty(),
    (0, express_validator_1.check)('username').custom(dbValidators_1.usernameExists),
    (0, express_validator_1.check)('password', 'El password es obligatorio').notEmpty(),
    (0, express_validator_1.check)('role', 'El rol es obligatorio').notEmpty(),
    (0, express_validator_1.check)('role').custom(dbValidators_1.isRoleValid),
    validateFields_1.validate
], userController_1.userPost);
router.put('/:id', [
    //validateToken,
    //hasAnyRole('ROLE_ADMIN'),
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.userExistsById),
    (0, express_validator_1.check)('role').custom(dbValidators_1.isRoleValid),
    validateFields_1.validate
], userController_1.userPut);
router.delete('/:id', [
    //validateToken,
    //hasAnyRole('ROLE_ADMIN'),
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.userExistsById),
    validateFields_1.validate
], userController_1.userDelete);
exports.default = router;
//# sourceMappingURL=userRouter.js.map