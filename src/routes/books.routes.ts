import { Router } from 'express';
import multer from '../lib/multer';

import { getAllBooks, addBook, getBookById, updateBook, deleBook, uploadImage } from '../controllers/books.controller';

const router: Router = Router();

router.route('/')
    .get(getAllBooks)
    .post(addBook);
router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleBook);
router.post('/upload/:id',multer.single('image'), uploadImage);
router.get('/upload',)

export default router;