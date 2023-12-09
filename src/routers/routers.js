const express = require("express");
const schemaUsuario = require("../utils/validarCampos");
const {validarCampos} = require("../middlewares/middlewares");
const middlewaresUsuario = require("../middlewares/middlewares");
const controllersUsuario = require("../controllers/usuario-controller");
const {listarCategoria} = require("../controllers/categoria-controller");
const { editarProduto, detalharProduto } = require("../controllers/produtos-controllers");


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

rotas.put("/produto/:id", validarCampos(schemaEditProduct), editarProduto)
rotas.get("/produto/:id", detalharProduto)

module.exports = rotas;
