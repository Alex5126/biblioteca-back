import { Router } from 'express';

import { getAllUsers, addUser, getUserById, updateUser, deleUser } from '../controllers/users.controller';

const router: Router = Router();

router.route('/')
    .get(getAllUsers)
    .post(addUser);
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleUser)

export default router;