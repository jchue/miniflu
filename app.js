const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const categoriesRouter = require('./routes/categories');
const entriesRouter = require('./routes/entries');
const feedsRouter = require('./routes/feeds');

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  // Direct all non-api paths to static client
  app.get(/^\/(?!api)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/categories', categoriesRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/feeds', feedsRouter);

module.exports = app;
