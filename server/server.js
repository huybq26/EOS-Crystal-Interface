// server.js
crystalRoutes = require('./routes/crystalRoutes');
//userRoutes = require('./app/routes/user.route');
auth = require('./routes/auth');
//newUser = require('./routes/newUserRoutes');

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
const logger = require('morgan');
const dbConfig = require('./app/config/db.config');

// api config
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    // parameterLimit: 50000,
  })
);
// app.use(cors());

var corsOptions = {
  origin: 'https://crystal.wovodat.org',
};

app.use(cors());

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// mongoose config
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(config.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(
//     () => {
//       console.log('Database is connected');
//     },
//     (err) => {
//       console.log('Can not connect to the database' + err);
//     }
//   );
const db = require('./app/models');
const Role = db.role;
db.mongoose
  //mongodb+srv://huybq:huy123456@cluster0.1rksj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  .connect(
    //'mongodb+srv://huybq:huy123456@cluster0.1rksj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    'mongodb://localhost:27017/eos',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });
// CORS handle
// const app = express();
// app.use(bodyParser.json());

app.get('/', cors(), (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use('/crystal', crystalRoutes);
// // app.use('/user', userRoutes);
// app.use('/auth', auth);
// app.use('/users', newUser);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// const port = process.env.PORT || 3001;
const port = process.env.PORT || 3001;

// Mapping Express Route with Server Route
setTimeout(function () {
  process.exit(0);
}, 15 * 60 * 1000);
// Run NOTE: This one for development
const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});

// //NOTE: This one for deployment
// var cert = fs.readFileSync('/usr/local/STAR_wovodat/STAR_wovodat_org.crt');
// var key = fs.readFileSync('/usr/local/STAR_wovodat/wovodat.org');
// var options = {
//   key: key,
//   cert: cert,
//   secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
// };
// // Run
// var https = require('https');
// https.createServer(options, app).listen(port);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'moderator',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
