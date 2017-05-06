var request = require('request');
var cheerio = require('cheerio');
var Entry = require('../../../models/Entry');
var sp = require('./info.json');
var extractor = require('../../extractor');

module.exports = {
  // Custom headers
  customHeaders: {},
  // Generate sources
  generateSources: function() {
    var result = [];
    sp.kijiji.locations.forEach(function(place) {
      var location = '/' + place.alias;
      var suffix = place.code
      var address = place.name;
      sp.kijiji.adTypes.forEach(function(adType) {
        var type = adType.code;
        sp.kijiji.services.forEach(function(service) {
          var serviceAlias = service.alias_en;
          if (place.name === 'Quebec') {
            serviceAlias = service.alias_fr;
          }
          var pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          // var pagesArray = [1];
          pagesArray.forEach(function(page) {
            var middle = '/page-' + page;
            if (page === 1) {
              middle = '';
            }

            var path = sp.kijiji.website + '/' +
              serviceAlias +
              location + middle + '/' + service.code +
              suffix +
              type;
            var obj = {
              url: path,
              address: address,
              project: service.name,
              category: adType.name,
              country: 'Canada',
              source: 'Kijiji'
            }
            result.push(obj);
          });
        });
      });
    });
    return result;
  },
  // Parse page
  parsePage: function(page) {
    return new Promise(function(resolve, reject) {
      var $ = cheerio.load(page.htmlBody);
      var list = [];
      $('a.title').each(function() {
        var url = $(this).attr('href');
        delete page.htmlBody;
        var current = 1;
        var expected = parseInt($('span.selected').text());
        if (page.url.split('/').length > 6) {
          current = parseInt(page.url.split('/')[5].split('-')[1]);
        }
        list.push({
          url: sp.kijiji.website + url,
          address: page.address,
          project: page.project,
          category: page.category,
          country: page.country,
          source: page.source,
          okToGo: current == expected
        });
      });
      return resolve(list);
    });
  },
  // Parse entry
  parseEntry: function(entry) {
    return new Promise(function(resolve, reject) {
      var $ = cheerio.load(entry.htmlBody);
      var date = $('table.ad-attributes td').html();
      var text = $('#UserContent').text();
      var obj = new Entry({
        url: entry.url,
        body: text,
        date: parseDate(date),
        address: entry.address,
        source: 'Kijiji',
        country: 'Canada',
        project: entry.project,
        phone: extractor.getPhone(text),
        language: extractor.getLanguage(text),
        email: extractor.getEmail(text),
        category: entry.category,
        town: entry.url.split('/')[4].split('-').join(' ')
      });
      return resolve(obj);
    });
  }
}

function parseDate(date) {
  var arr = date.split('-');
  var year = parseInt('20' + arr[2]);
  var month = parseMonth(arr[1]) - 1;
  var day = parseInt(arr[0]);
  return new Date(year, month, day);
}

function parseMonth(month) {
  var lowerM = month.toLowerCase();
  if (lowerM === 'jan' || lowerM === 'janv.')
    return 1;
  else if (lowerM === 'feb' || lowerM === 'f&#xe9;vr.')
    return 2;
  else if (lowerM === 'mar' || lowerM === 'mars')
    return 3;
  else if (lowerM === 'apr')
    return 4;
  else if (lowerM === 'may')
    return 5;
  else if (lowerM === 'jun')
    return 6;
  else if (lowerM === 'jul')
    return 7
  else if (lowerM === 'aug')
    return 8;
  else if (lowerM === 'sep')
    return 9;
  else if (lowerM === 'oct')
    return 10;
  else if (lowerM === 'nov')
    return 11;
  else if (lowerM === 'dec' || lowerM === 'd&#xe9;c.')
    return 12;
  else {
    console.log(lowerM);
    return 4;
  }
}
