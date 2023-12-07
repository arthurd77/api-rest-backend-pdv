const express = require("express");
const controllersUsuario = require("../controllers/usuario-controller");
const schemaUsuario = require("../utils/validarCampos");
const middlewaresUsuario = require("../middlewares/middlewares");
const { listarCategoria } = require("../controllers/categoria-controller");
const validarLogin = require("../utils/validarCamposLogin");
const controllerCliente = require("../controllers/cliente-controller");

const rotas = express.Router();

rotas.post(
  "/usuario",
  middlewaresUsuario.validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.cadastrarUsuario
);

rotas.post(
  "/login",
  middlewaresUsuario.validarCampos(validarLogin),
  controllersUsuario.loginDoUsuario
);

rotas.get("/categorias", listarCategoria);

rotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

rotas.put(
  "/usuario",
  middlewaresUsuario.validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.editarUsuario
);

rotas.get("/usuario", controllersUsuario.detalharUsuario);

rotas.get("/cliente", controllerCliente.listarClientes);

module.exports = rotas;
