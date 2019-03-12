const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors') 
const mongoose = require('mongoose')
const indexRouter = require('./routes/index');

const app = express();
mongoose.connect('mongodb://localhost/mini-wp', { useNewUrlParser: true })
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
