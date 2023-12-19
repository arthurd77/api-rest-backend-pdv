const express = require("express");

const schemaPedidos = require("../utils/validarPedidos");
const middllewarePedido = require("../middlewares/pedido-middleware");
const controllerPedido = require("../controllers/pedido-controller");

const pedidosRotas = express.Router();

pedidosRotas.post(
  "/pedido",
  middllewarePedido.validarPedido(schemaPedidos),
  middllewarePedido.pedidoExiste,
  middllewarePedido.clienteExiste,
  controllerPedido.cadastrarPedido
);

pedidosRotas.get("/pedido", controllerPedido.listarPedidos);
module.exports = pedidosRotas;
