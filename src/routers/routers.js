const express = require("express");
const { listarCategoria } = require("../controllers/categoria-controller");
const rotasUsuario = require("./usuarios-routers");
const rotasClientes = require("./clientes-routers");
const rotasProdutos = require("./produtos-routers");
const pedidosRotas = require("./pedidos-routers");
const rotas = express.Router();



rotas.get("/categorias", listarCategoria);

rotas.use(pedidosRotas);
rotas.use(rotasUsuario);
rotas.use(rotasClientes);
rotas.use(rotasProdutos);

module.exports = rotas;
