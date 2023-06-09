"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAnyRole = void 0;
const hasAnyRole = (...roles) => {
    return (req, res, next) => {
        if (!req.query.authUserRole) {
            return res.status(403).json({ msg: 'No hay rol en la petición' });
        }
        if (!roles.includes(req.query.authUserRole)) {
            return res.status(403).json({ msg: 'No tiene permisos para realizar esta acción' });
        }
        next();
    };
};
exports.hasAnyRole = hasAnyRole;
//# sourceMappingURL=validateRole.js.map