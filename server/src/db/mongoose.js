const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:41569/eos', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
