const express = require('express');
require('./db/mongoose');
const Crystal = require('./models/crystal');
// define models here

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/crystals', async (req, res) => {
  try {
    const crystals = await Crystal.find({
      'type traverse': 'Rim-to-Core',
    });
    res.send(crystals);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/crystals/:id', async (req, res) => {
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

app.get('/search', async (req, res) => {
  if (req.query.name) {
    const crystal_name = req.query.name;
  }
  //   const type_traverse = req.query.traverse;
  //   const axis = req.query.axis;
  //   const orientation = req.query.orientation;
  //   const mineral = req.query.mineral;
  const volcano = req.query.volcano;
  const eruption = req.query.eruption;
  try {
    const crystal = await Crystal.find({
      // 'crystal name': crystal_name,
      //   mineral: mineral,
      volcano: volcano,
      eruption: eruption,
    });
    if (!crystal) {
      res.status(400).send();
    }
    res.send(crystal);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/crystals', async (req, res) => {
  const newCrystal = new Crystal(req.body);
  try {
    await newCrystal.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
