const bodyParser = require('body-parser');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const log = require('./log');

const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const requestLogger = require('./middlewares/request-logger');

const customFormatErrorFn = require('./graphql/custom-format-error-fn');
const schema = require('./graphql/schema');

const app = express();

app.use(requestLogger(log.info));

app.use(authMiddleware());

app.use(bodyParser.json());

app.get('/ping', (req, res) => res.status(200).send('pong'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    customFormatErrorFn,
  })
);

app.use(errorHandler());

module.exports = app;
