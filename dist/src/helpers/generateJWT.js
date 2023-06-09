"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'aiDASDf498yrbfa6sffTSaos8yr821rfv', (err, token) => {
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