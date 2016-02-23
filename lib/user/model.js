'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const BCRYPT_DIFFICULTY = 12;

const UserSchema = mongoose.Schema({
  email: String,
  password: String
});

UserSchema.methods.authenticate = function(password, cb) {
  bcrypt.compare(password, this.password, cb)
};

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, BCRYPT_DIFFICULTY, (err, hash) => {
    console.log(this.password, BCRYPT_DIFFICULTY);
    if (err) throw err;

    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
