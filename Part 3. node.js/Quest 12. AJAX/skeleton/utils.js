const responseMessage = (message, data = []) => {
    return { message, data };
};

const throwError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;

    return error;
};

const isQuery = req => {
    return Object.keys(req.query).length && req.query.name;
};

const renderTitle = string => {
    return `${string}`.replace(/.txt/gi, '');
};

const dataExist = (data, key) => {
    return data[key] && data[key].length;
};

const getDirectory = name => {
    return `${__dirname}/files/${name}.txt`;
};

module.exports = {
    responseMessage,
    throwError,
    isQuery,
    renderTitle,
    dataExist,
    getDirectory
};
