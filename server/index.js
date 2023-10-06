var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
var path = require('path');
dotenv.config();
var port = process.env.SERVER_PORT;
var app = express();
app.use(cors());
app.use(express.json());
//router?
app.get("/", function (req, res) {
    res.send("Hello world!");
});
app.listen(port, '0.0.0.0', function () {
    console.log("Server is running on port ".concat(port));
});
