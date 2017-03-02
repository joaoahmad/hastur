var express = require('express');
var path = require("path");

var app = express();

app.use(express.static(__dirname));
app.use('/dist', express.static(__dirname + '/../dist'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});

module.exports = app;
