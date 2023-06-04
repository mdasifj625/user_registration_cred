import jwt from 'jsonwebtoken';
import config from '../core/config.js';

class JWTHelper {
	/**
	 * Verify the token with rsa public key.
	 * @param token string
	 * @returns string | JwtPayload
	 */
	verifyToken(token) {
		return jwt.verify(token, config.JWT_SECRET);
	}
	/**
	 * Verify the token with rsa public key.
	 * @param token string
	 * @returns string | JwtPayload
	 */
	decodeToken(token) {
		return jwt.decode(token);
	}

	/**
	 * Create a signed JWT with the rsa private key.
	 * @param {*} payload
	 * @returns token
	 */
	generateToken(payload) {
		return jwt.sign(payload, config.JWT_SECRET, {
			expiresIn: config.JWT_EXPIRES_IN,
		});
	}
}

// All Done
export default new JWTHelper();
