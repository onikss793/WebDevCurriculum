const fs = require('fs'),
    path = require('path');

const readFiles = () => {
    const files = fs.readdirSync(path.join(__dirname + '/files')).map(file => {
        return readFile(file);
    });

    return files;
};

const readFile = file => {
    const title = file.split('.')[0];
    const body = fs.readFileSync(path.join(__dirname + '/files/' + file), {
        encoding: 'utf-8'
    });

    return { title, body };
};

const writeFile = data => {
    fs.writeFile(
        path.join(__dirname + '/files', renderTitle(data.title) + '.txt'),
        data.body,
        err => {
            if (err) console.error(err);
            else console.log(renderTitle(data.title) + '.txt File Creted');
        }
    );
};

const renderTitle = string => {
    return string;
    // .split(' ')
    // .join('')
    // .toLowerCase()
};

module.exports = { readFiles, readFile, writeFile };
