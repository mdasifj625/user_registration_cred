import express from 'express';
import authRouter from './auth/authRouter.js';
import { authorize } from '../middleware/authorizer.js';
import { getAllUsers } from './auth/authService.js';

const router = express.Router();

router.use('/auth', authRouter);

router.get('/', authorize, async (req, res) => {
	try {
		console.log(JSON.stringify(req.session));
		const isLoggedIn = req.isLoggedIn;
		let userList = {
			rows: [],
			count: 0,
		};

		if (isLoggedIn) userList = await getAllUsers(1, 10);

		return res.render('index', {
			title: 'Home',
			userList,
		});
	} catch (err) {
		res.locals.alert = { type: 'danger', message: err.name };
		res.redirect('/');
	}
});
export default router;
