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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generateJWT_1 = require("../helpers/generateJWT");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            req.log.warn(`El usuario ${username} no existe en la BD`);
            return res.status(404).json({ msg: 'Username incorrecto' });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            req.log.warn('La contraseña es incorrecta');
            return res.status(400).json({ msg: 'Password incorrecto' });
        }
        const token = yield (0, generateJWT_1.jwt)(user._id.toString(), user.role, user.username);
        res.json(token);
        req.log.info('Inicio sesion el usuario: ' + user.username);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        req.log.error(error.messge);
    }
});
exports.login = login;
//# sourceMappingURL=loginController.js.map