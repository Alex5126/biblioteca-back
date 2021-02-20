import { Router } from 'express';

import { getAllLoanApp, addLoanApp, getLoanAppById, updateLoanApp, deleLoanApp } from '../controllers/loan-applications.controller';

const router: Router = Router();

router.route('/')
    .get(getAllLoanApp)
    .post(addLoanApp);
router.route('/:id')
    .get(getLoanAppById)
    .put(updateLoanApp)
    .delete(deleLoanApp)

export default router;