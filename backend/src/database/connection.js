const knex = require("knex");
const configuration = require("../../knexfile");

const connection = knex(configuration.development); //Conexão feita a partir das configurações setadas no arquivo knexfile.js

module.exports = connection;
