'use strict';

const bodyParser = require('body-parser');
const connectRedis = require('connect-redis');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const userRoutes = require('./lib/user/routes');


const app = express();
const RedisStore = connectRedis(session);
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';

// SET VIEW RENDERING ENGINE
app.set('view engine', 'jade');

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  name: 'My Cookie',
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 30000
  },
  secret: SESSION_SECRET,
  store: new RedisStore({
    host: '127.0.0.1',
    port: '6379',
  })
}));

app.use( (req, res, next) => {
  app.locals.user = req.session.user || { email: 'Guest' };
  next();
});

// ROUTES
app.use(userRoutes);

app.use((req, res, next) => {
  req.session.visits = req.session.visits || {};
  req.session.visits[req.url] = req.session.visits[req.url] || 0;
  req.session.visits[req.url]++;

  console.log(req.session);
  next();
});


app.get('/', (req, res) => {
  res.render('index.jade', {user: req.session.user});
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.redirect('/login');
});


// START MONGODB CONNECTION AND SERVER
mongoose.connect('mongodb://localhost:27017/nodeauth', (err) => {
  if (err) throw err;

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
