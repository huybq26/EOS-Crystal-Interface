const mongoose = require('mongoose');
const validator = require('validator');

const Crystal = mongoose.model('Crystal', {
  'crystal name': {
    type: String,
    required: true,
    trim: true,
  },
  'type traverse': {
    type: String,
    trim: true,
  },
  axis: {
    type: String,
    trim: true,
  },
  orientation: {
    type: String,
    trim: true,
  },
  mineral: {
    type: String,
    required: true,
    trim: true,
  },
  volcano: {
    type: String,
    required: true,
    trim: true,
  },
  eruption: {
    type: String,
    required: true,
    trim: true,
  },
  reference: {
    type: String,
    required: true,
    trim: true,
  },
  // need to input an array of traverses also.
});

module.exports = Crystal;
