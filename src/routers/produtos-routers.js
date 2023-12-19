const express = require("express");
const middlewaresUsuario = require("../middlewares/usuario-middlewares");
const controllerProduto = require("../controllers/produto-controllers");
const schemaCategoria = require("../utils/validarProduto");
const schemaEditProduct = require("../utils/validarEditarProduto");
const middlewareProduto = require("../middlewares/produto-middleware");
const produtosRotas = express.Router();
const { uploadFile } = require("../storege");
const multer = require("../middlewares/multer-middleware");

produtosRotas.post(
  "/produto", multer.single('produto_imagem'),
  middlewaresUsuario.validarCampos(schemaCategoria),
  middlewareProduto.verificarCategoriaExiste,

  controllerProduto.cadastrarProduto
);

produtosRotas.put(
  "/produto/:id", multer.single('produto_imagem'),
  middlewaresUsuario.validarCampos(schemaCategoria),
  middlewareProduto.verificarProdutoExiste,
  middlewareProduto.verificarCategoriaExiste,
  controllerProduto.editarProduto
);

produtosRotas.get("/produto", controllerProduto.listaProduto);

produtosRotas.get("/produto/:id", controllerProduto.detalharProduto);

produtosRotas.delete(
  "/produto/:id",
  middlewareProduto.verificarProdutoExiste,
  middlewareProduto.verificarProdutoVinculado,
  controllerProduto.deletaProduto
);

module.exports = produtosRotas;
