var createError = require('http-errors');
var express = require('express');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

var port = 3000;

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
module.exports = app;
