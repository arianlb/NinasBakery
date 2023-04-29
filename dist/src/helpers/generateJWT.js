"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt = (uid, role, username) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, role, username };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'CualquierMierdadSecreta7', (err, token) => {
            if (err) {
                reject("No se pudo generar el token");
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.jwt = jwt;
//# sourceMappingURL=generateJWT.js.map