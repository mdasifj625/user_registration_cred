import express from 'express';
// import personRoute from './person/personRoute.js';
import User from '../models/userModel.js';

const router = express.Router();

router.use('/', (req, res) => {
	User.create({
		name: 'asif',
		email: 'asf',
	});

	res.render('index');
});
export default router;
