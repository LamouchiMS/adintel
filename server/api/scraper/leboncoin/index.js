var Entry = require('../../../models/Entry');
var sp = require('./info.json');
var extractor = require('../../extractor');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  scrape: function() {
    // scrape();
    // firstRequests();
  },
  normalize: function() {
    normalize();
  }
}

function secondRequests(links) {
  var index = 0;
  var array = links;
  var result = [];
  var timerID = setInterval(function() {
    console.log('secondLength\t' + array.length + '\tsecondIndex\t' + index);
    var path = 'https:' + array[index].path;
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
      var date = $('p.line.line_pro').attr('content');
      date = date.split('-');
      date = new Date(parseInt(date[0]), parseInt(date[1]) - 1,
        parseInt(date[2]));
      date = date.getTime();
      var text = $('p.value').text();

      var obj = new Entry({
        url: path.toLowerCase(),
        body: text,
        date: date,
        address: array[index].address,
        source: 'LeBonCoin',
        project: array[index].project,
        country: 'France',
        town: array[index].town,
        phone: extractor.getPhone(text),
        language: extractor.getFrenchPhone(text),
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
          console.log(entry);
          // entry.save(function(err) {
          //   if (err) {
          //     return console.error(err);
          //   }
          //   console.log('Entry saved !!!');
          // });
        } else {
          console.error('Body duplication');
        }
      });
    } else {
      console.error('URL duplication');
    }
  });
}

function randomInterval() {
  return Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);
}

function nextPage(index, max, step) {
  var result = (Math.floor(index / step) + 1) * step;
  if (result < max) {
    return result;
  } else {
    return 0;
  }
}

function checkInterval(index, max, timerID, result, callback) {
  console.log('Inside checkInterval');
  console.log('index\t' + index);
  console.log('result\t' + result);
  console.log('max\t' + max);
  if (index > max) {
    clearInterval(timerID);
    if (callback) {
      callback(result);
    }
  };
}

function firstRequests() {
  var index = 0;
  var array = generateFirstUrls();
  var result = [];
  var timerID = setInterval(function() {
    console.log('length\t' + array.length + '\tindex\t' + index);
    console.log(array[index]);
    console.log('firstRequests()\t', path);
    index++;
    checkInterval(index, array.length, timerID, result, secondRequests);
    if (index >= array.length) {
      // clearInterval(timerID);
      console.log('timer ended');
    } else {
      var path = array[index].path;
      request(path, function(err, res, body) {
        if (err) {
          return console.error(err);
        }
        if (res.statusCode !== 200 && res.statusCode !== 302) {
          return console.error('Page not found');
        }
        var $ = cheerio.load(body);
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
          var divIndex = elems.indexOf('/');
          if (divIndex < 0)
            town = elems.join(' ').toString().replace(/,/g, ' ');
          else {
            town = elems.splice(0, divIndex).toString().replace(
              /,/g,
              ' ');
            region = elems.splice(1, elems.length - 1).toString().replace(
              /,/g, ' ');
          }
          var obj = {
            path: url,
            address: region,
            country: 'France',
            town: town,
            project: array[index].project,
            category: array[index].category
          };
          result.push(obj);
          console.log(result.length);
        });
      });
    }
  }, randomInterval());
}

function generateFirstUrls() {
  var result = [];
  sp.leboncoin.locations.forEach(function(place) {
    sp.leboncoin.adTypes.forEach(function(adType) {
      sp.leboncoin.services.forEach(function(service) {
        // var pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var pagesArray = [1];
        // https: //www.leboncoin.fr/cours_particuliers/demandes/ile_de_france/occasions/?o=2
        pagesArray.forEach(function(page) {
          var path = sp.leboncoin.website + '/' + service.code +
            '/' + adType.code + '/ile_de_france/occasions/?o=' +
            page;
          var obj = {
            path: path,
            project: service.name,
            category: adType.name
          }
          result.push(obj);
        });
      });
    });
  });
  return result;
}

// parsePage('https://www.leboncoin.fr/cours_particuliers/1107270721.htm?ca=12_k');

// function parsePage(url) {
//   console.log('parsing');
//   request(url, function(err, res, body) {
//     if (err) throw err;
//     if (res.statusCode !== 200 && res.statusCode !== 302) {
//       return console.error('Page not found');
//     }
//     var $ = cheerio.load(body);
//     var text = $('p.value').text()
//     var phone = extractor.getFrenchPhone(text);
//     var email = extractor.getEmail(text);
//     var date = $('p.line.line_pro').attr('content');
//     date = date.split('-');
//     date = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[
//       2]));
//     date = date.getTime();
//     console.log(text);
//     console.log(phone);
//     console.log(email);
//     console.log(date);
//   });
// }
//
// function scrape() {
//   var path =
//     'https://www.leboncoin.fr/cours_particuliers/demandes/ile_de_france/occasions/?o=1';
//   request(path, function(err, res, body) {
//     if (err) throw err;
//     if (res.statusCode !== 200 && res.statusCode !== 302) {
//       return console.error('Page not found');
//     }
//     var $ = cheerio.load(body);
//     $('a.list_item').each(function() {
//       var url = $(this).attr('href');
//       var title = $(this).attr('title');
//       var town = '';
//       var region = '';
//       var meta = $(this).find('.item_supp').text().replace(
//         /\s+/g, ' ');
//       var elems = meta.split(' ');
//       elems.splice(0, 1);
//       elems.splice(elems.length - 3);
//       var divIndex = elems.indexOf('/');
//       if (divIndex < 0)
//         town = elems.join(' ').toString().replace(/,/g, ' ');
//       else {
//         town = elems.splice(0, divIndex).toString().replace(/,/g, ' ');
//         region = elems.splice(1, elems.length - 1).toString().replace(
//           /,/g, ' ');
//       }
//       console.log(title + '|' + url + '|' + town + '|' + region);
//     });
//   });
// }

function normalize() {
  console.log('Normalizing leboncoin...');
}
