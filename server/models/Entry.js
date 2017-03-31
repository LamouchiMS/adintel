var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
  url: {
    type: String,
    default: '',
    unique: true
  },
  category: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: '',
    unique: true
  },
  project: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  phase: {
    type: Number,
    default: 0
  },
  address: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
