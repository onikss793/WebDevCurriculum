const fs = require('fs'),
    path = require('path'),
    utils = require('../utils');

const getAccountByName = name => {
    const userData = fs.readFileSync(path.join(__dirname, '../accounts.json'), {
        encoding: 'utf-8'
    });

    const user = JSON.parse(userData).filter(user => user.name === name)[0];

    return user;
};

const saveAccountData = (id, data) => {
    const dir = utils.getUserDataDirectory(id);

    fs.writeFileSync(dir, data);
};

const getAccountData = id => {
    const dir = utils.getUserDataDirectory(id);

    const data = fs.readFileSync(dir, {
        encoding: 'utf-8'
    });

    return JSON.parse(data);
};

module.exports = { getAccountByName, saveAccountData, getAccountData };
