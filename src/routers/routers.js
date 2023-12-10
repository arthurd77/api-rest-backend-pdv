const express = require("express");
const controllersUsuario = require("../controllers/usuario-controller");
const schemaUsuario = require("../utils/validarCampos");
const middlewaresUsuario = require("../middlewares/middlewares");
const validarLogin = require("../utils/validarCamposLogin");
const schemaCategoria = require("../utils/validarProduto");
const controllerCliente = require("../controllers/cliente-controller");
const middlewareCliente = require("../middlewares/cliente-middleware");
const { listarCategoria } = require("../controllers/categoria-controller");
const controllerProduto = require("../controllers/produto-controllers");
const schemaEditProduct = require("../utils/validarEditarProduto");
const clienteSchema = require("../utils/validarCliente");

const rotas = express.Router();

rotas.put(
  "/cliente/:id",
  middlewareCliente.validarCliente(clienteSchema),
  middlewareCliente.verificarEmailCliente,
  middlewareCliente.verificarCPFCliente,
  controllerCliente.editarCliente
  
)

rotas.post(
  "/cliente",
  middlewareCliente.validarCliente(clienteSchema),
  middlewareCliente.verificarEmailCliente,
  middlewareCliente.verificarCPFCliente,
  controllerCliente.cadastrarCliente
  )

rotas.post(
  "/usuario",
  middlewaresUsuario.validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.cadastrarUsuario
);

rotas.post(
  "/login",
  middlewaresUsuario.validarCampos(validarLogin),
  controllersUsuario.loginDoUsuario
);

rotas.get("/categorias", listarCategoria);

rotas.use(middlewaresUsuario.validarToken); // route middleware //colocar todos end points que precisam de token abaixo dessa funçao.

rotas.put(
  "/usuario",
  middlewaresUsuario.validarCampos(schemaUsuario),
  middlewaresUsuario.verificarEmailUsuario,
  controllersUsuario.editarUsuario
);

rotas.get("/usuario", controllersUsuario.detalharUsuario);

rotas.get("/cliente", controllerCliente.listarClientes);

rotas.get(
  "/cliente/:id",
  middlewareCliente.clienteExiste,
  controllerCliente.detalharCliente
);

rotas.post(
  "/cliente",
  middlewareCliente.validarCliente(clienteSchema),
  middlewareCliente.verificarEmailCliente,
  middlewareCliente.verificarCPFCliente,
  controllerCliente.cadastrarCliente
  )

rotas.post(
  "/produto",
  middlewaresUsuario.verificarProdutos(schemaCategoria),
  controllerProduto.cadastrarProduto
);
rotas.get("/usuario", controllersUsuario.detalharUsuario);

rotas.put(
  "/produto/:id",
  middlewaresUsuario.validarCampos(schemaEditProduct),
  controllerProduto.editarProduto
);
rotas.get("/produto/:id", controllerProduto.detalharProduto);

module.exports = rotas;
