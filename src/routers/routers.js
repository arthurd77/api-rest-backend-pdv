const express = require("express");
const controllersUsuario = require("../controllers/usuario-controller");
const { validarCampos } = require("../middlewares/middlewares");
const schemaUsuario = require("../utils/validarCampos");
const middlewaresUsuario = require("../middlewares/middlewares");
const { listarCategoria } = require("../controllers/others");


const rotas = express.Router();

rotas.post(
  "/usuario",
  validarCampos(schemaUsuario),
  controllersUsuario.cadastrarUsuario
);
rotas.post("/login", middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.loginDoUsuario)


rotas.get('/categoria', listarCategoria)

rotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

rotas.put(
  "/usuario",
  validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.editarUsuario
);

rotas.get("/usuario", controllersUsuario.detalharUsuario)




validarCampos(schemaUsuario),controllersUsuario.detalharUsuario


module.exports = rotas;
