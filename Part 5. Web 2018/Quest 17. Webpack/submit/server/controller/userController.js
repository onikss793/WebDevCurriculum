const userDao = require('../dao/userDao'),
	jwt = require('jsonwebtoken'),
	utils = require('../utils');

const logIn = async (req, res, next) => {
	try {
		const userData = req.body;

		!userData.id && next(utils.throwError(400, 'No ID'));

		const user = await userDao.findUserByName(userData.id);

		if (utils.checkUserData(userData, user)) {
			const payload = { id: user.id };
			const token = await genToken(payload);

			res.status(200).json(
				utils.responseMessage('success', {
					username: user.username,
					token
				})
			);
		} else {
			next(utils.throwError(401, 'Wrong ID, PW'));
		}
	} catch (err) {
		next(err);
	}
};

const genToken = (payload) => {
	const SECRET_KEY = 'secret';

	return jwt.sign(payload, SECRET_KEY, { expiresIn: '24hr'});
}

module.exports = { logIn };
