const userDao = require('../dao/userDao'),
    userSessionDao = require('../dao/userSessionDao'),
    utils = require('../utils');

const logIn = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await userDao.findUserByName(userData.username);

        if (utils.checkUserData(userData, user)) {
            await userSessionDao.insertUserSession(req.session.id, user.id);

            utils.setCookie(res, {
                isLoggedIn: true,
            });

            res.status(200).json(
                utils.responseMessage('success', { username: user.username })
            );
        } else {
            res.status(401).json(utils.responseMessage('Wrong Id, Password'));
        }
    } catch (err) {
        next(err);
    }
};

const logOut = async (req, res, next) => {
    try {
        utils.clearCookies(res, 'username', 'isLoggedIn');

        await userSessionDao.deleteUserSession(req.session.id);

        res.status(200).json(utils.responseMessage('success'));
    } catch (err) {
        next(err);
    }
};

module.exports = { logIn, logOut };
