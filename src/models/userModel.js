import { DataTypes } from 'sequelize';
import dbConnection from '../connections/dbConnection.js';

const User = dbConnection.define('user', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});


export default User;
