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
exports.deleteProductFromCategory = void 0;
const category_1 = __importDefault(require("../models/category"));
const deleteProductFromCategory = (categoryName, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.default.findOne({ name: categoryName });
    if (category) {
        for (let i = 0; i < category.products.length; i++) {
            if (category.products[i].equals(productId)) {
                category.products.splice(i, 1);
                break;
            }
        }
        category.save();
    }
});
exports.deleteProductFromCategory = deleteProductFromCategory;
//# sourceMappingURL=deleteProductFromCategory.js.map