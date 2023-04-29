"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoryController_1 = require("../controllers/categoryController");
const validateFields_1 = require("../middlewares/validateFields");
const dbValidators_1 = require("../helpers/dbValidators");
const validateFile_1 = require("../middlewares/validateFile");
const router = (0, express_1.Router)();
router.get('/', categoryController_1.categoriesGet);
router.get('/names', categoryController_1.categoryNamesGet);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], categoryController_1.categoryGet);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(),
    validateFields_1.validate
], categoryController_1.categoryPost);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(),
    validateFields_1.validate
], categoryController_1.categoryPut);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidators_1.categoryExistsById),
    validateFields_1.validate
], categoryController_1.categoryDelete);
router.put('/:id/picture', [
    validateFile_1.validateUpload,
    (0, express_validator_1.check)('id', 'No es un Id valido').isMongoId(),
    validateFields_1.validate
], categoryController_1.updatePicture);
exports.default = router;
//# sourceMappingURL=categoryRouter.js.map