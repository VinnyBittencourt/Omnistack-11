const express = require("express");
const routes = require("./routes");

const app = express();

// 4 verbos : GET, POST, PUT, DELETE.

/*
Tipos de parametros:

Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)        ex: 'localhost:3333/user?page=2&nome=Vinicius'
Route Params: Parâmetros utilizados para identificar recursos       ex: 'localhost:3333/:id'
Request Body: Corpo da requisição,, tulizado para criar ou alterar recursos.
*/

/*
SQL: MySQL, SQLite, PostgreSql, Oracle, SQL Server

NoSQL: MongoDB, CouchDB e etc
*/

/**
 * Driver: Select * From user
 * Query Builder: table('users').select('*').where()
 */

app.use(express.json());

app.use(routes);
app.listen(3333);
