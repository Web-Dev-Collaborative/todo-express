'use strict';
const addEnder = require('add-ender');
const joi = require('joi');

const options = { abortEarly: false };

const validate = schema => {
  return (request, response, next) => {
    joi.validate(request.body, schema, options, (error, coercedParams) => {
      if (error != null) {
        request.invalidations = error.details.map(detail => addEnder(detail.message));
      } else {
        request.invalidations = [];
        request.body = coercedParams;  // TODO :: use `Object.assign()` ?
      }

      next();
    });
  };
};

module.exports = validate;
