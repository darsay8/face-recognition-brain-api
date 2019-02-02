const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'rob',
        password: '',
        database: 'smart-brain'
    }
});

module.exports = db;