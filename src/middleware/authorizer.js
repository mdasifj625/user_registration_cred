import jwtHelper from '../helper/jwtHelper.js';
const authorize = (req, res, next) => {
	try {
		const token = req.session.jwt;
		const result = jwtHelper.verifyToken(token);

		req.isLoggedIn = true;

		res.locals.user = {
			isLoggedIn: true,
			name: result.name,
			email: result.email,
		};
		next();
	} catch (err) {
		req.isLoggedIn = false;
		res.locals.user = {
			isLoggedIn: false,
		};
		next();
	}
};

export { authorize };
