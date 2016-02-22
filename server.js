'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


// MIDDLEWARE
app.set('view enging', 'jade');

app.get('/', (req, res) => {
  res.render('index.jade');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
