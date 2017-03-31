var Entry = require('../../models/Entry');
var countriesFct = require('./countriesFct');

function getMonth(m) {
  var lowerM = m.toLowerCase();
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
    console.log(m);
    return 0;
  }
}

function formatDate(entry) {
  dateValue = entry.date;
  var monthStartIndex = 0;
  var monthEndIndex = 0;
  var count = 0;
  if (!dateValue)
    dateValue = '01-Jan-17';
  for (var i = 0; i < dateValue.length; i++) {
    if (count == 0 && dateValue.charAt(i) === '-') {
      monthStartIndex = i;
      count++;
    } else if (count == 1 && dateValue.charAt(i) === '-') {
      monthEndIndex = i;
      count--;
    }
  }

  var formatted = dateValue.substring(0, monthStartIndex) +
    dateValue.substring(monthStartIndex + 1, monthEndIndex) + dateValue.substring(
      monthEndIndex + 1, dateValue.length);

  var day = parseInt(dateValue.substring(0, monthStartIndex));
  var month = getMonth(dateValue.substring(monthStartIndex + 1,
    monthEndIndex));
  var year = parseInt('20' + dateValue.substring(monthEndIndex + 1, dateValue.length));
  var date = new Date(year, month, day);
  return date.getTime();
}

module.exports = {
  formatDates: function() {
    Entry.find({}, function(err, entries) {
      if (err) throw err;
      entries.forEach(function(entry) {
        // entry.date = formatDate(entry);
        // entry.date = entry.date.substring(1, entry.date.length);

        var link = entry.url;
        var count = 0;
        var startIndex = 0;
        var endIndex = 0;
        for (var i = 0; i < link.length; i++) {
          if (link.charAt(i) === '/') {
            count++;
          }
          if (count === 3) {
            startIndex = i;
          } else if (count === 4) {
            endIndex = i;
          }
        }
        var currentTown = link.substring(startIndex + 2, endIndex +
          1);
        currentTown = currentTown.replace(/-/g, ' ');
        entry.town = currentTown;

        entry.address = countriesFct.getNormalizedRegion('canada',
          currentTown);

        // entry.country = 'Canada';
        entry.save(function(err, saved) {
          if (err) throw err;
          console.log(saved.address + '\t' + saved.town);
        });
      });
    });
  }
}
