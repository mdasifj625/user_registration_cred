import { createUser, getUser } from './authService.js';
import { signupBody, LogInBody } from '../../validator/authValidator.js';
import {
	encryptPassword,
	comparePassword,
} from '../../helper/passwordHelper.js';
import jwtHelper from '../../helper/jwtHelper.js';
import logger from '../../core/logger.js';

const signupUser = async (req, res) => {
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
			email: _body.email.toLowerCase(),
			password: encryptPassword(_body.password),
		};

		await createUser(payload);

		req.session.alert = {
			type: 'success',
			message: 'User created successfully',
		};
		res.redirect('/');
	} catch (err) {
		logger.error(err);
		res.locals.alert = { type: 'danger', message: err.name };
		return res.render('pages/signup', { title: 'Signup' });
	}
};

const renderSignup = (req, res) => {
	res.render('pages/signup', { title: 'Signup' });
};

const loginUser = async (req, res) => {
	try {
		const _body = {
			email: req.body.email,
			password: req.body.password,
		};

		const validateErr = LogInBody.validate(_body).error;

		if (validateErr) {
			res.locals.alert = { type: 'danger', message: validateErr.message };
			return res.render('pages/login', { title: 'LogIn' });
		}

		const user = await getUser(_body.email.toLowerCase(), true);

		const result = comparePassword(_body.password, user.password);

		if (result) {
			const jwt = jwtHelper.generateToken({
				email: user.email,
				name: user.name,
			});
			req.session.jwt = jwt;
			return res.redirect('/');
		}

		res.locals.alert = { type: 'danger', message: 'Invalid credentials' };
		return res.render('pages/login', { title: 'LogIn' });
	} catch (err) {
		logger.error(err);
		res.locals.alert = { type: 'danger', message: err.name };
		return res.render('pages/login', { title: 'LogIn' });
	}
};

const renderLogIn = (req, res) => {
	res.render('pages/login', { title: 'LogIn' });
};

export { signupUser, renderSignup, loginUser, renderLogIn };
