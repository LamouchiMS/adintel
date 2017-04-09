var sp = require('./info.json');
var extractor = require('../../extractor');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  // Generate sources
  generateSources: function() {
    var result = [];
    sp.leboncoin.locations.forEach(function(place) {
      sp.leboncoin.adTypes.forEach(function(adType) {
        sp.leboncoin.services.forEach(function(service) {
          // var pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          var pagesArray = [1];
          // https: //www.leboncoin.fr/cours_particuliers/demandes/ile_de_france/occasions/?o=2
          pagesArray.forEach(function(page) {
            var path = sp.leboncoin.website + '/' +
              service.code +
              '/' + adType.code +
              '/ile_de_france/occasions/?o=' +
              page;
            var obj = {
              url: path,
              project: service.name,
              category: adType.name,
              country: 'France',
              source: 'LeBonCoin'
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
      $('a.list_item').each(function() {
        var url = $(this).attr('href');
        var title = $(this).attr('title');
        var town = '';
        var region = '';
        var meta = $(this).find('.item_supp').text().replace(
          /\s+/g, ' ');
        var elems = meta.split(' ');
        elems.splice(0, 1);
        elems.splice(elems.length - 3);
        if (!isNaN(parseInt(elems[elems.length - 1])))
          elems.splice(elems.length - 1);
        var divIndex = elems.indexOf('/');
        if (divIndex < 0)
          town = elems.join(' ').toString().replace(/,/g, ' ');
        else {
          town = elems.splice(0, divIndex).toString().replace(/,/g,
            ' ');
          region = elems.splice(1, elems.length - 1).toString().replace(
            /,/g, ' ');
        }
        delete page.htmlBody;
        list.push({
          title: title,
          url: 'https:' + url,
          town: town,
          region: region,
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
  parseEntry: function(entry) {
    return new Promise(function(resolve, reject) {
      var $ = cheerio.load(entry.htmlBody);
      var text = $('p.value').text()
      var phone = extractor.getFrenchPhone(text);
      var email = extractor.getEmail(text);
      var language = extractor.getLanguage(text);
      var date = $('p.line.line_pro').attr('content');
      date = date.split('-');
      date = new Date(parseInt(date[0]), parseInt(date[1]) - 1,
        parseInt(
          date[
            2]));
      date = date.getTime();
      delete entry.htmlBody;
      entry.body = text;
      entry.phone = phone;
      entry.email = email;
      entry.date = date;
      entry.language = language;
      return resolve(entry);
    });
  }
}
