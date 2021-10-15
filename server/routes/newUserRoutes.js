var express = require('express');
var app = express();
var newUserRoutes = express.Router();
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer();
var NewUser = require('../models/newUser');
const { check, validationResult } = require('express-validator');

newUserRoutes.route('/signup').post(
  // [
  //   check('name', 'Name is required').not().isEmpty(),
  //   check('email', 'Please include a valid email').isEmail(),
  //   check(
  //     'password',
  //     'Please enter a password with 6 or more characters'
  //   ).isLength({
  //     min: 6,
  //   }),
  // ],
  async (req, res) => {
    const newUser = new NewUser(req.body);
    try {
      const user = await newUser.save();
      res.status(201).send({ newUser });
      // console.log(newCrystal);
      console.log('Registered!');
    } catch (e) {
      res.status(400).send(e);
      console.log(e);
    }
  }
);

newUserRoutes.route('/login').post(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(req.body);

  try {
    let user = await NewUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatch = password == user.password;

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    } else {
      console.log('Log in successfully!');
      return res.status(200).json({ User });
    }

    //    const payload = {
    //      user: {
    //        id: user.id,
    //      },
    //    };

    //    jwt.sign(
    //      payload,
    //      config.get('jwtSecret'),
    //      { expiresIn: '5 days' },
    //      (err, token) => {
    //        if (err) throw err;
    //        res.json({ token });
    //      }
    //    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = newUserRoutes;
