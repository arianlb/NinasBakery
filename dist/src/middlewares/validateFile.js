"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpload = void 0;
const validateUpload = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        //req.log.warn('No hay archivo que subir');
        return res.status(400).json({ msg: 'No hay archivo que subir' });
    }
    next();
};
exports.validateUpload = validateUpload;
//# sourceMappingURL=validateFile.js.map