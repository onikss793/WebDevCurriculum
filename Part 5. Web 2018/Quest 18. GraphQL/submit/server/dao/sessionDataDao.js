const { UserSession } = require('../model');

const findUserSession = (user_id) => {
	return UserSession.findOne({ where: { user_id } });
};

const insertUserSession = (user_id, data) => {
	return UserSession.create({ user_id, data });
};

const deleteUserSession = (session_id) => {
	return UserSession.destroy({ where: { session_id } });
};

const createOrUpdate = (user_id, data) => {
	return UserSession.findOne({ where: { user_id }}).then(res => {
		if (res) {
			UserSession.update({ notes: data }, { where: { user_id } });
		} else {
			UserSession.create({ user_id, notes: data });
		}
	});
}

module.exports = { insertUserSession, deleteUserSession, findUserSession, createOrUpdate };
