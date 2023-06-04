import express from 'express';
import authRouter from './auth/authRouter.js';

const router = express.Router();

router.use('/auth', authRouter);

router.get('/', async (req, res) => {
	try {
		if (req.cookies.alert) res.locals.alert = req.cookies.alert;
		res.render('index', {
			title: 'Home',
			userList: [
				{ id: 1, name: 'Asif Jawed', email: 'random1@gmail.com' },
				{ id: 2, name: 'Jawed Akhtar', email: 'random2@gmail.com' },
				{ id: 3, name: 'Mobin Akhtar', email: 'random3@gmail.com' },
				{ id: 4, name: 'Zakir Hussain', email: 'random4@gmail.com' },
				{ id: 5, name: 'Mohsin Alam', email: 'random5@gmail.com' },
				{ id: 6, name: 'Mobarak Ali', email: 'random6@gmail.com' },
				{ id: 7, name: 'Nusrat Kalam', email: 'random7@gmail.com' },
				{ id: 8, name: 'Satyam Kumar Pandey', email: 'random8@gmail.com' },
				{ id: 9, name: 'Saurabh Anand Arya', email: 'random9@gmail.com' },
				{ id: 10, name: 'Asim Jawed', email: 'random10@gmail.com' },
			],
		});
	} catch (err) {
		// res.status(500).send(err.errors[0].message);
	}
});
export default router;

// console.log('cookie from fe', JSON.stringify(req.cookies));

// res.cookie('jwt', 'skfsdl', {
// 	httpOnly: true,
// });
