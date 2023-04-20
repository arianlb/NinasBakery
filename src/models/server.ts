import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import pino from 'pino-http';

import dbConnection from '../database/connection';
import categoryRoutes from '../routes/categoryRouter';
import productRoutes from '../routes/productRouter';
import userRoutes from '../routes/userRouter';
import loginRoutes from '../routes/loginRouter';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            limits: { fileSize: 25 * 1024 * 1024 },
            abortOnLimit: true
        }));
        this.app.use(pino({
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: "SYS:standard",
                    ignore: "req.id,req.query,req.params,req.headers,req.remoteAddress,req.remotePort,res,err"
                }
            }
        }));
    }

    routes() {
        this.app.use('/api/categories', categoryRoutes);
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/login', loginRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}

export default Server;