const errorMiddleware = require('../middleware/errorMiddleware');

module.exports = (app) => {
    app.all('*', errorMiddleware.notFound);
    app.use(errorMiddleware.handleError);
};
