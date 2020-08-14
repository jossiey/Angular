var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require('path');

app.use(express.static('./dist/web422-a4'));

// setup a 'route' to listen on the default url path
app.get('/*', function(req,res) {
    res.sendFile('index.html', {
        root: 'dist/web422-a4/'
    });
});


// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);