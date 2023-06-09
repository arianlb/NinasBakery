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
exports.loading = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generateJWT_1 = require("../helpers/generateJWT");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username.toString();
        const password = req.body.password.toString();
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'Username o Password incorrecto' });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ msg: 'Username o Password incorrecto' });
        }
        const token = yield (0, generateJWT_1.jwt)(user._id.toString(), user.role, user.username);
        res.json(token);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//Funcion de prueba experimental
const loading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = yield loginController();
    res.json({ msg });
});
exports.loading = loading;
const loginController = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve('ok');
            }, 7000);
        }
        catch (error) {
            reject('error');
        }
    });
});
//# sourceMappingURL=loginController.js.map