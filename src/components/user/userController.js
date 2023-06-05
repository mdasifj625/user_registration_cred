import { getAllUsers, updateOneUser, deleteOneUser } from './userService.js';
import { updateBody } from '../../validator/userValidator.js';
import logger from '../../core/logger.js';

const renderHomePage = async (req, res) => {
	try {
		const isLoggedIn = req.isLoggedIn;
		let userList = {
			rows: [],
			count: 0,
		};

		// currently doing client side pagination
		if (isLoggedIn) userList = await getAllUsers(1);

		return res.render('index', {
			title: 'Home',
			userList,
		});
	} catch (err) {
		logger.error(err);
		res.locals.alert = { type: 'danger', message: err.name };
		res.redirect('/');
	}
};
const updateUser = async (req, res) => {
	try {
		const _body = {
			email: req.params.email,
			name: req.body.name,
		};

		const validateErr = updateBody.validate(_body).error;

		if (validateErr) {
			res.locals.alert = { type: 'danger', message: validateErr.message };
			return res.render('pages/user_update', { title: 'Update' });
		}

		await updateOneUser(_body.email, { name: _body.name });

		return res.redirect('/');
	} catch (err) {
		logger.error(err);
		res.locals.alert = { type: 'danger', message: err.name };
		res.redirect('/');
	}
};
const deleteUser = async (req, res) => {
	try {
		const email = req.params.email;

		await deleteOneUser(email);

		return res.redirect('/');
	} catch (err) {
		logger.error(err);
		res.locals.alert = { type: 'danger', message: err.name };
		res.redirect('/');
	}
};
const renderUpdateUser = (req, res) => {
	const user = { name: req.query.name, email: req.query.email };
	res.render('pages/update_user', { title: 'Update', user });
};

export { renderHomePage, renderUpdateUser, updateUser, deleteUser };
