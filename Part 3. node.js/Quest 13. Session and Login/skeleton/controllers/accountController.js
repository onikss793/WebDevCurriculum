const accountService = require('../services/accountService'),
    utils = require('../utils');

const login = (req, res, next) => {
    try {
        const userData = req.body;
        const user = accountService.getAccountByName(userData.id);

        if (utils.checkUserData(userData, user)) {
            utils.setSessionAttributes(req.session, {
                userId: user.id,
                isLoggedIn: true
            });

            utils.setCookie(res, {
                isLoggedIn: true,
                username: user.name
            });

            res.status(200).json(
                utils.responseMessage('success', {
                    username: user.name
                })
            );
        } else {
            res.status(401).json(utils.responseMessage('Wrong Id, Password'));
        }
    } catch (err) {
        next(err);
    }
};

const logout = (req, res, next) => {
    try {
        utils.clearCookies(res, 'username', 'isLoggedIn');

        req.session.destroy(err => {
            err
                ? next(err)
                : res.status(200).json(utils.responseMessage('success'));
        });
    } catch (err) {
        next(err);
    }
};

const getAccountData = (req, res, next) => {
    try {
        if (req.session.isLoggedIn) {
            const userId = req.session.userId;
            const data = accountService.getAccountData(userId);

            res.status(200).json(utils.responseMessage('success', data));
        } else {
            next(utils.throwError(401, 'Log In First'));
        }
    } catch (err) {
        next(err);
    }
};

const postAccountData = (req, res, next) => {
    try {
        if (req.session.isLoggedIn) {
            const data = JSON.stringify(req.body);
            const userId = req.session.userId + '';

            accountService.saveAccountData(userId, data);

            res.status(200).json(
                utils.responseMessage('success', JSON.parse(data))
            );
        } else {
            next(utils.throwError(401, 'Log In First'));
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { login, logout, getAccountData, postAccountData };
