const knex = require('knex');

const dbENV = process.env.DB_ENV || 'development'

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig[dbENV]);
