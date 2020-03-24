const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    app = express(),
    controller = require('./controller');

// app.use(cors());
app.use(express.static('client'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/memo', (req, res) => {
    const query = req.query;
    const data = query.name
        ? controller.readFile(`${query.name}.txt`)
        : controller.readFiles();

    res.status(200).json({ message: 'success', data });
});

app.post('/memo', (req, res) => {
    const data = req.body;

    if (data.title && data.title.length) {
        controller.writeFile(data);

        res.status(200).json({ message: 'success' });
    } else {
        res.status(400).json({ message: '제목을 입력해주세요' });
    }
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

const server = app.listen(8080, () => {
    console.log('Server started!');
});
