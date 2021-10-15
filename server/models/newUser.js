const mongoose = require('mongoose');

const NewUserSchema = new mongoose.Schema({
  //   _id: { type: 'string' },
  us_first: { type: 'string', placeholder: 'First Name' },
  us_family: { type: 'string', placeholder: 'Last Name' },
  displayName: { type: 'string', placeholder: 'UserModel Name' },
  email: { type: 'string', placeholder: 'Email', unique: true },
  password: { type: 'string' },
  us_photo: { type: 'object' },
  us_note: { type: 'string', placeholder: 'Note' },
  us_biblio: { type: 'string', placeholder: 'Bibliography' },
  us_is_pi: { type: 'boolean', placeholder: 'Principal Investigator' },
  us_is_co: { type: 'boolean', placeholder: 'Collector' },
  us_is_up: { type: 'boolean', placeholder: 'Uploader' },
  us_is_ad: { type: 'boolean', placeholder: 'Admin' },
  us_is_re: { type: 'boolean', placeholder: 'Researcher' },
  us_con: { type: 'boolean', placeholder: 'Confirmed' },
});

module.exports = NewUser = mongoose.model('NewUser', NewUserSchema);
