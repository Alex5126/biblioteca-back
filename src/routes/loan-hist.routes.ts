import { Router } from 'express';

import { getAllLoanHist, updateLoanHist, findLoanByUserID } from '../controllers/loan-history.controller';

const router: Router = Router();

router.route('/')
    .get(getAllLoanHist)
router.route('/:id')
    .put(updateLoanHist)
    .get(findLoanByUserID)

export default router;