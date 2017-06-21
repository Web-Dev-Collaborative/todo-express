'use strict';
const fields = require('joi');
const {redirectAfterLogin, redirectIfLoggedIn} = require('../middleware/auth');
const Router = require('express-promise-router');
const validate = require('../middleware/validate');
const ValidationError = require('../modules/ValidationError');

const signupSchema = {
  email:     fields.string().email().required().label('Email address'),
  firstName: fields.string().required().label('First name'),
  lastName:  fields.string().required().label('Last name'),
  password:  fields.string().required().label('Password')
};

module.exports = ({db, log}) => {

  const {login, saveSession, signup} = require('../modules/auth')(db);
  const router = Router();

  router.get('/signup', redirectIfLoggedIn, (request, response) => {
    response.render('signup', {});
  });

  router.post('/signup', validate(signupSchema), async (request, response, next) => {
    const {email, firstName, lastName, password} = request.body;
    const {invalidations} = request;

    if (invalidations.length === 0) {
      try {
        await signup(email, firstName, lastName, password);

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
      response.render('signup', { email, firstName, lastName, invalidations });
    }
  }, redirectAfterLogin);

  return router;

};
