const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traverse = new Schema({
  location: String,
  an: String,
  comments: String,
  sio2: String,
  al2o3: String,
  cao: String,
  na2o: String,
  k2o: String,
  feo: String,
  total: String,
  ab: String,
  or: String,
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
