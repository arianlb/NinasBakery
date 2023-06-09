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
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'aiDASDf498yrbfa6sffTSaos8yr821rfv');
        const user = yield user_1.default.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }
        req.query.authUserId = uid;
        req.query.authUserRole = user.role;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
});
exports.validateToken = validateToken;
//# sourceMappingURL=validateJWT.js.map