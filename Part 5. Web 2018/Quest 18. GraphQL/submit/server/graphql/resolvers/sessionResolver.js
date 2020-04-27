const sessionDataDao = require('../../dao/sessionDataDao');

const loadSessionData = async (parent, args, { user_id }) => {
	try {
		const data = await sessionDataDao.findUserSession(user_id).then(d => d && d.toJSON());
		data.notes = data && JSON.parse(data.notes);

		return { user_id, notes: data.notes };
	} catch (err) {
		throw err;
	}
};

const uploadSessionData = async (parent, args, { user_id }) => {
	try {
		const data = args.notes.replace(/'/g, '"');

		await sessionDataDao.createOrUpdate(user_id, data);

		return { success: true };
	} catch (err) {
		throw err;
	}
};

module.exports = { loadSessionData, uploadSessionData };