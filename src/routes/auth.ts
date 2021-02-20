import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, resp) => {
    resp.json('test');
});



export default router;