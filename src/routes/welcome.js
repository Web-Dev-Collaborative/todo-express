'use strict';
const Router = require('express-promise-router');

module.exports = ({db, log}) => {

  const {redirectIfLoggedIn} = require('../middleware/auth');
  const router = Router();

  router.get('/', redirectIfLoggedIn, (request, response) => {
    response.render('welcome', {});
  });

  return router;

};
