"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        //req.log.warn('No hay token en la peticion');
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid, role, username } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'CualquierMierdadSecreta7');
        req.query.uid = uid;
        req.query.role = role;
        req.query.username = username;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
        //req.log.warn('Token no valido');
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateJWT.js.map