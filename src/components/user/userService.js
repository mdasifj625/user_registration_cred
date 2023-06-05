import User from '../../models/userModel.js';
import logger from '../../core/logger.js';

const updateOneUser = async (email, payload) => {
	logger.info('Inside createUser service');
	try {
		return await User.update(payload, { where: { email } });
	} catch (err) {
		logger.error(err);
		throw err;
	}
};

const deleteOneUser = async email => {
	logger.info('Inside createUser service');
	try {
		return await User.destroy({ where: { email } });
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
			// limit,
			order: [['createdAt', 'DESC']],
			// offset,
			attributes,
		});
	} catch (err) {
		logger.error(err);
		throw err;
	}
};

export { getAllUsers, updateOneUser, deleteOneUser };
