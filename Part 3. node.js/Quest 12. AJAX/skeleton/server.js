const express = require('express'),
    path = require('path'),
    app = express(),
    memoRouter = require('./memoRouter'),
    errorRouter = require('./errorRouter');

app.use(express.static('client'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

memoRouter(app);
errorRouter(app);

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

const server = app.listen(8080, () => {
    console.log('Server started!');
});
