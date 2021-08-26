import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';

const entriesRouter = require('./routes/entries');
const feedsRouter = require('./routes/feeds');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/entries', entriesRouter);
app.use('/feeds', feedsRouter);

module.exports = app;
