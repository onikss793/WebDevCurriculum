const http = require("http");
const url = require("url");
const querystring = require("querystring");

http.createServer((req, res) => {
    // TODO: 이 곳을 채워넣으세요..!
    const URL = url.parse(req.url);
    const QUERY = querystring.parse(URL.query);

    if (URL.pathname === "/foo") {
        const text = QUERY.bar;

        (req.method === "GET" || req.method === "POST") &&
            res.end(`Hello, ${text}`);
    } else {
        res.end("Hello World!");
    }
}).listen(8080);
