const jwt = require('jsonwebtoken'),
	userDao = require('../../dao/userDao');

module.exports = async ({ req, res }) => {
	const user_id = await authorize(req.headers.authorization);

	return {
		req,
		res,
		user_id
	};
};

const authorize = async (token) => {
	const payload = jwt.decode(token);

	if (payload) {
		const user = await userDao.findUserByPk(payload.id);

		if (user) return user.id;
	}

	return null;
};