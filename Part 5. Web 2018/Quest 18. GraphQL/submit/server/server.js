const express = require('express'),
	logger = require('morgan'),
	cors = require('cors'),
	app = express(),
	db = require('./database'),
	apolloServer = require('./graphql/server'),
	bodyParser = require('body-parser');

const { setUpData } = require('./utils');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
	console.log(req.body.query)
	next();
});

db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database Connection Error: ', err));
db.sync({ force: true }).then(() => {
	setUpData()
		.then(() => console.log('Mock Up Success'))
		.catch((err) => console.log('Mock Up Error: ', err));
});

/* TODO: 여기에 처리 해야 할 요청의 주소 별로 동작을 채워 넣어 보세요..! */

apolloServer.applyMiddleware({ app, path: '/api' });
app.listen(8000, () => console.log('Server Listening to: ', 8000));