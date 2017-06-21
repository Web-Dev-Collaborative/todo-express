'use strict';

const down = async db => {

};

const up = async db => {
  // Migrations are ran as transactions by default, so no need to use one here
  await db.schema.createTableIfNotExists('users', table => {
    table.increments('id');
    table.string('email');
    table.string('hashed_password');
    table.string('first_name');
    table.string('last_name');
    table.timestamps(true, true);
  });

  await db.schema.createTableIfNotExists('todos', table => {
    table.increments('id');

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.string('name');
    table.text('description');
    table.timestamps(true, true);
  });
};

module.exports = { down, up };
