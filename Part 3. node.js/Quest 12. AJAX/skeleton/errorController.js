const utils = require('./utils');

const notFound = (req, res, next) => {
    next(utils.throwError(404, 'Not Found'));
};

const handleError = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    console.error(err);
    err &&
        res.status(err.statusCode).json({
            error: {
                message: err.message,
                statusCode: err.statusCode
            }
        });
};

module.exports = { notFound, handleError };
