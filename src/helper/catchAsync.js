import message from '../core/responseMessage.js';
import { handleError } from './responseHandler.js';

export default fn => (req, res, next) => {
	fn(req, res).catch(error => {
		if (process.env.env === 'production') {
			return handleError({
				res,
				err: message.SOMETHING_WENT_WRONG,
				data: error,
				status: 'error',
			});
		}
		return handleError({ res, err: error, data: error, status: 'error' });
	});
};
