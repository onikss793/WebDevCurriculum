const userRouter = require('./userRouter'),
	noteRouter = require('./noteRouter'),
	sessionDataRouter = require('./sessionDataRouter'),
	errorRouter = require('./errorRouter'),
	authMiddleware = require('../middleware/authMiddelware');

const routers = [
	{
		url: '/note',
		middlewares: [authMiddleware],
		router: noteRouter,
	},
	{ url: '/user', middlewares: [], router: userRouter },
	{ url: '/session', middlewares: [authMiddleware], router: sessionDataRouter }
];

const route = (app) => {
	routers.forEach(({ url, middlewares, router }) => {
		app.use(url, ...middlewares, router);
	});

	errorRouter(app);
};

module.exports = route;
