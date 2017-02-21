'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/build`));

app.listen(PORT, function() {
  console.log('SERVER RUNNING ON PORT', PORT);
});