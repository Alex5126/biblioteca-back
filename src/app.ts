import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

import { loadSettings } from './config';
import { verifyToken } from './lib/verifyToken'

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import bookRoutes from './routes/books.routes';
import loanAppRoutes from './routes/loan-app.routes';
import loanHistRoutes from './routes/loan-hist.routes';

export class App{
    private app: Application;

    constructor(private port:number | string){
        this.app  = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', this.port);
        loadSettings();
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/login',authRoutes);
        this.app.use('/users',verifyToken,userRoutes);
        this.app.use('/books',verifyToken,bookRoutes);
        this.app.use('/loan-app',verifyToken,loanAppRoutes);
        this.app.use('/loan-hist',verifyToken,loanHistRoutes);
        this.app.use('/public', express.static(path.resolve('public')));
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
    }

}
