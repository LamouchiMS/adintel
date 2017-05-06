var Entry = require('../../models/Entry');
var formatter = require('./formatDates');
var countriesFct = require('./countriesFct');
var fs = require('fs');

// formatter.formatDates();

module.exports = function(app) {
  app.get(
    '/api/getEntries/:project/:category/:contactInfo/:page/:country/:region/:town/:searchString/',
    function(
      req,
      res) {
      // console.log(req.params);
      var pageSize = 9;
      var regionsList = [];
      var townsList = [];
      var projectSelector = {};
      var contactSelector = {};
      var categorySelector = {};
      var countrySelector = {};
      var regionSelector = {};
      var townSelector = {};
      var searchStringSelector = {};

      var searchString = req.params.searchString;
      if (searchString !== '_') {
        searchStringSelector = {
          'body': {
            '$regex': searchString,
            '$options': 'i'
          }
        }
      }

      var page = parseInt(req.params.page);

      var town = req.params.town;
      if (town !== 'All') {
        townSelector = {
          'town': {
            '$regex': town,
            '$options': 'i'
          }
        }
      }

      var country = req.params.country;
      if (country !== 'All') {
        regionSelector = {
          'country': {
            '$regex': country,
            '$options': 'i'
          }
        }
        regionsList = countriesFct.getRegions(country.toLowerCase());
        regionsList.unshift('All');
      }

      var region = req.params.region;
      if (region !== 'All') {
        regionSelector = {
          'address': {
            '$regex': region,
            '$options': 'i'
          }
        }
        townsList = countriesFct.getTowns('canada', region.toLowerCase());
        townsList.unshift('All');
      }
      var project = req.params.project;
      if (project !== 'All') {
        projectSelector = {
          'project': {
            '$regex': project,
            '$options': 'i'
          }
        }
      }
      var contactInfo = req.params.contactInfo;
      if (contactInfo === 'Phone_Only') {
        contactSelector = {
          '$and': [{
            'email': ''
          }, {
            'phone': {
              '$ne': ''
            }
          }]
        }
      } else if (contactInfo === 'Email_Only') {
        contactSelector = {
          '$and': [{
            'phone': ''
          }, {
            'email': {
              '$ne': ''
            }
          }]
        }
      } else if (contactInfo === 'Email_Phone') {
        contactSelector = {
          '$and': [{
            'email': {
              '$ne': ''
            }
          }, {
            'phone': {
              '$ne': ''
            }
          }]
        }
      } else if (contactInfo === 'No_Info') {
        contactSelector = {
          '$and': [{
            'email': ''
          }, {
            'phone': ''
          }]
        }
      }
      var category = req.params.category;
      if (category === 'Wanted') {
        categorySelector = {
          category: 'Wanted'
        }
      } else if (category === 'Offering') {
        categorySelector = {
          category: 'Offering'
        }
      }
      console.log(req.params);
      var dateSelector = {
        $orderby: {
          date: -1
        }
      };
      var selector = {
        $and: [
          projectSelector,
          categorySelector,
          contactSelector,
          regionSelector,
          countrySelector,
          townSelector,
          searchStringSelector
        ]
      };
      Entry.find(selector, function(err, entries) {
        if (err) {
          return console.error(err);
        }

        Entry.count(selector, function(err, n) {
          if (err) {
            return console.error(err);
          }
          var maxPage = Math.floor(n / pageSize);
          if (((n / pageSize) - Math.floor(n / pageSize)) === 0) {
            maxPage -= 1;
          }

          entries = entries.map(function(entry) {
            var short = entry;
            if (short.body && short.body.length > 150) {
              short.body = entry.body.substring(0, 300) + '...';
            }
            return short;
          });

          return res.send({
            entries: entries,
            maxPage: maxPage,
            count: n,
            regionsList: regionsList,
            townsList: townsList
          });
        });
      }).sort({
        date: -1
      }).skip(pageSize * page).limit(pageSize);
    });
}
