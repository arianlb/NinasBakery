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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePicture = exports.productDelete = exports.productPut = exports.productPost = exports.productsByCategory = exports.productsGet = exports.productGet = void 0;
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
const uploadPicture_1 = require("../helpers/uploadPicture");
const deleteProductFromCategory_1 = require("../helpers/deleteProductFromCategory");
const productGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.productGet = productGet;
const productsGet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
});
exports.productsGet = productsGet;
const productsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id).populate('products');
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        res.json(category.products);
    }
    catch (error) {
        next(error);
    }
});
exports.productsByCategory = productsByCategory;
const productPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        const { name, description, price, inStock } = req.body;
        const picture = 'https://res.cloudinary.com/dqjs90sqs/image/upload/v1687710346/no-image_nnyrxi.jpg';
        const product = new product_1.default({ name, description, price, inStock, category: category.name, picture });
        category.products.push(product._id);
        yield Promise.all([product.save(), category.save()]);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.productPost = productPost;
const productPut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { picture, category } = _a, rest = __rest(_a, ["picture", "category"]);
        const productDB = yield product_1.default.findById(req.params.id, '_id category');
        if (!productDB) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        if (category && category !== productDB.category) {
            const categoryDB = yield category_1.default.findOne({ name: category });
            if (!categoryDB) {
                return res.status(404).json({ msg: 'No existe la categoria con el nombre: ' + category });
            }
            (0, deleteProductFromCategory_1.deleteProductFromCategory)(productDB.category, productDB._id);
            categoryDB.products.push(productDB._id);
            categoryDB.save();
            rest.category = category;
        }
        const product = yield product_1.default.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.productPut = productPut;
const productDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id, '_id category picture');
        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        if (product.picture && product.picture.length > 1) {
            (0, uploadPicture_1.deleteFile)(product.picture);
        }
        (0, deleteProductFromCategory_1.deleteProductFromCategory)(product.category, product._id);
        yield product_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado' });
    }
    catch (error) {
        next(error);
    }
});
exports.productDelete = productDelete;
const updatePicture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        if (product.picture && product.picture.length > 1) {
            (0, uploadPicture_1.deleteFile)(product.picture);
        }
        product.picture = (yield (0, uploadPicture_1.upload)(req.files.file)) || '';
        yield product.save();
        res.json(product);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePicture = updatePicture;
//# sourceMappingURL=productController.js.map