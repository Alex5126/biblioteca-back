import { Router } from 'express';

import { getAllBooks, addBook, getBookById, updateBook, deleBook } from '../controllers/books.controller';

const router: Router = Router();

router.route('/')
    .get(getAllBooks)
    .post(addBook);
router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleBook)

export default router;