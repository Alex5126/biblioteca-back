import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { connect } from '../database';

import { findUserByEmail } from '../controllers/users.controller';

export async function login(req: Request, resp: Response): Promise<Response> {

    const user = await findUserByEmail(req.body.email);

    if (user.length > 0) {
        const userValid: boolean = bcrypt.compareSync(req.body.password, user[0].password.toString());

        if (userValid) {
            const token = jwt.sign(
                { usuario: user[0].email, id: user[0].id },
                process.env.SEED || '', { expiresIn: process.env.CADUCIDAD_TOKEN_ADM }
            );

            return resp.json({
                user: {
                    id: user[0].id,
                    name: user[0].name,
                    type: user[0].type
                },
                token: token
            });
        }else{
            return resp.status(401).json({message:'access denied'});
        }

    }

    return resp.status(401).json({message:'unknown user'});
}