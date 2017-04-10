var sp = require('./info.json');
var extractor = require('../../extractor');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  // Custom headers
  customHeaders: {
    'Host': 'ecg-api.gumtree.com.au',
    'Proxy-Connection': 'keep-alive',
    'Accept': '*/*',
    'User-Agent': 'Firefox 21.2 (iPhone; iPhone OS 9.3.6; en_AU)',
    'Accept-Language': 'en-AU',
    'Authorization': 'Basic YXVfaXBob25lX2FwcDplY2dhcGkhZ2xvYmFs',
  },
  // Generate sources
  generateSources: function() {
    var result = [];
    sp.gumtreeAu.adTypes.forEach(function(adType) {
      var type = adType.code;
      sp.gumtreeAu.services.forEach(function(service) {
        var serviceAlias = service.alias_en;
        // var pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var pagesArray = [1];
        pagesArray.forEach(function(page) {
          var middle = '/page-' + page;
          if (page === 1) {
            middle = '';
          }

          var path = sp.gumtreeAu.website + '/' +
            serviceAlias + middle + '/' + service.code + suffix +
            type;
          var obj = {
            url: path,
            project: service.name,
            category: adType.name,
            country: 'Australia',
            source: 'Gumtree AU'
          }
          result.push(obj);
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
      $('a.ad-listing__thumb-link').each(function() {
        var url = $(this).attr('href');
        delete page.htmlBody;
        list.push({
          url: sp.gumtreeAu.website + url,
          project: page.project,
          category: page.category,
          country: page.country,
          source: page.source
        });
      });
      return resolve(list);
    });
  },
  // Parse entry
  parseEntry: function(entry) {}
}
