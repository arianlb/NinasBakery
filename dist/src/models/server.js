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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const connection_1 = __importDefault(require("../database/connection"));
const categoryRouter_1 = __importDefault(require("../routes/categoryRouter"));
const productRouter_1 = __importDefault(require("../routes/productRouter"));
const userRouter_1 = __importDefault(require("../routes/userRouter"));
const loginRouter_1 = __importDefault(require("../routes/loginRouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.connectDB();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, connection_1.default)();
        });
    }
    middlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, express_mongo_sanitize_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            limits: { fileSize: 1 * 1024 * 1024 },
            abortOnLimit: true
        }));
    }
    routes() {
        this.app.use('/api/categories', categoryRouter_1.default);
        this.app.use('/api/products', productRouter_1.default);
        this.app.use('/api/users', userRouter_1.default);
        this.app.use('/api/login', loginRouter_1.default);
    }
    errorHandler() {
        this.app.use((err, req, res, next) => {
            res.status(500).json({ msg: err.message });
            console.error('Error en: ' + req.originalUrl + ' - ' + req.method + '\n' + err.message);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
    // Solo para el uso de testear la app
    getApp() {
        return this.app;
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map