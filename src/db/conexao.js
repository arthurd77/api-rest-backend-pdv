const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'leoandrade123',
        database: 'pdv'
    }

});

module.exports = knex