var lngDetector = new(require('languagedetect'));

function formatPhoneNumber(number) {
  var clean = number.replace(/\D/g, '');
  var result = '';
  for (var i = 0; i < number.length; i++) {
    result += clean.charAt(i);
    if (i === 2) {
      result += '-';
    } else if (i === 5) {
      result += '-';
    }
  }
  return result;
}

module.exports = {
  getPhone: function(text) {
    var phoneRegex =
      '\(([0-9]\{3\})\|[0-9]\{3\}\)[ -]\?[0-9]\{3\}[ -]\?[0-9]\{4\}';
    var match = text.match(phoneRegex);
    if (match) {
      var phoneNumber = formatPhoneNumber(match[0]);
      return phoneNumber;
    } else {
      return '';
    }
  },
  getLanguage: function(text) {
    var detectionResult = lngDetector.detect(text, 1);
    if (detectionResult.length) {
      return detectionResult[0][0];
    } else {
      return '';
    }
  },
  getEmail: function(text) {
    var emailRegex =
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    var match = text.match(emailRegex);
    if (match) {
      return match[0];
    } else {
      return '';
    }
  }
}
