module.exports = function() {
    var mongoose = require('mongoose');

    // Set mongodb URI
    var mongoURI = process.env.MONGOLAB_URI;

    // Connect to database
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoURI);
    mongoose.connection.on('error', function(err) {
        console.error(err);
        console.log(__dirname);
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    });
}
