const path = require('path');

const responseMessage = (message, data = []) => ({ message, data });

const throwError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    return error;
};

const hasQuery = (req, key) => Object.keys(req.query).length && req.query[key];

const renderId = (string) => `${string}`.replace(/.json/gi, '');

const dataExist = (data, key) => data[key] && data[key].length;

const getFileDirectory = (id = null) => {
    return id
        ? path.join(`${__dirname}/files/${id}.json`)
        : path.join(`${__dirname}/files`);
};

const getUserDataDirectory = (id) => {
    return path.join(__dirname, './userdata', id + '.json');
};

const setCookie = (res, cookies) => {
    try {
        Object.entries(cookies).forEach(([key, value]) => {
            res.cookie(key, value);
        });
    } catch (err) {
        console.log(err);
    }
};

const checkUserData = (data, original) => {
    return original && data && data.pw === original.password;
};

const setSessionAttributes = (sessionObj, data) => {
    Object.entries(data).forEach(([key, value]) => {
        sessionObj[key] = value;
    });
};

const clearCookies = (res, ...arg) => {
    [...arg].forEach((key) => {
        res.clearCookie(key);
    });
};

const setUpData = async () => {
    try {
        const userDao = require('./dao/userDao');
        const noteDao = require('./dao/noteDao');
        const accountMockUp = require('./accounts.json');
        const noteMockUp = require('./notes.json');

        for await (const { name: username, password } of accountMockUp) {
            await userDao.insertUser({ username, password });
        }

        // for await (const data of noteMockUp) {
        //     await noteDao.insertNote(data);
        // }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    responseMessage,
    throwError,
    hasQuery,
    renderId,
    dataExist,
    getFileDirectory,
    setCookie,
    checkUserData,
    getUserDataDirectory,
    setSessionAttributes,
    clearCookies,
    setUpData,
};
