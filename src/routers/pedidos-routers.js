const express = require("express");

const schemaPedidos = require("../utils/validarPedidos");
const middllewarePedido = require("../middlewares/pedido-middleware");
const cadastrarPedido = require("../controllers/pedido-controller");
const middlewareCliente = require("../middlewares/cliente-middleware");


const pedidosRotas = express();

pedidosRotas.post(
    '/pedido',
    middllewarePedido.validarPedido(schemaPedidos),
    middllewarePedido.pedidoExiste,
    middllewarePedido.clienteExiste,
    cadastrarPedido
)

module.exports = pedidosRotas

