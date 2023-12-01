const express = require("express");
const controllersUsuario = require("../controllers/usuario-controller");
const { validarCampos } = require("../middlewares/middlewares");
const schemaUsuario = require("../utils/validarCampos");

const rotas = express.Router();

rotas.post(
  "/usuario",
  validarCampos(schemaUsuario),
  controllersUsuario.cadastrarUsuario
);

module.exports = rotas;
