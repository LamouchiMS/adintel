var fs = require('fs');
var request = require('request');
var leboncoin = require('./server/api/scraper/leboncoin');
var kijiji = require('./server/api/scraper/kijiji');
var extractor = require('./server/api/extractor');
var cheerio = require('cheerio');
var xml2js = require('xml2js');

var xmlParser = new xml2js.Parser();

function urlToBody(entry) {
  return new Promise(function(resolve, reject) {
    request(entry.url, function(err, res, body) {
      if (err)
        return reject(err);
      else if (res.statusCode !== 200 && res.statusCode !== 302)
        return reject('Page not found');
      else {
        entry.htmlBody = body;
        return resolve(entry);
      }
    });
  });
}

function randomInterval() {
  return Math.floor(Math.random() * (5000 - 2000 + 1) + 2000);
}

function randomDelay(res) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      return resolve(res);
    }, randomInterval());
  });
}

function fullCycle(page, parser) {
  return new Promise(function(resolve, reject) {
    urlToBody(page).then(parser).then(randomDelay).then(function(res) {
      return resolve(res);
    }).catch(function(err, x) {
      console.error(err);
    });
  });
}

function saveEntry(entry) {
  console.log(entry);
}

function recursiveLookup(array, i, fullList, pageParser, entryParser,
  isFirstStep) {
  if (isFirstStep) {
    if (i < array.length) {
      fullCycle(array[i], pageParser).then(function(res) {
        console.log('[+]\tPage ' + i + ' OK.\t' + res.length + ' results');
        fullList = fullList.concat(res);
        recursiveLookup(array, ++i, fullList, pageParser, entryParser, true);
      });
    } else {
      console.log(fullList);
      console.log('[*]\tDone!\t' + fullList.length + ' results\n\n');
      console.log('[*]\tParsing entries...');
      recursiveLookup(fullList, 0, [], pageParser, entryParser, false);
    }
  } else {
    if (i < array.length) {
      fullCycle(array[i], entryParser).then(function(res) {
        console.log('[+]\t' + res.title);
        saveEntry(res);
        recursiveLookup(array, ++i, [], pageParser, entryParser, false);
      });
    } else {
      console.log('[*]\tDone!\t' + array.length + ' saved');
    }
  }
}

// console.log(kijiji.generateSources());

// recursiveLookup(kijiji.generateSources(), 0, [], kijiji.parsePage,
//   kijiji.parseEntry, true);

var options = {
  url: 'https://ecg-api.gumtree.com.au/api/ads/1144500994',
  headers: {
    'Host': 'ecg-api.gumtree.com.au',
    'Proxy-Connection': 'keep-alive',
    'Accept': '*/*',
    'User-Agent': 'Firefox 21.2 (iPhone; iPhone OS 9.3.6; en_AU)',
    'Accept-Language': 'en-AU',
    'Authorization': 'Basic YXVfaXBob25lX2FwcDplY2dhcGkhZ2xvYmFs',
  }
}

function getCustom(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, res, body) {
      if (err)
        return reject(err);
      else if (res.statusCode !== 200 && res.statusCode !== 302)
        return reject('Page not found');
      else {
        fs.writeFile('res.xml', body, function(err) {
          if (err) throw err;
          console.log('Body > res.xml');
        });
      }
    });
  });
}

// getCustom(
//   options
// ).catch(function(err) {
//   console.error(err);
// });

fs.readFile('./res.xml', 'utf8', function(err, data) {
  if (err) throw err;
  xmlParser.parseString(data, function(err, result) {
    var body = result['ad:ad'][
      'ad:description'
    ][0];
    var email = extractor.getEmail(body);

    var phone = extractor.getPhone(body);
    console.log('[*]\tEmail:\t' + email);
    console.log('[*]\tPhone:\t' + phone);
    console.log('Done');
  });
});
