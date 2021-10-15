const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traverse = new Schema({
  location: Number,
  an: Number,
  comments: Number,
  sio2: Number,
  al2o3: Number,
  cao: Number,
  na2o: Number,
  k2o: Number,
  feo: Number,
  total: Number,
  ab: Number,
  or: Number,
});

var crystalSearch = new Schema(
  {
    'crystal name': String,
    'type traverse': String,
    axis: String,
    orientation: String,
    mineral: String,

    volcano: String,
    eruption: String,

    reference: String,
    traverses: [traverse],
    // traverses: Object,
  },
  {
    collection: 'crystals',
  }
);

module.exports = mongoose.model('crystalSearch', crystalSearch);
