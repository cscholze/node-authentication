'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// SET VIEW RENDERING ENGINE
app.set('view engine', 'jade');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index.jade');
});

app.post('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login.jade');
});

app.post('/login', (req, res) => {
  res.redirect('/');
});

app.get('/register', (req, res) => {
  res.render('register.jade');
});

app.post('/register', (req, res) => {
  if (req.body.password === req.body.verify) {
    res.redirect('/login');
  }
  else
    res.render('register.jade', {
      email: req.body.email,
      message: "Passwords do not match"
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
