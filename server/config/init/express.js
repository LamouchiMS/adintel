module.exports = function(app) {
    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');

    console.log(path.join(__dirname, '../../../dist'));

    app.use(express.static(path.join(__dirname, '../../../dist')));
    app.use(bodyParser.json());
}
