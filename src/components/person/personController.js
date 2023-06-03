import { handleError, handleResponse } from '../../helper/responseHandler.js';
import { addPersionService, getPersonService } from './personService.js';
import logger from '../../core/logger.js';
import catchAsync from '../../helper/catchAsync.js';

const addPersion = catchAsync(async (req, res, next) => {
	logger.info('Inside addPerson controller');
	const data = await addPersionService(req.body);
	return handleResponse({ res, data });
});

const getPerson = catchAsync(async (req, res) => {
	logger.info('Inside getPerson controller');
	const data = await getPersonService();
	return handleResponse({ res, data, result: data.length });
});
export { addPersion, getPerson };
