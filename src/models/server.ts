import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';
import bodyParser from 'body-parser';
import helmet from 'helmet';

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
        this.errorHandler();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(mongoSanitize());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            limits: { fileSize: 1 * 1024 * 1024 },
            abortOnLimit: true
        }));
    }

    routes() {
        this.app.use('/api/categories', categoryRoutes);
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/login', loginRoutes);
    }

    errorHandler() {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({ msg: err.message });
            console.error('Error en: ' + req.originalUrl + ' - ' + req.method + '\n' + err.message);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
}

export default Server;