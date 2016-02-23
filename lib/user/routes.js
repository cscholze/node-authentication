'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const User = require('./model');

router.get('/login', (req, res) => {
  res.render('login.jade');
});

router.post('/login', (req, res) => {
  User.findOne( {email: req.body.email}, (err, user) => {
    if (err) throw err;

    if (user) {
      user.authenticate(req.body.password, (err, verified) => {
        if (err) throw err;

        if (verified) {
          req.session.user = user;
          res.redirect('/');
        }
        else {
          res.render('login.jade', {
            email: req.body.email,
            message: 'Email password is incorrect'
          });
        }
      });
    }

    else {
      res.render('login.jade', {
          email: req.body.email,
          message: 'Email or password is incorrect'
      });
    }
  });
});

router.get('/register', (req, res) => {
  res.render('register.jade');
});

router.post('/register', (req, res) => {
  if (req.body.password === req.body.verify) {
    User.findOne( {email: req.body.email}, (err, user) => {
      if (err) throw err;

      if (user) {
        res.redirect('/login');
      }
      else {
        User.create(req.body, (err) => {
          if (err) throw err;

          res.redirect('/login');
        });
      }
    });
  }
  else {
    res.render('register.jade', {
      email: req.body.email,
      message: "Passwords do not match"
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(function(err) {
    if (err) throw err;
    // cannot access session here 
  });
  res.redirect('/');
});

module.exports = router;
