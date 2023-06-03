import { Sequelize } from 'sequelize';
import config from '../core/config.js';

const sequelize = new Sequelize(
	config.DB.DB_NAME,
	config.DB.DB_USER_NAME,
	config.DB.DB_PASSWORD,
	config.DB.options,
);

export default sequelize;
