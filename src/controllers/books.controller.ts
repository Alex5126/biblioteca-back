import { Request, Response } from 'express';

import { connect } from '../database';

import { Book } from '../interfaces/book';

export async function getAllBooks(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const books = await conn.query('SELECT * FROM books');

    return resp.json(books[0]);
}

export async function addBook(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const newBook: Book = req.body;
    const book = await conn.query('INSERT INTO books SET ?', [newBook]);

    return resp.json({
        message: 'Book added successfully'
    });
}

export async function getBookById(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    const book = await conn.query('SELECT * FROM books WHERE id = ?', [id]);

    let temp = book[0] as Book[];

    return resp.json(temp[0]);
}

export async function updateBook(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const book: Book = req.body;
    const id = req.params.id;

    await conn.query('UPDATE books SET ? WHERE id = ?', [book, id]);

    return resp.json({
        message: 'Book updated successfully'
    });
}

export async function deleBook(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    await conn.query('DELETE FROM books WHERE id = ?', [id]);

    return resp.json({
        message: 'Book successfully removed'
    });
}

export async function uploadImage(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;
    console.log(req.file);
    let url = `localhost:3000\\${req.file.path}`;
    await conn.query('UPDATE books SET image=? WHERE id = ?', [url, id]);

    return resp.json({
        message: 'image uploated successfully'
    });
}