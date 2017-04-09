var request = require('request');
var cheerio = require('cheerio');
var Entry = require('../../../models/Entry');
var sp = require('./info.json');
var extractor = require('../../extractor');

module.exports = {
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
          // var pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          var pagesArray = [1];
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
        list.push({
          url: sp.kijiji.website + url,
          address: page.address,
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
      var date = $('table.ad-attributes td').html();
      var text = $('#UserContent').text();
      var obj = new Entry({
        url: entry.url,
        body: text,
        date: date,
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

function normalize() {
  console.log('Normalization started');
  Entry.find({}, function(err, entries) {
    if (err) throw err;
    entries.forEach(function(entry) {
      var link = entry.url;
      var count = 0;
      var startIndex = 0;
      var endIndex = 0;
      var bCount = 0;
      for (var i = 0; i < link.length; i++) {
        if (link.charAt(i) === '/') {
          count++;
        }
        if (count === 2) {
          startIndex = i;
        } else if (count === 3) {
          endIndex = i;
        }
      }
      var correctProjectAlias = link.substring(startIndex + 2, endIndex +
        1);
      // console.log(link);
      // console.log(correctProjectAlias);
      var projectIndex = 0;
      // console.log(correctProjectAlias);
      for (var j = 0; j < sp.kijiji.services.length; j++) {
        if (sp.kijiji.services[j].alias_en === correctProjectAlias ||
          sp.kijiji.services[
            j].alias_fr === correctProjectAlias) {
          entry.project = sp.kijiji.services[j].name;
          entry.save(function(err) {
            if (err) throw err;
            console.log('Changed');
          });
        }
      }
    });
  });
}


function randomInterval() {
  return Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);
}

function checkInterval(index, max, timerID, result, callback) {
  if (index === max - 1) {
    clearInterval(timerID);
    if (callback) {
      callback(result);
    }
  };
}

function nextPage(index, max, step) {
  var result = (Math.floor(index / step) + 1) * step;
  if (result < max) {
    return result;
  } else {
    return 0;
  }
}

function firstRequests() {
  var index = 0;
  var array = generateFirstUrls();
  var result = [];
  var timerID = setInterval(function() {
    var path = array[index].path;
    console.log('firstRequests()\t', path);
    index++;
    checkInterval(index, array.length, timerID, result, secondRequests);
    request(path, function(err, res, body) {
      if (err) {
        return console.error(err);
      }
      if (res.statusCode !== 200 && res.statusCode !== 302) {
        return console.error('Page not found');
      }
      var $ = cheerio.load(body);
      if ($('a.title').toArray().length === 0) {
        index = nextPage(index, array.length, 10);
      } else {
        $('a.title').each(function() {
          var url = $(this).attr('href');
          var obj = {
            path: sp.kijiji.website + url,
            address: array[index].address,
            project: array[index].project,
            category: array[index].category
          };
          result.push(obj);
          console.log('First links size:\t', result.length);
        });
      }
    });
  }, randomInterval());
}

function secondRequests(links) {
  var index = 0;
  var array = links;
  var result = [];
  var timerID = setInterval(function() {
    var path = array[index].path;
    console.log('secondRequests()\t', path);
    index++;
    checkInterval(index, array.length, timerID);
    request(path, function(err, res, body) {
      if (err) {
        return console.error(err);
      }
      if (res.statusCode !== 200 && res.statusCode !== 302) {
        return console.error('Page not found');
      }
      var $ = cheerio.load(body);
      var date = $('table.ad-attributes td').html();
      var text = $('#UserContent').text();

      var obj = new Entry({
        url: path.toLowerCase(),
        body: text,
        date: date,
        address: array[index].address,
        source: 'Kijiji',
        project: array[index].project,
        phone: extractor.getPhone(text),
        language: extractor.getLanguage(text),
        email: extractor.getEmail(text),
        category: array[index].category
      });
      saveEntry(obj);
    });
  }, randomInterval());
}

function saveEntry(entry) {
  Entry.find({
    url: entry.url
  }, function(err, results) {
    if (err) {
      return console.error(err);
    }
    if (results.length === 0) {
      Entry.find({
        body: entry.body
      }, function(err, secondResults) {
        if (err) {
          return console.error(err);
        }
        if (secondResults.length === 0) {
          entry.save(function(err) {
            if (err) {
              return console.error(err);
            }
            console.log('Entry saved !!!');
          });
        } else {
          console.error('Body duplication');
        }
      });
    } else {
      console.error('URL duplication');
    }
  });
}
