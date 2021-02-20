import { Request, Response } from 'express';

import { connect } from '../database';

import { User } from '../interfaces/user';

export async function getAllUsers(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const users = await conn.query('SELECT * FROM users');

    return resp.json(users[0]);
}

export async function addUser(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const newUser: User = req.body;
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
    const user: User = req.body;
    const id = req.params.id;

    await conn.query('UPDATE users SET ? WHERE id = ?', [user, id]);

    return resp.json({
        message: 'user updated successfully'
    });
}

export async function deleUser(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    await conn.query('DELETE FROM users WHERE id = ?', [id]);

    return resp.json({
        message: 'user successfully removed'
    });
}