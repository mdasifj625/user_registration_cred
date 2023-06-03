import logger from '../core/logger.js';
import { AppError } from './responseHandler.js';

const handleCastErrorDB = err => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
	const errors = Object.values(err.errors).map(el => el.message);

	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError('Invalid token. Please login again!', 401);

const handleJWTExpiredError = () =>
	new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, req, res) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	}
	logger.error(err);
	return res.status(500).json({
		status: 'error',
		message: 'Something went very wrong!',
	});
};

export default (err, req, res, next) => {
	logger.error('Inside Global Error');
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		switch (error.name) {
			case 'CastError':
				error = handleCastErrorDB(error);
				break;

			case 'ValidationError':
				error = handleValidationErrorDB(error);
				break;

			case 'JsonWebTokenError':
				error = handleJWTError();
				break;

			case 'TokenExpiredError':
				error = handleJWTExpiredError();
				break;
		}

		if (error.code === 11000) error = handleDuplicateFieldsDB(error);

		return sendErrorProd(error, req, res);
	}

	return sendErrorDev(err, req, res);
};
