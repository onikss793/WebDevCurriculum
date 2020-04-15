const express = require('express'),
    logger = require('morgan')('dev'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    app = express(),
    db = require('./database'),
    routes = require('./routes');

const { setUpData } = require('./utils');

app.use(logger);
app.use(express.static('client'));
app.use(cookieParser());
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

app.get('/', (req, res, err) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

routes(app);

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

const server = app.listen(8080, () => {
    console.log('Server started!');
});
