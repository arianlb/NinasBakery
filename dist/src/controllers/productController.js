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
const productGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            //req.log.warn(`El producto con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        res.json(product);
        //req.log.info('Obtuvo el producto con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.productGet = productGet;
const productsGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        res.json(products);
        //req.log.info('Obtuvo todos los productos');
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.productsGet = productsGet;
const productsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id).populate('products');
        if (!category) {
            //req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        res.json(category.products);
        //req.log.info('Obtuvo los productos de la categoria con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.productsByCategory = productsByCategory;
const productPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.default.findById(req.params.id);
        if (!category) {
            //req.log.warn(`La categoria con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe la categoria con el id: ' + req.params.id });
        }
        const { name, description, price, offer } = req.body;
        const product = new product_1.default({ name, description, price, offer, category: category.name });
        category.products.push(product._id);
        yield Promise.all([product.save(), category.save()]);
        res.json(product);
        //req.log.info('Creo el producto: ' + product._id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.productPost = productPost;
const productPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { _id, picture } = _a, rest = __rest(_a, ["_id", "picture"]);
        const product = yield product_1.default.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(product);
        //req.log.info('Actualizo el producto con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.productPut = productPut;
const productDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id, '_id category picture');
        if (!product) {
            //req.log.warn(`El producto con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        if (product.picture && product.picture.length > 1) {
            (0, uploadPicture_1.deleteFile)(product.picture);
        }
        const category = yield category_1.default.findOne({ name: product.category });
        if (category) {
            for (let i = 0; i < category.products.length; i++) {
                if (category.products[i].equals(product._id)) {
                    category.products.splice(i, 1);
                    break;
                }
            }
            category.save();
        }
        yield product_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Producto eliminado' });
        //req.log.info('Elimino el producto con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.productDelete = productDelete;
const updatePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product) {
            //req.log.warn(`El producto con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe el producto con el id: ' + req.params.id });
        }
        if (product.picture && product.picture.length > 1) {
            (0, uploadPicture_1.deleteFile)(product.picture);
        }
        product.picture = (yield (0, uploadPicture_1.upload)(req.files.file)) || '';
        yield product.save();
        res.json(product);
        //req.log.info('Actualizo la imagen del producto: ' + product._id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.updatePicture = updatePicture;
//# sourceMappingURL=productController.js.map