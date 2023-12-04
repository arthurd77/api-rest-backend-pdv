const knex = require("knex")({
  client: "pg",
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'leoandrade123',
    database: 'pdv',
  },
});

module.exports = knex;
