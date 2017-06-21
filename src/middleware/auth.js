'use strict';

const redirectAfterLogin = (request, response) => {
  response.redirect(303, '/todos');
};

const redirectIfNotLoggedIn = (request, response, next) => {
  if (request.session.user === undefined) {
    response.redirect(307, '/login');
  } else {
    next();
  }
};

const redirectIfLoggedIn = (request, response, next) => {
  if (request.session.user !== undefined) {
    response.redirect(307, '/todos');
  } else {
    next();
  }
};

module.exports = {
  redirectAfterLogin,
  redirectIfLoggedIn,
  redirectIfNotLoggedIn
};
