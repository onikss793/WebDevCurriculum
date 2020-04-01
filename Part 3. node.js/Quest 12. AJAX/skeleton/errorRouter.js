const errorController = require('./errorController');

const errorRouter = app => {
    app.use(errorController.notFound);
    app.use(errorController.handleError);
};

module.exports = errorRouter;
