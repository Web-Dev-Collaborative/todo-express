# todo-express
> A sample to-do application built with [Express](https://npmjs.com/express).


I wanted to learn Express but all of the tutorials I'd found were either outdated or just plain wrong. I've gathered best practices from multiple, very skilled people and assembled them here.

This is a modern antique multi-page application built with no CSS nor client-side JavaScript.

* Supports multiple instances (not a singleton)
* Simple setup
* SQL migrations
* No SQL concatenation (via a query builder)
* No CSRF
* Form validations
* Logger

Not done yet:
* test suite


## Installation

Be sure that [Git](https://git-scm.com) `>= 2`, [Node.js](http://nodejs.org) `>= 8` and [PostgreSQL](https://postgresql.org) `>= 9` are installed.

Open a command line at, or change directory (`cd`) to where you'd like the project to exist (as a sub-directory).

Checkout the repository:
```shell
git clone git@github.com:stevenvachon/todo-express.git
```

Open the project directory:
```shell
cd todo-express
```

Create the database and user:
```shell
npm run createdb
```

Install all dependencies:
```shell
npm install
```


## Serving & Testing

To start the development server:
```shell
npm start
```

To run the tests:
```shell
npm test
```

To run the tests on file changes:
```shell
npm run watch
```


## Utilities

You can check to see if any dependencies have updates available with:
```shell
npm run check-updates
```

You can remove the database and its user with:
```shell
npm run dropdb
```

You can update the database after breaking changes with:
```js
npm run migrate-up
```

Advanced migrations will require using `knex` directly:
```js
npx knex
```
