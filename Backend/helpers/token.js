const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const sign = JWT_SECRET;

module.exports = {
	generate(data) {
		return jwt.sign(data, sign, { expiresIn: '30d' });
	},
	verify(token) {
		return jwt.verify(token, sign);
	},
};
