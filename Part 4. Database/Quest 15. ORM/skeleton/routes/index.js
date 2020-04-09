const userRouter = require('./userRouter'),
    noteRouter = require('./noteRouter'),
    errorRouter = require('./errorRouter'),
    authMiddleware = require('../middleware/authMiddelware');

const routers = [
    {
        url: '/note',
        middlewares: [authMiddleware],
        router: noteRouter,
    },
    { url: '/user', middlewares: [], router: userRouter },
];

const route = (app) => {
    routers.forEach(({ url, middlewares, router }) => {
        app.use(url, ...middlewares, router);
    });

    errorRouter(app);
};

module.exports = route;
