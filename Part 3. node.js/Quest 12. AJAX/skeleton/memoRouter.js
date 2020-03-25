const memoController = require('./memoController');

const memoRouter = app => {
    app.get('/memo', memoController.getMemo);
    app.post('/memo', memoController.createMemo);
};

module.exports = memoRouter;
