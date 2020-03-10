const http = require("http");
const url = require("url");
const querystring = require("querystring");

http.createServer((req, res) => {
    // TODO: 이 곳을 채워넣으세요..!
    const parsedUrl = url.parse(req.url);

    if (parsedUrl.pathname === "/foo") {
        const parsedQuery = querystring.parse(parsedUrl.query);
        const text = parsedQuery.bar;

        (req.method === "GET" || req.method === "POST") &&
            res.end(`Hello, ${text}`);
    } else {
        res.end("Hello World!");
    }
}).listen(8080);
