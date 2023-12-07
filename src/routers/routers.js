const express = require("express");
const controllersUsuario = require("../controllers/usuario-controller");
const {validarCampos} = require("../middlewares/middlewares");
const schemaUsuario = require("../utils/validarCampos");
const middlewaresUsuario = require("../middlewares/middlewares");
const {listaProduto,deletaProduto} = require('../controllers/produto-controller')
const {listarCategoria} = require("../controllers/categoria-controller");


const rotas = express.Router();

rotas.post(
    "/usuario",
    validarCampos(schemaUsuario.schemaUsuario),
    middlewaresUsuario.verificarEmailUsuario, controllersUsuario.cadastrarUsuario
);

rotas.post("/login", validarCampos(schemaUsuario.schemaUsuarioLogin),
    controllersUsuario.loginDoUsuario);

rotas.get("/categorias", listarCategoria);

rotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

rotas.put(
    "/usuario",
    validarCampos(schemaUsuario),
    middlewaresUsuario.verificarEmailUsuario,
    controllersUsuario.editarUsuario
);

rotas.get("/usuario", controllersUsuario.detalharUsuario)
rotas.get("/listaProduto",listaProduto)
rotas.delete("/deletaItem/:id",deletaProduto)

module.exports = rotas;
