var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true
  },
  town: {
    type: String
  },
  category: {
    type: String
  },
  country: {
    type: String
  },
  body: {
    type: String
  },
  project: {
    type: String
  },
  source: {
    type: String
  },
  date: {
    type: Date
  },
  phase: {
    type: Number
  },
  address: {
    type: String
  },
  email: {
    type: String,
    unique: false
  },
  language: {
    type: String
  },
  phone: {
    type: String
  }
}, {
  timestamps: true
});

var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
