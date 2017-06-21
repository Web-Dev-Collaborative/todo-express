'use strict';
const dropdb = require('gres/dropdb');

const run = async () => {
  try {
    await dropdb();
  } catch (error) {
    console.error(error.message);

    process.exitCode = 1;
  }
};

run();
