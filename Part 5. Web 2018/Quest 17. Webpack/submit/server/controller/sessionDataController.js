const sessionDataDao = require('../dao/sessionDataDao'),
	utils = require('../utils');

const uploadSessionData = async (req, res, next) => {
	try {
		const data = JSON.stringify(req.body);

		await sessionDataDao.createOrUpdate(req.user_id, data);

		res.status(200).json(utils.responseMessage('success'));
	} catch(err) {
		next(err);
	}

};

const loadSessionData = async (req, res, next) => {
	try {
		const user_id = req.user_id;
		const data = await sessionDataDao.findUserSession(user_id).then(data => data && data.toJSON())
		data.notes = data && JSON.parse(data.notes);

		res.status(200).json(utils.responseMessage('success', data))
	} catch(err) {
		next(err);
	}
};

module.exports = { uploadSessionData, loadSessionData };
