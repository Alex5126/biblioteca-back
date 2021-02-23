import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'public/images/books',
    filename: (req, file, cb ) =>{
        cb(null, file.originalname)
    }
});

export default multer({storage});