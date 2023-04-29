"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        req.log.warn(errors.array()[0].msg);
        return res.status(400).json(errors);
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=validateFields.js.map