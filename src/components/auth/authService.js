import User from '../../models/userModel.js';
import logger from '../../core/logger.js';

const createUser = async payload => {
	logger.info('Inside createUser service');
	try {
		return await User.create(payload);
	} catch (err) {
		logger.error(err);
		if (err.name === 'SequelizeUniqueConstraintError')
			err.name = 'User already exist with this email';
		throw err;
	}
};
const getUser = async (email, withPassword = false) => {
	logger.info('Inside getUser service');
	try {
		const attributes = ['email', 'name'];
		if (withPassword) attributes.push('password');
		return await User.findOne({
			where: {
				email,
			},
			attributes,
		});
	} catch (err) {
		logger.error(err);
		throw err;
	}
};
const getAllUsers = async page => {
	logger.info('Inside getUser service');
	try {
		const attributes = ['email', 'name'];

		const limit = 10;
		const offset = (page - 1) * limit;

		return await User.findAndCountAll({
			where: {},
			limit,
			order: [['createdAt', 'DESC']],
			offset,
			attributes,
		});
	} catch (err) {
		logger.error(err);
		throw err;
	}
};

export { createUser, getUser, getAllUsers };
