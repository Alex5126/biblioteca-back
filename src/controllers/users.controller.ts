import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { connect } from '../database';

import { User } from '../interfaces/user';

export async function getAllUsers(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const users = await conn.query('SELECT * FROM users');

    return resp.json(users[0]);
}

export async function addUser(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    let newUser: User = req.body;

    newUser.password = await bcrypt.hash(newUser.password.toString(),5);
    
    const user = await conn.query('INSERT INTO users SET ?', [newUser]);

    return resp.json({
        message: 'user added successfully'
    });
}

export async function getUserById(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    const user = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

    let temp = user[0] as User[];

    return resp.json(temp[0]);
}

export async function updateUser(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    let user: User = req.body;
    const id = req.params.id;

    user.password = await bcrypt.hash(user.password.toString(),5);

    await conn.query('UPDATE users SET ? WHERE id = ?', [user, id]);

    return resp.json({
        message: 'user updated successfully'
    });
}

export async function deleUser(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;
    await conn.query('DELETE FROM loan_history WHERE id_user = ?', [id]);
    await conn.query('DELETE FROM loan_applications WHERE id_user = ?', [id]);
    await conn.query('DELETE FROM users WHERE id = ?', [id]);

    return resp.json({
        message: 'user successfully removed'
    });
}

export async function findUserByEmail(email:string) {
    const conn = await connect();

    const user = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

    let temp = user[0] as User[];

    return temp;
}