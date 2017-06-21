'use strict';
require('dotenv').config();

const host     = process.env.POSTGRES_HOST;
const name     = process.env.POSTGRES_NAME;
const port     = process.env.POSTGRES_PORT;
const password = process.env.POSTGRES_PASSWORD;
const user     = process.env.POSTGRES_USER;

const config = {
  client: 'pg',
  connection: {
    database: name,
    host,
    password,
    port,
    user
  },
  migrations: {
    tableName: 'migrations'
  }
};

module.exports = {
  development: config,
  staging: config,
  production: config
};
