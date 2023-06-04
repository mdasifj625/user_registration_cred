import { compareSync, hashSync } from 'bcrypt';
const encryptPassword = password => {
	return hashSync(password, 10);
};

const comparePassword = (incomingPassword, savedPassword) => {
	return compareSync(incomingPassword, savedPassword);
};

export { encryptPassword, comparePassword };
