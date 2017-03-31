module.exports = function(app){
  // Init
  require('./init')(app);
  // API
  require('./api')(app);
}
