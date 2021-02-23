import { Request, Response } from 'express';

import { connect } from '../database';

import { LoanHistory } from '../interfaces/loanHistory';

export async function getAllLoanHist(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const loanHist = await conn.query(`SELECT 
	loan_history.id,
	loan_history.id_user,
	loan_history.id_book,
	loan_history.status,
	loan_history.loan_date,
	loan_history.update_date,
	users.name AS user,
	books.title AS book
FROM loan_history 
	JOIN users ON loan_history.id_user = users.id
	JOIN books ON loan_history.id_book = books.id;`);

    return resp.json(loanHist[0]);
}

export async function updateLoanHist(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const hist:LoanHistory = req.body;
    const id = req.params.id;

    await conn.query('UPDATE loan_history SET ? WHERE id = ?', [hist, id]);

    return resp.json({
        message: 'History updated successfully'
    });
}

export async function findLoanByUserID(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    const loanApp = await conn.query(`SELECT 
	loan_history.id,
	loan_history.id_user,
	loan_history.id_book,
	loan_history.status,
	loan_history.loan_date,
	loan_history.update_date,
	users.name AS user,
	books.title AS book
FROM loan_history 
	JOIN users ON loan_history.id_user = users.id
	JOIN books ON loan_history.id_book = books.id
AND loan_history.id_user = ?;`,[id]);

    let temp = loanApp[0] as LoanHistory[];

    return resp.json(temp);
}