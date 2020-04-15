const { UserSession, User } = require('../model');

const findUserSession = (session_id) => {
    return UserSession.findOne({
        where: { session_id },
        attributes: [],
        include: [{ model: User, attributes: ['id', 'username'] }],
    });
};

const insertUserSession = (session_id, user_id) => {
    return UserSession.create({ user_id, session_id });
};

const deleteUserSession = (session_id) => {
    return UserSession.destroy({ where: { session_id } });
};

module.exports = { insertUserSession, deleteUserSession, findUserSession };
