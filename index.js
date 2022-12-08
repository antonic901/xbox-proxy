let express = require("express"),
    bodyParser = require("body-parser"),
    process = require("process"),
    { makeRequest } = require("./service");

let app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
    makeRequest("get", req.body.url, req.headers, req.query, null).then(
        (result) => {
            res.statusCode = result.status;
            res.send(result.body);
        }
    );
});

app.post("/", function (req, res) {
    makeRequest("post", req.body.url, req.headers, req.query, req.body.body).then(
        (result) => {
            res.statusCode = result.status;
            res.send(result.body);
        }
    );
});

app.put("/", function (req, res) {
    makeRequest("put", req.body.url, req.headers, req.query, req.body.body).then(
        (result) => {
            res.statusCode = result.status;
            res.send(result.body);
        }
    );
});

app.patch("/", function (req, res) {
    makeRequest("patch", req.body.url, req.headers, req.query, req.body.body).then(
        (result) => {
            res.statusCode = result.status;
            res.send(result.body);
        }
    );
});

app.delete("/", function (req, res) {
    makeRequest("delete", req.body.url, req.headers, req.query, null).then(
        (result) => {
            res.statusCode = result.status;
            res.send(result.body);
        }
    );
});

let host = process.env.HOST || require("./utils/network").getHostAddress();
let port = process.env.PORT || 9007;

app.listen(port, host)
    .on("error", (e) => {
        if (e.code !== "EADDRINUSE" && e.code !== "EACCES") {
            throw e;
        }
        console.log(
            "Port " + port + " is busy. Trying the next available port..."
        );
        app.listen(++port);
    })
    .on("listening", () => {
        console.log(
            "API is successfully started. Listening on http://" +
                host +
                ":" +
                port
        );
    });
