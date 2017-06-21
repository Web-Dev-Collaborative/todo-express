'use strict';
const {spawn:spawnProcess} = require('child-process-promise');
const createdb = require('gres/createdb');

const createSchema = async () => {
  try {
    await spawnProcess('npm', ['run', 'migrate-up', '--silent'], { stdio:'inherit' });
  } catch (error) {
    // Error will have already been logged
    process.exitCode = 1;
  }
};

const run = async () => {
  try {
    await createdb();
    await createSchema();
  } catch (error) {
    console.error(error.message);

    process.exitCode = 1;
  }
};

run();
