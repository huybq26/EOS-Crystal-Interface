var express = require('express');
var app = express();
var crystalRoutes = express.Router();

var Crystal = require('../models/crystal');

crystalRoutes.route('/mineral').get(async (req, res) => {
  try {
    const result = await Crystal.find({});
    let array = [];
    result.forEach((item) => {
      if (!array.includes(item.mineral)) {
        array.push(item.mineral);
      }
    });
    res.send(array);
  } catch (e) {
    res.status(500).send(e);
  }
});

crystalRoutes.route('/eruption').get(async (req, res) => {
  try {
    const result = await Crystal.find({});
    let array = [];
    result.forEach((item) => {
      if (!array.includes(item.eruption)) {
        array.push(item.eruption);
      }
    });
    res.send(array);
  } catch (e) {
    res.status(500).send(e);
  }
});

crystalRoutes.route('/volcano').get(async (req, res) => {
  try {
    const result = await Crystal.find({});
    let array = [];
    result.forEach((item) => {
      if (!array.includes(item.volcano)) {
        array.push(item.volcano);
      }
    });
    res.send(array);
  } catch (e) {
    res.status(500).send(e);
  }
});

// crystalRoutes.route('/').get(async (req, res) => {
//   try {
//     const crystals = await Crystal.find({});
//     res.send(crystals);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

crystalRoutes.route('/:id').get(async (req, res) => {
  const _id = req.params.id;
  try {
    const crystal = await Crystal.findById(_id);

    if (!crystal) {
      res.status(400).send();
    }
    res.send(crystal);
  } catch (e) {
    res.status(500).send(e);
  }
});

crystalRoutes.route('/').get(async (req, res) => {
  // app.get('/search', async (req, res) => {
  // const keyword = req.query.q;
  let keyword = '';
  let keyword2 = '';
  let keyword3 = '';
  let keyword4 = '';
  let keyword5 = '';

  if (req.query.q != undefined) {
    keyword = req.query.q;
  }
  if (req.query.q2 != undefined) {
    keyword2 = req.query.q2;
  }
  if (req.query.q3 != undefined) {
    keyword3 = req.query.q3;
  }
  if (req.query.q4 != undefined) {
    keyword4 = req.query.q4;
  }
  if (req.query.q5 != undefined) {
    keyword5 = req.query.q5;
  }
  try {
    const crystal = await Crystal.find({
      $and: [
        {
          $or: [
            { 'crystal name': { $regex: keyword, $options: 'i' } },
            { mineral: { $regex: keyword, $options: 'i' } },
            { volcano: { $regex: keyword, $options: 'i' } },
            { eruption: { $regex: keyword, $options: 'i' } },
            { mineral: { $regex: keyword, $options: 'i' } },
            { 'type traverse': { $regex: keyword, $options: 'i' } },
            { orientation: { $regex: keyword, $options: 'i' } },
          ],
        },
        {
          $or: [
            { 'crystal name': { $regex: keyword2, $options: 'i' } },
            { mineral: { $regex: keyword2, $options: 'i' } },
            { volcano: { $regex: keyword2, $options: 'i' } },
            { eruption: { $regex: keyword2, $options: 'i' } },
            { mineral: { $regex: keyword2, $options: 'i' } },
            { 'type traverse': { $regex: keyword2, $options: 'i' } },
            { orientation: { $regex: keyword2, $options: 'i' } },
          ],
        },
        {
          $or: [
            { 'crystal name': { $regex: keyword3, $options: 'i' } },
            { mineral: { $regex: keyword3, $options: 'i' } },
            { volcano: { $regex: keyword3, $options: 'i' } },
            { eruption: { $regex: keyword3, $options: 'i' } },
            { mineral: { $regex: keyword3, $options: 'i' } },
            { 'type traverse': { $regex: keyword3, $options: 'i' } },
            { orientation: { $regex: keyword3, $options: 'i' } },
          ],
        },
        {
          $or: [
            { 'crystal name': { $regex: keyword4, $options: 'i' } },
            { mineral: { $regex: keyword4, $options: 'i' } },
            { volcano: { $regex: keyword4, $options: 'i' } },
            { eruption: { $regex: keyword4, $options: 'i' } },
            { mineral: { $regex: keyword4, $options: 'i' } },
            { 'type traverse': { $regex: keyword4, $options: 'i' } },
            { orientation: { $regex: keyword4, $options: 'i' } },
          ],
        },
        {
          $or: [
            { 'crystal name': { $regex: keyword5, $options: 'i' } },
            { mineral: { $regex: keyword5, $options: 'i' } },
            { volcano: { $regex: keyword5, $options: 'i' } },
            { eruption: { $regex: keyword5, $options: 'i' } },
            { mineral: { $regex: keyword5, $options: 'i' } },
            { 'type traverse': { $regex: keyword5, $options: 'i' } },
            { orientation: { $regex: keyword5, $options: 'i' } },
          ],
        },
      ],
    });
    if (!crystal) {
      res.status(400).send();
    }
    res.send(crystal);
  } catch (e) {
    res.status(500).send(e);
  }
});

crystalRoutes.route('/').post(async (req, res) => {
  const newCrystal = new Crystal(req.body);
  try {
    await newCrystal.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = crystalRoutes;
