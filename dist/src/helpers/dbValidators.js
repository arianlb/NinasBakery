"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoleValid = exports.userExistsById = exports.usernameExists = exports.productExistsById = exports.categoryHasNotProducts = exports.categoryExistsByName = void 0;
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
const categoryExistsByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (name) {
        const category = yield category_1.default.findOne({ name });
        if (!category) {
            throw new Error(`La categoria con el nombre ${name} no existe en la BD`);
        }
    }
});
exports.categoryExistsByName = categoryExistsByName;
const categoryHasNotProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.default.findById(id).populate('products');
    if (!category) {
        throw new Error(`La categoria con el id ${id} no existe en la BD`);
    }
    if (category.products.length > 0) {
        throw new Error(`La categoria con el id ${id} tiene productos asociados`);
    }
});
exports.categoryHasNotProducts = categoryHasNotProducts;
const productExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(id);
    if (!product) {
        throw new Error(`El producto con el id ${id} no existe en la BD`);
    }
});
exports.productExistsById = productExistsById;
const usernameExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_1.default.findOne({ username });
    if (exists) {
        throw new Error(`El nombre de usuario ${username} ya existe en la BD`);
    }
});
exports.usernameExists = usernameExists;
const userExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id);
    if (!user) {
        throw new Error(`El usuario con el id ${id} no existe en la BD`);
    }
});
exports.userExistsById = userExistsById;
const isRoleValid = (role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_USER') {
        throw new Error(`El rol ${role} no esta permitido`);
    }
});
exports.isRoleValid = isRoleValid;
//# sourceMappingURL=dbValidators.js.map