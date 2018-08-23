/* eslint-disable prefer-destructuring,consistent-return */
const resolve = require('path').resolve;

const app = require('express')();
const logger = require('./logger');

const args = require('./arguments');

const port = parseInt(args.port || process.env.PORT || '3000', 10);
const setup = require('./middlewares');
// const isDev = process.env.NODE_ENV !== 'production';

const customHost = args.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
