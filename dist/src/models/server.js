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
//import pino from 'pino-http';
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
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, connection_1.default)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            limits: { fileSize: 25 * 1024 * 1024 },
            abortOnLimit: true
        }));
        /*this.app.use(pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: "SYS:standard",
                    ignore: "req.id,req.query,req.params,req.headers,req.remoteAddress,req.remotePort,res,err"
                }
            }
        }));*/
    }
    routes() {
        this.app.use('/api/categories', categoryRouter_1.default);
        this.app.use('/api/products', productRouter_1.default);
        this.app.use('/api/users', userRouter_1.default);
        this.app.use('/api/login', loginRouter_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map