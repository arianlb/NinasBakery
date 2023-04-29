"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productController_1 = require("../controllers/productController");
const validateFields_1 = require("../middlewares/validateFields");
const dbValidators_1 = require("../helpers/dbValidators");
const validateFile_1 = require("../middlewares/validateFile");
const router = (0, express_1.Router)();
router.get('/', productController_1.productsGet);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], productController_1.productGet);
router.get('/category/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], productController_1.productsByCategory);
router.post('/category/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], productController_1.productPost);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.productExistsById),
    validateFields_1.validate
], productController_1.productPut);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], productController_1.productDelete);
router.put('/:id/picture', [
    validateFile_1.validateUpload,
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], productController_1.updatePicture);
exports.default = router;
//# sourceMappingURL=productRouter.js.map