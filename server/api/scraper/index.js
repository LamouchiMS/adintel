var engine = require('./engine');

module.exports = function(app) {
  console.log('Loading engine...');
  // engine
  engine.scrape();
}
