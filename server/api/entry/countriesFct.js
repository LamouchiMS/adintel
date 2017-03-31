var countries = require('./countries.json');

module.exports = {
  getRegions: function(country) {
    var regions = countries[country];
    return Object.keys(regions);
  },
  getTowns: function(country, region) {
    var regions = countries[country];
    regions = Object.keys(regions);
    var towns = [];
    for (var i = 0; i < regions.length; i++) {
      // console.log(regions[i].toLowerCase() + '\t' + region);
      if (regions[i].toLowerCase() === region) {
        console.log('here');
        console.log(regions[i]);
        towns = countries[country][regions[i]];
        console.log('towns', towns);
      }
    }
    return towns;
  },
  getNormalizedRegion: function(country, town) {
    var regions = countries[country];
    regions = Object.keys(regions);
    var found = false;
    var result = '';
    for (var i = 0; i < regions.length && !found; i++) {
      var currentTowns = countries[country][regions[i]];
      var index = currentTowns.indexOf(town);
      if (index > -1) {
        found = true;
        result = regions[i];
      }
    }
    return result;
  }
}
