module.exports = function(app) {
  var path = require('path');

  // REST API
  require('../../api')(app);
  app.get('*', function(req, res) {
    return res.sendFile(path.join(__dirname, '../../../dist/index.html'));
  });
}
