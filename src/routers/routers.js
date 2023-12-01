const express = require("express");
const controllersUsuario = require("../controllers/usuario-controller");
const { validarCampos } = require("../middlewares/middlewares");
const schemaUsuario = require("../utils/validarCampos");
const middlewaresUsuario = require("../middlewares/middlewares");

const rotas = express.Router();

rotas.post(
  "/usuario",
  validarCampos(schemaUsuario),
  controllersUsuario.cadastrarUsuario
);

rotas.put(
  "/usuario",
  validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.editarUsuario
);
module.exports = rotas;
