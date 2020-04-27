const jwt = require('jsonwebtoken'),
	{ AuthenticationError } = require('apollo-server-express'),
	userDao = require('../../dao/userDao'),
	utils = require('../../utils');

const logIn = async (parent, args, { res }) => {
	try {
		const user = await userDao.findUserByName(args.id);

		if (utils.checkUserData(args, user)) {
			const payload = { id: user.id };
			const token = await genToken(payload);

			return {
				success: true,
				token
			};
		} else {
			res.status(401);
			return new AuthenticationError('Wrong ID, PW');
		}
	} catch (err) {
		throw err;
	}
};

module.exports = { logIn };

const genToken = (payload) => {
	const SECRET_KEY = 'secret';

	return jwt.sign(payload, SECRET_KEY, { expiresIn: '24hr' });
};