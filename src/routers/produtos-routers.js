const express = require("express");
const middlewaresUsuario = require("../middlewares/usuario-middlewares");
const controllerProduto = require("../controllers/produto-controllers");
const schemaCategoria = require("../utils/validarProduto");
const schemaEditProduct = require("../utils/validarEditarProduto");
const middlewareProduto = require("../middlewares/produto-middleware");

const produtosRotas = express.Router();

produtosRotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

produtosRotas.post(
  "/produto",
  middlewaresUsuario.validarCampos(schemaCategoria),
  middlewareProduto.verificarCategoriaExiste,
  controllerProduto.cadastrarProduto
);

produtosRotas.put(
  "/produto/:id",
  middlewaresUsuario.validarCampos(schemaEditProduct),
  middlewareProduto.verificarProdutoExiste,
  middlewareProduto.verificarCategoriaExiste,
  controllerProduto.editarProduto
);

produtosRotas.get("/produto", controllerProduto.listaProduto);

produtosRotas.get("/produto/:id", controllerProduto.detalharProduto);

produtosRotas.delete(
  "/produto/:id",
  middlewareProduto.verificarProdutoExiste,
  controllerProduto.deletaProduto
);

module.exports = produtosRotas;
