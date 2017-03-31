module.exports = function(app) {
  require('./scraper')(app);
  require('./entry')(app);
}
