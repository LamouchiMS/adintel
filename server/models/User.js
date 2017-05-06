var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  enLang: {
    type: Boolean
  },
  source: {
    type: String
  },
  project: {
    type: String
  },
  category: {
    type: String
  },
  country: {
    type: String
  },
  region: {
    type: String
  },
  town: {
    type: String
  },
  messages: [{
    url: {
      type: String
    },
    text: {
      type: String
    },
    date: {
      type: String
    }
  }]
}, {
  timestamps: true
});

var User = mongoose.model('User', userSchema);
module.exports = User;
