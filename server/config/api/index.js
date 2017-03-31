module.exports = function(app) {
  var path = require('path');

  // REST API
  require('../../api')(app);
}
