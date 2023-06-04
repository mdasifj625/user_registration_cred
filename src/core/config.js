import dotenv from 'dotenv-safe';

dotenv.config({ allowEmptyValues: true });
export default {
	PORT: parseInt(process.env.PORT, 10) || 3000,

	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

	// Database
	DB: {
		DB_NAME: process.env.DB_NAME,
		DB_USER_NAME: process.env.DB_USER_NAME,
		DB_PASSWORD: process.env.DB_PASSWORD,

		options: {
			host: process.env.DB_HOST,
			dialect: 'mysql',
			pool: {
				max: 30,
				min: 0,
				acquire: 20000,
				idle: 5000,
			},
		},
	},
};
