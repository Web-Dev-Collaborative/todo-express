'use strict';
const fields = require('joi');
const {redirectAfterLogin, redirectIfLoggedIn} = require('../middleware/auth');
const Router = require('express-promise-router');
const validate = require('../middleware/validate');
const ValidationError = require('../modules/ValidationError');

const loginSchema = {
  email:    fields.string().email().required().label('Email address'),
  password: fields.string().required().label('Password')
};

module.exports = ({db, log}) => {

  const {login, saveSession} = require('../modules/auth')(db);
  const router = Router();

  router.get('/login', redirectIfLoggedIn, (request, response) => {
    response.render('login', {});
  });

  router.post('/login', validate(loginSchema), async (request, response, next) => {
    const {email, password} = request.body;
    const {invalidations} = request;

    if (invalidations.length === 0) {
      try {
        const userData = await login(email, password);

        await saveSession(request.session, userData);

        next();
      } catch (error) {
        if (error instanceof ValidationError) {
          invalidations.push(error.message);
        } else {
          next(error);
        }
      }
    }

    if (invalidations.length > 0) {
      response.render('login', { email, invalidations });
    }
  }, redirectAfterLogin);

  return router;

};
