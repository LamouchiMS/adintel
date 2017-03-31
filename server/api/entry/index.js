var Entry = require('../../models/Entry');

module.exports = function(app) {
  app.get('/api/getEntries/:project/:category/:contactInfo/:page', function(
    req,
    res) {
    var pageSize = 9;
    var projectSelector = {};
    var contactSelector = {};
    var categorySelector = {};
    var page = parseInt(req.params.page);
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
    var selector = {
      $and: [
        projectSelector,
        categorySelector,
        contactSelector
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
          if (short.body.length > 150) {
            short.body = entry.body.substring(0, 300) + '...';
          }
          return short;
        });

        return res.send({
          entries: entries,
          maxPage: maxPage,
          count: n
        });
      });
    }).skip(pageSize * page).limit(pageSize);
  });
}
