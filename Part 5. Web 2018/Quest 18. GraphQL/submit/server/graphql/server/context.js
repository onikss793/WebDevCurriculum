const jwt = require('jsonwebtoken'),
	userDao = require('../../dao/userDao');

module.exports = async ({ req, res }) => {
	if (process.env.NODE_ENV === 'test') {
		const { request, response} = require('express')
		const user_id = 1;
		return { request, response, user_id };
	}
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