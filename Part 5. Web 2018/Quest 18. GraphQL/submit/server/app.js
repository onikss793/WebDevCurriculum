const express = require('express'),
	logger = require('morgan'),
	cors = require('cors'),
	app = express(),
	bodyParser = require('body-parser'),
	apolloServer = require('./graphql/server');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
apolloServer.applyMiddleware({ app, path: '/api' });

/* TODO: 여기에 처리 해야 할 요청의 주소 별로 동작을 채워 넣어 보세요..! */

module.exports = app;