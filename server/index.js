var express = require('express');
var app = express();
var server = require('http').Server(app);
require('./config')(app);

var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
