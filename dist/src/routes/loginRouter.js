"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const loginController_1 = require("../controllers/loginController");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('username', 'El username es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').notEmpty(),
    validateFields_1.validate
], loginController_1.login);
exports.default = router;
//# sourceMappingURL=loginRouter.js.map