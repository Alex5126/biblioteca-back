import express, { Application } from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth';
import userRoutes from './routes/users.routes';
import bookRoutes from './routes/books.routes';
import loanAppRoutes from './routes/loan-app.routes';

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
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
        //this.app.use(authRoutes);
        this.app.use('/users',userRoutes);
        this.app.use('/books',bookRoutes);
        this.app.use('/loan-app',loanAppRoutes);
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
    }

}
