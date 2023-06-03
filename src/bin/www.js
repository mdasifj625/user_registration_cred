import http from 'http';
import app from '../app.js';
import logger from '../core/logger.js';
import config from '../core/config.js';
import dbConnection from '../connections/dbConnection.js';

if (process.env.NODE_ENV === 'production') {
	process.on('uncaughtException', err => {
		logger.info('UNCAUGHT EXCEPTION! 💥 Shutting down...');
		logger.error(err.name, err.message);
		process.exit(1);
	});
}

const port = config.PORT;

const server = http.createServer(app);

dbConnection
	.authenticate()
	.then(() => {
		logger.info('Db Connection established successfully');
		dbConnection
			.sync({
				force: true,
			})
			.then(() => {
				server.listen(port);
			})
			.catch(err => {
				logger.error(`${err.name}: Issue in syncing db`);
			});
	})
	.catch(() => {
		logger.error(`${err.name}: Issue in connecting db`);
		process.exit(1);
	});

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	switch (error.code) {
		case 'EACCES':
			logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
		case 'EADDRINUSE':
			logger.error(`${bind} + is already in use`);
			process.exit(1);
		default:
			throw error;
	}
}

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${port}`;
	logger.info(`Server is Listening on ${bind}`);
}

process.on('unhandledRejection', err => {
	logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
	logger.error(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
	server.close(() => {
		logger.info('💥 Process terminated!');
	});
});
