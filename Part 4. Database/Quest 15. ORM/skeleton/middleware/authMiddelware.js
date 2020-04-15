const userSessionDao = require('../dao/userSessionDao'),
    utils = require('../utils');

module.exports = async (req, res, next) => {
    const userSession = await userSessionDao.findUserSession(req.session.id);

    userSession
        ? (req.user_id = userSession.User.id)
        : next(utils.throwError(401, 'Log In First'));

    next();
};
