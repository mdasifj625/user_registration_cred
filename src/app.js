import express from 'express';
import dotenv from 'dotenv-safe';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { handleError } from './helper/responseHandler.js';
import globalErrorHandler from './helper/globalErrorHandler.js';
import indexRouter from './components/indexRouter.js';

dotenv.config({ allowEmptyValues: true });

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true,
		resave: false,
		cookie: { httpOnly: true },
	}),
);

app.use((req, res, next) => {
	res.locals.alert = req.session.alert;
	res.locals.user = {};
	delete req.session.alert;
	next();
});

app.use('/', indexRouter);
app.use(xss());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Return 404 if if url is not available on server
app.all('*', (req, res, next) => {
	next(
		handleError({
			res,
			statusCode: 404,
			err: `Can't find ${req.originalUrl} on this server!`,
		}),
	);
});

app.use(globalErrorHandler);
export default app;
