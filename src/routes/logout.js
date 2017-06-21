'use strict';
const {redirectIfNotLoggedIn} = require('../middleware/auth');
const Router = require('express-promise-router');

module.exports = ({db, log}) => {

  const router = Router();

  // Avoid "logout CSRF" that would occur with `get`
  router.post('/logout', redirectIfNotLoggedIn, (request, response) => {
    request.session.destroy(error => response.redirect(303, '/'));
  });

  return router;

};
