const express = require('express');
const { default: axios } = require('axios');

const app = express();
const db = [];

app.use(express.json());

app.get('/joke', async (req, res, next) => {
  const { data } = await axios.get('https://api.chucknorris.io/jokes/random');
  res.status(200).send({ data: data.value });
});

app.get('/', async (req, res, next) => {
  res.status(200).send(db);
});

app.post('/', async (req, res, next) => {
  const data = req.body;
  db.push({ data });
  res.status(201).send({ data });
});

app.listen(3000, () => {
  console.log('Running...');
});
