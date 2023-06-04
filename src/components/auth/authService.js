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

export { createUser };
