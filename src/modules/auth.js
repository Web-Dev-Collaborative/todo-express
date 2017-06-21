'use strict';
const {hash, verifyHash} = require('scrypt-for-humans');
const {toCamelCase, toSnakeCase} = require('case-converter');  // TODO :: https://github.com/tgriesser/knex/issues/2084
const ValidationError = require('./ValidationError');

module.exports = db => {

  const login = async (email, password) => {
    const users = await db.table('users').where({ email });

    if (users.length === 1) {
      const {firstName, hashedPassword, id, lastName} = toCamelCase(users[0]);

      try {
        await verifyHash(password, hashedPassword);

        return { email, firstName, id, lastName };
      } catch(error) {
        if (error.name === 'ScryptPasswordError') {
          throw new ValidationError('Incorrect password.');
        } else {
          throw error;
        }
      }
    } else if (users.length === 0) {
      throw new ValidationError(`An account for ${email} does not exist.`);
    } else {
      throw new Error(`Multiple accounts for ${email} found.`);
    }
  };

  const saveSession = (session, userData) => {
    return new Promise((resolve, reject) => {

      Object.assign(session, { user: userData });

      // Modern browsers do not complete a response when there's a location header, so it's safest to manually save the session
      session.save(error => {
        if (error != null) {
          reject(error);
        } else {
          resolve();
        }
      });

    });
  };

  const signup = async (email, firstName, lastName, password) => {
    const users = await db.table('users').where({ email });

    if (users.length > 0) {
      throw new ValidationError(`An account for ${email} already exists.`);
    } else {
      const hashedPassword = await hash(password);

      await db.table('users').insert(toSnakeCase({ email, firstName, hashedPassword, lastName }));
    }
  };

  return { login, saveSession, signup };

};
