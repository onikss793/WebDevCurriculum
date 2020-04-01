const fs = require('fs'),
    path = require('path'),
    utils = require('./utils');

const readFiles = () => {
    const files = fs.readdirSync(path.join(__dirname + '/files')).map(file => {
        return readFile(file);
    });

    return files;
};

const readFile = fileName => {
    const title = utils.renderTitle(fileName);
    const dir = utils.getDirectory(title);
    const body = fs.readFileSync(path.join(dir), {
        encoding: 'utf-8'
    });

    return { title, body };
};

const writeFile = (fileName, data) => {
    fs.writeFileSync(path.join(utils.getDirectory(fileName)), data);
};

module.exports = {
    readFiles,
    readFile,
    writeFile
};
