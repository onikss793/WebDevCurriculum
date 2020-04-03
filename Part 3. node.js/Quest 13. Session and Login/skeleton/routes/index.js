const memoRouter = require('./memoRouter'),
    accountRouter = require('./accountRouter'),
    errorController = require('../controllers/errorController');

const route = app => {
    app.use('/memo', memoRouter);
    app.use('/account', accountRouter);

    app.all('*', errorController.notFound);
    app.use(errorController.handleError);
};

module.exports = route;
