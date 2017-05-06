var kijiji = require('../kijiji');
var leboncoin = require('../leboncoin');
var gumtreeAu = require('../gumtreeAu');
var request = require('request');
var fs = require('fs');
var Entry = require('../../../models/Entry');

var min = 1000;
var max = 2000;

function urlToBody(entry) {
  return new Promise(function(resolve, reject) {
    request(entry.url, function(err, res, body) {
      console.log('[$]\tGET\t' + entry.url);
      console.log('[$]\tCode\t' + res.statusCode);
      console.log('[$]\tBody Length\t' + body.length);
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
  return Math.floor(Math.random() * (max - min + 1) + min);
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
  Entry.findOne({
    url: entry.url
  }, function(err, found) {
    if (err) throw err;
    if (!found)
      entry.save(function(err, saved) {
        if (err) throw err;
        if (!saved._id)
          console.log('Error!!\n' + entry);
        console.log('[+]\t' + saved._id);
      });
  });
}

function altNextPage(x) {
  return (Math.floor(x / 10) + 1) * 10;
}

function recursiveLookup(array, i, fullList, pageParser, entryParser,
  isFirstStep) {
  if (isFirstStep) {
    if (i < array.length) {
      fullCycle(array[i], pageParser).then(function(res) {
        console.log('[+]\tPage ' + i + ' OK.\t' + res.length + ' results');
        if (!res[0].okToGo)
          i = altNextPage(i);
        else {
          fullList = fullList.concat(res);
          i++;
        }
        recursiveLookup(array, i, fullList, pageParser, entryParser, true);
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
        console.log('[+]\t' + res.url);
        saveEntry(res);
        recursiveLookup(array, ++i, [], pageParser, entryParser, false);
      });
    } else {
      console.log('[*]\tDone!\t' + array.length + ' saved');
    }
  }
}

module.exports = {
  scrape: function() {
    // recursiveLookup(kijiji.generateSources(), 0, [], kijiji.parsePage,
    //   kijiji.parseEntry, true);
    // recursiveLookup(leboncoin.generateSources(), 0, [], leboncoin.parsePage,
    //   leboncoin.parseEntry, true);
    // recursiveLookup(gumtreeAu.generateSources(), 0, [], gumtreeAu.parsePage,
    //   gumtreeAu.parseEntry, true);
  }
}
