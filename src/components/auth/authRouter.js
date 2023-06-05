import { Router } from 'express';
import {
	signupUser,
	renderSignup,
	loginUser,
	renderLogIn,
} from './authController.js';

const router = Router();

router.post('/signup', signupUser);
router.get('/signup', renderSignup);

router.post('/login', loginUser);
router.get('/login', renderLogIn);
router.get('/logout', (req, res) => {
	req.session.destroy(err => {
		res.redirect('/');
	});
});

export default router;
