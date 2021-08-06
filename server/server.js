// server.js
crystalRoutes = require('./routes/crystalRoutes');

// main config
const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config/DB');
const { constants } = require('crypto');
const fs = require('fs');
const crystal = require('./models/crystal');

// api config
const app = express();
app.use('/crystal', crystalRoutes);

// mongoose config
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log('Database is connected');
    },
    (err) => {
      console.log('Can not connect to the database' + err);
    }
  );

// CORS handle
// const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
const port = process.env.PORT || 5000;

// Mapping Express Route with Server Route

// Run NOTE: This one for development
const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});

// NOTE: This one for deployment
/* var cert = fs.readFileSync('/usr/local/STAR_wovodat/STAR_wovodat_org.crt');
var key = fs.readFileSync( '/usr/local/STAR_wovodat/wovodat.org' );
var options = {
  key: key,
  cert: cert,
  secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
};
// // Run
var https = require('https');
https.createServer(options, app).listen(port); */
