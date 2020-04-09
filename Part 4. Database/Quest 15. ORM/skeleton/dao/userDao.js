const { User } = require('../model');

const findUserByName = (
    username,
    attributes = ['id', 'username', 'password']
) => {
    return User.findOne({ where: { username }, attributes });
};

const insertUser = ({ username, password }) => {
    return User.create({ username, password });
};

const findAllUsers = (attributes = ['id', 'username', 'password']) => {
    return User.findAll({ attributes });
};

module.exports = { findUserByName, insertUser, findAllUsers };
