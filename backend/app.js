const express = require('express');
const cors = require('cors');
require('dotenv').config()


var indexRouter = require('./routes/index');
var adminRouter =require('./routes/admin');

var app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

var port = 3000;

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
});

module.exports = app;
