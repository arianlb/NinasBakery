"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAnyRole = void 0;
const hasAnyRole = (roles) => {
    return (req, res, next) => {
        if (!req.query.role) {
            req.log.warn('No hay rol en la peticion');
            return res.status(401).json({ msg: 'No hay rol en la petición' });
        }
        if (!roles.includes(req.query.role)) {
            req.log.warn('No tiene permisos para realizar esta accion');
            return res.status(401).json({ msg: 'No tiene permisos para realizar esta acción' });
        }
        next();
    };
};
exports.hasAnyRole = hasAnyRole;
//# sourceMappingURL=validateRole.js.map