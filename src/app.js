import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';

import categoriesRouter from './routes/categories';
import entriesRouter from './routes/entries';
import feedsRouter from './routes/feeds';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/categories', categoriesRouter);
app.use('/entries', entriesRouter);
app.use('/feeds', feedsRouter);

module.exports = app;
