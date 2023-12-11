const express = require("express");
const middlewaresUsuario = require("../middlewares/usuario-middlewares");
const middlewareCliente = require("../middlewares/cliente-middleware");
const controllerCliente = require("../controllers/cliente-controller");
const clienteSchema = require("../utils/validarCliente");

const clientesRotas = express.Router();

clientesRotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

clientesRotas.get("/cliente", controllerCliente.listarClientes);

clientesRotas.get(
  "/cliente/:id",
  middlewareCliente.clienteExiste,
  controllerCliente.detalharCliente
);

clientesRotas.put(
  "/cliente/:id",
  middlewareCliente.validarCliente(clienteSchema),
  middlewareCliente.clienteExiste,
  middlewareCliente.verificarEmailCliente,
  middlewareCliente.verificarCPFCliente,
  controllerCliente.editarCliente
);

clientesRotas.post(
  "/cliente",
  middlewareCliente.validarCliente(clienteSchema),
  middlewareCliente.verificarEmailCliente,
  middlewareCliente.verificarCPFCliente,
  controllerCliente.cadastrarCliente
);

module.exports = clientesRotas;
