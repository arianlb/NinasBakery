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
exports.updatePicture = exports.categoryDelete = exports.categoryPut = exports.categoryPost = exports.categoryGetNames = exports.categoriesGet = exports.categoryGet = void 0;
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
const uploadPicture_1 = require("../helpers/uploadPicture");
const categoryGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        res.json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryGet = categoryGet;
const categoriesGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find();
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.categoriesGet = categoriesGet;
const categoryGetNames = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find({}, '_id name');
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryGetNames = categoryGetNames;
const categoryPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new category_1.default({ name: req.body.name });
        category.picture = 'https://res.cloudinary.com/dqjs90sqs/image/upload/v1687710346/no-image_nnyrxi.jpg';
        yield category.save();
        res.json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryPost = categoryPost;
const categoryPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const categoryDB = yield category_1.default.findById(req.params.id).populate('products');
        if (!categoryDB) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        const products = categoryDB === null || categoryDB === void 0 ? void 0 : categoryDB.products;
        if (products) {
            yield product_1.default.updateMany({ _id: { $in: products } }, { category: name });
        }
        const category = yield category_1.default.findByIdAndUpdate(req.params.id, { name }, { new: true });
        res.json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.categoryPut = categoryPut;
const categoryDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        if (category.picture && category.picture.length > 1) {
            (0, uploadPicture_1.deleteFile)(category.picture);
        }
        yield category_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Categoria Eliminada' });
    }
    catch (error) {
        next(error);
    }
});
exports.categoryDelete = categoryDelete;
const updatePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        if (category.picture && category.picture.length > 1) {
            (0, uploadPicture_1.deleteFile)(category.picture);
        }
        category.picture = (yield (0, uploadPicture_1.upload)(req.files.file)) || '';
        yield category.save();
        res.json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePicture = updatePicture;
//# sourceMappingURL=categoryController.js.map