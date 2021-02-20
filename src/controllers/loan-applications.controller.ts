import { Request, Response } from 'express';

import { connect } from '../database';

import { LoanApplication } from '../interfaces/loanApplications';
import { LoanHistory } from '../interfaces/loanHistory';

export async function getAllLoanApp(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const loanApp = await conn.query('SELECT * FROM loan_applications');

    return resp.json(loanApp[0]);
}

export async function addLoanApp(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const newLoanApp: LoanApplication = req.body;
    const loanApp = await conn.query('INSERT INTO loan_applications SET ?', [newLoanApp]);

    return resp.json({
        message: 'Request added successfully'
    });
}

export async function getLoanAppById(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    const loanApp = await conn.query('SELECT * FROM loan_applications WHERE id = ?', [id]);

    let temp = loanApp[0] as LoanApplication[];

    return resp.json(temp[0]);
}

export async function updateLoanApp(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const loanApp: LoanApplication = req.body;
    const id = req.params.id;

    await conn.query('UPDATE loan_applications SET ? WHERE id = ?', [loanApp, id]);

    if(loanApp.status === 'ACEPTADA'){
        let history:LoanHistory = {
            id_user:loanApp.id_user,
            id_book:loanApp.id_book,
            status:'SIN ENTREGAR'
        };

        await conn.query('INSERT INTO loan_history SET ?', [history]);
    }

    return resp.json({
        message: 'Request updated successfully'
    });
}

export async function deleLoanApp(req: Request, resp: Response): Promise<Response> {
    const conn = await connect();
    const id = req.params.id;

    await conn.query('DELETE FROM loan_applications WHERE id = ?', [id]);

    return resp.json({
        message: 'Request successfully removed'
    });
}