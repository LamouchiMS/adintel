module.exports = function(app) {
    // Modules
    var express = require('express');
    var errorHandler = require('errorhandler');
    var dotenv = require('dotenv');

    // Environment
    dotenv.load({
        path: '.env'
    });

    // Mongoose
    require('./mongoose')();

    // Express
    require('./express')(app);

    // Error Handler
    app.use(errorHandler());
}
