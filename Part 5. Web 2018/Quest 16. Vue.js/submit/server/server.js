const express = require('express'),
	logger = require('morgan')('dev'),
	cors = require('cors'),
	session = require('express-session'),
	app = express(),
	db = require('./database'),
	routes = require('./routes');

const { setUpData } = require('./utils');

app.use(cors())
app.use(logger);
app.use(express.json());
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
	})
);

db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database Connection Error: ', err));
db.sync({ force: true }).then(() => {
	setUpData()
	.then(() => console.log('Mock Up Success'))
	.catch((err) => console.log('Mock Up Error: ', err));
});

routes(app);

/* TODO: 여기에 처리 해야 할 요청의 주소 별로 동작을 채워 넣어 보세요..! */

app.listen(8000, () => {
	console.log('Server started! PORT: ', 8000);
});
