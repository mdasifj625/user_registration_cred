import { Router } from 'express';
import { signupBody } from '../../validator/authValidator.js';
import { createUser } from './authService.js';
import { encryptPassword } from '../../helper/passwordHelper.js';

const router = Router();

router.post('/signup', async (req, res) => {
	try {
		const _body = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			c_password: req.body.c_password,
		};

		const validateErr = signupBody.validate(_body).error;

		if (validateErr) {
			res.locals.alert = { type: 'danger', message: validateErr.message };
			return res.render('pages/signup', { title: 'Signup' });
		}

		const payload = {
			name: _body.name,
			email: _body.email,
			password: encryptPassword(_body.password),
		};

		await createUser(payload);

		res.locals.alert = {
			type: 'success',
			message: 'User created successfully',
		};
		res.redirect('/');
	} catch (err) {
		res.locals.alert = { type: 'danger', message: err.name };
		return res.render('pages/signup', { title: 'Signup' });
	}
});
router.get('/signup', (req, res) => {
	res.render('pages/signup', { title: 'Signup' });
});
router.post('/login', (req, res) => {
	console.log(JSON.stringify(req.body));
	// res.render('pages/signin', { title: 'SignIn' });
});
router.get('/login', (req, res) => {
	res.render('pages/signin', { title: 'SignIn' });
});

export default router;
