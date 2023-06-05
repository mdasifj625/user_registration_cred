import { Router } from 'express';
import { authorize } from '../../middleware/authorizer.js';
import {
	renderHomePage,
	renderUpdateUser,
	updateUser,
	deleteUser,
} from './userController.js';

const router = Router();

router.post('/update/:email', updateUser);
router.get('/update', renderUpdateUser);

router.get('/delete/:email', deleteUser);
router.get('/', authorize, renderHomePage);

export default router;
