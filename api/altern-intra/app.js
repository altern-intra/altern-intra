require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('./config/winston');

const index = require('./routes/index');
const users = require('./routes/users');
const Modules = require('./routes/modules');

const app = express();

const mongoosePromise = mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    useMongoClient: true,
  });
const notFoundHandler = (req, res, next) => {
  // catch 404 and forward to error handler
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const errorHandler = (err, req, res) => {
  // error handler
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: err });
  winston.log(err);
};
const initPromises = [mongoosePromise];

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

Promise.all(initPromises)
  .then((res) => {
    const [mongo] = res;
    const [ModulesRoutes] = [new Modules(mongo)];
    app.use('/', index);
    app.use('/users', users);
    app.use('/modules', ModulesRoutes.getRouter());
    app.use(notFoundHandler);
    app.use(errorHandler);
    winston.info('Starting successful');
  })
  .catch((err) => {
    winston.error(err);
  });


module.exports = app;
