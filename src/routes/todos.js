'use strict';
const Router = require('express-promise-router');

module.exports = ({db, log}) => {

  const {addTodo, getTodos, removeTodo, updateTodo} = require('../modules/todos')(db);
  const {redirectIfNotLoggedIn} = require('../middleware/auth');
  const router = Router();

  router.get('/todos', redirectIfNotLoggedIn, async (request, response) => {
    const {user} = request.session;
    const todos = await getTodos(user.id);

    response.render('todos', { todos, user });
  });

  router.post('/todos', async (request, response) => {
    const {user} = request.session;
    const model = { user };
    const {add, addForm, description, editForm, name, remove, update} = request.body;
    const id = parseInt(request.body.id);

    if (addForm !== undefined) {
      model.adding = true;
    } else if (editForm !== undefined) {
      const todos = await getTodos(user.id);

      todos.find(todo => todo.id === id).editing = true;

      model.todos = todos;
    } else if (add !== undefined) {
      await addTodo(name, description, user.id);
    } else if (remove !== undefined) {
      await removeTodo(id);
    } else if (update !== undefined) {
      await updateTodo(name, description, id);
    }

    if (model.todos === undefined) {
      model.todos = await getTodos(user.id);
    }

    response.render('todos', model);
  });

  return router;

};
