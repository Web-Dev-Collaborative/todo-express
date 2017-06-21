'use strict';
const isset = require('isset');
const {toCamelCase, toSnakeCase} = require('case-converter');  // TODO :: https://github.com/tgriesser/knex/issues/2084
const ValidationError = require('./ValidationError');

module.exports = db => {

  const addTodo = async (name, description, userId) => {
    // TODO :: do real validation?
    if (!isset(name) || !isset(description) || !isset(userId)) {
      throw new ValidationError('All required fields must be filled out.');
    } else {
      return await db.table('todos').insert(toSnakeCase({ name, description, userId }));
    }
  };

  const getTodos = async userId => {
    if (!isset(userId)) {
      throw new ValidationError('User ID must be specified.');
    } else {
      return await db.table('todos').where(toSnakeCase({ userId })).orderBy('id', 'asc');
    }
  };

  const removeTodo = async id => {
    if (!isset(id)) {
      throw new ValidationError('ID must be specified.');
    } else {
      return await db.table('todos').where({ id }).del();
    }
  };

  const updateTodo = async (name, description, id) => {
    // TODO :: do real validation?
    if (!isset(name) || !isset(description) || !isset(id)) {
      throw new ValidationError('All required fields must be filled out.');
    } else {
      return await db.table('todos').where({ id }).update({ name, description });
    }
  };

  return { addTodo, getTodos, removeTodo, updateTodo };

};
