import {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res:Response, next:NextFunction){

    let token:string = req.header('Authorization') || '';

    if(token != '' && token.startsWith("Bearer ")) {
        token = token.substring(7);
    }
    
    jwt.verify(token, process.env.SEED || '',(error, decoded) =>{
        if(error){
            console.log(error);
            return res.status(401).json({
                status:false,
                message:error.message
            });
        }else{
            next();
        }
    });

}