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
exports.userDelete = exports.userPut = exports.userPost = exports.userGet = exports.usersGet = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const usersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
        //req.log.info('Obtuvo todos los usuarios')
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.usersGet = usersGet;
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        if (!user) {
            //req.log.warn(`El usuario con el id ${req.params.id} no existe en la BD`);
            return res.status(404).json({ msg: 'No existe el usuario con el id: ' + req.params.id });
        }
        res.json(user);
        //req.log.info('Obtuvo el usuario con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.userGet = userGet;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        const encryptedPassword = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
        const user = new user_1.default({ username, password: encryptedPassword, role });
        yield user.save();
        res.json(user);
        //req.log.info('Creo el usuario: ' + user.username);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.userPost = userPost;
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { _id, password } = _a, rest = __rest(_a, ["_id", "password"]);
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, rest, { new: true });
        res.json(user);
        //req.log.info('Actualizo el usuario con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.userPut = userPut;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado' });
        //req.log.info('Elimino el usuario con el id: ' + req.params.id);
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
        //req.log.error(error.messge);
    }
});
exports.userDelete = userDelete;
//# sourceMappingURL=userController.js.map