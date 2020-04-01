const fs = require('fs'),
    utils = require('../utils');

const readFiles = () => {
    const dir = utils.getFileDirectory();

    return fs.readdirSync(dir).map(file => {
        const fileId = utils.renderId(file);
        const data = JSON.parse(readFile(fileId));

        return { id: fileId, ...data };
    });
};

const readFile = fileId => {
    const dir = utils.getFileDirectory(fileId);
    const data = fs.readFileSync(dir, { encoding: 'utf-8' });

    return data;
};

const writeFile = (fileId, data) => {
    fs.writeFileSync(utils.getFileDirectory(fileId), data);
};

const deleteFile = fileId => {
    fs.unlinkSync(utils.getFileDirectory(fileId));
};

module.exports = {
    readFiles,
    readFile,
    writeFile,
    deleteFile
};
