const http = require('http');
const url = require('url');
const querystring = require('querystring');

http.createServer((req, res) => {
    // TODO: 이 곳을 채워넣으세요..!
    const parsed_url = url.parse(req.url);

    route(parsed_url, req, res);
}).listen(8080, () => console.log('Listening to PORT: ', 8080));

function route(url, req, res) {
    console.log('METHOD: ', req.method);
    if (url.pathname === '/foo') {
        switch (req.method) {
            case 'GET':
                handleGetFoo(req, res, url);
                break;

            case 'POST':
                handlePostFoo(req, res, url);
                break;
        }
    }
}

function handlePostFoo(req, res) {
    let serverData = '';

    req.on('data', data => {
        serverData += data;
    });

    req.on('end', () => {
        const body = encodeBody(req, serverData);

        res.end(responseForBar(body));
    });
}

function encodeBody(req, data) {
    const contentType = detectMultipartFormData(req)
        ? 'multipart/form-data'
        : req.headers['content-type'];

    switch (contentType) {
        case 'application/json': {
            const body = JSON.parse(data);

            return body;
        }

        case 'application/x-www-form-urlencoded': {
            const body = urlEncoded(data);

            return body;
        }

        case 'multipart/form-data': {
            const body = data.toString();

            const arr = body
                .split('----------------------------')
                .join('')
                .split('\r\n');

            const encodedBody = getKeyValue(arr);

            return encodedBody;
        }
    }
}

function getKeyValue(arr) {
    let key = '';
    let value = '';
    let objects = [];

    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];

        if (el === '' && i < arr.length - 1) {
            value += arr[i + 1];
        }

        if (el.match('Content-Disposition: form-data; ')) {
            key += el.slice(el.indexOf('"') + 1, el.lastIndexOf('"'));
        }

        if (key.length && value.length) {
            objects.push({ [key]: value });

            key = '';
            value = '';
        }
    }

    return objects.reduce((acc, curr) => {
        return { ...curr, ...acc };
    });
}

function detectMultipartFormData(req) {
    return req.headers['content-type'].match('multipart/form-data');
}

function handleGetFoo(req, res, url) {
    const query = querystring.parse(url.query);

    res.end(responseForBar(query.bar));
}

function responseForBar(body) {
    const text = body ? body.bar : 'bar';

    return JSON.stringify({ message: `Hello, ${text}` });
}

function urlEncoded(buffer) {
    const stringifiedBuffer = buffer.toString();

    const body = stringifiedBuffer
        .split('&')
        .map(str => str.split('='))
        .map(pair => pair.reduce((acc, curr) => ({ [acc]: curr })))
        .reduce((acc, curr) => ({ ...acc, ...curr }));

    return body;
}
