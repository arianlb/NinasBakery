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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const upload = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [typeFile] = file.mimetype.split('/');
        if (typeFile !== 'image') {
            throw new Error('El archivo no es una imagen');
        }
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(file.tempFilePath);
        return secure_url;
    }
    catch (error) {
        console.log(error);
    }
});
exports.upload = upload;
const deleteFile = (address) => {
    const addressArray = address.split('/');
    const name = addressArray[addressArray.length - 1];
    const [public_id] = name.split('.');
    cloudinary_1.v2.uploader.destroy(public_id);
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=uploadPicture.js.map