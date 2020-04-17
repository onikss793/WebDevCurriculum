const userDao = require('../dao/userDao'),
	jwt = require('jsonwebtoken'),
	utils = require('../utils');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		console.log(req.headers)
		const payload = jwt.decode(token);
		const user = await userDao.findUserByPk(payload.id);

		user
		? (req.user_id = user.id)
		: next(utils.throwError(401, 'Log In First'));

		next();
	} catch (err) {
		next(utils.throwError(401, err.message));
	}
};
