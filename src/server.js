'use strict';
const startTodoServer = require('./');

startTodoServer({
  appHostname: process.env.APP_HOSTNAME,
  appPort:     process.env.APP_PORT,
  appProtocol: process.env.APP_PROTOCOL,
  appSecret:   process.env.APP_SECRET_KEY,
  dbHost:      process.env.POSTGRES_HOST,
  dbName:      process.env.POSTGRES_NAME,
  dbPassword:  process.env.POSTGRES_PASSWORD,
  dbPort:      process.env.POSTGRES_PORT,
  dbUser:      process.env.POSTGRES_USER
});
