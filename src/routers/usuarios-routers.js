const express = require("express");
const middlewaresUsuario = require("../middlewares/usuario-middlewares");
const controllersUsuario = require("../controllers/usuario-controller");
const usuariosRotas = express.Router();
const schemaUsuario = require("../utils/validarCampos");
const validarLogin = require("../utils/validarCamposLogin");

usuariosRotas.post(
  "/usuario",
  middlewaresUsuario.validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.cadastrarUsuario
);

usuariosRotas.post(
  "/login",
  middlewaresUsuario.validarCampos(validarLogin),
  middlewaresUsuario.verificarLogin,
  controllersUsuario.loginDoUsuario
);

usuariosRotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

usuariosRotas.put(
  "/usuario",
  middlewaresUsuario.validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.editarUsuario
);

usuariosRotas.get("/usuario", controllersUsuario.detalharUsuario);

module.exports = usuariosRotas;
