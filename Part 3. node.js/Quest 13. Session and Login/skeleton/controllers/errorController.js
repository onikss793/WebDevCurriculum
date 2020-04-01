const utils = require('../utils');

const notFound = (req, res, next) => {
    next(utils.throwError(404, 'Not Found'));
};

const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    console.log(err);

    res.status(err.statusCode).json({
        error: err.message
    });
};

module.exports = { notFound, handleError };
