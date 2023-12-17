const express = require("express");

const schemaPedidos = require("../utils/validarPedidos");
const middllewarePedido = require("../middlewares/pedido-middleware");
const cadastrarPedido = require("../controllers/pedido-controller");


const pedidosRotas = express();

pedidosRotas.post(
    '/pedido',
    middllewarePedido.validarPedido(schemaPedidos),
    middllewarePedido.pedidoExiste,
    // middllewarePedido.validarEstoque,
    cadastrarPedido    
    )

module.exports = pedidosRotas

