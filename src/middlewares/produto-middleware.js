const knex = require("../db/conexao");

const verificarCategoriaExiste = async (req, res, next) => {
  const { categoria_id } = req.body;
  const verificarCategoria = await knex("categorias")
    .select("*")
    .where("id", "=", categoria_id)
    .first();
  if (!verificarCategoria) {
    return res.status(404).json({ mensagem: "Categoria não existe." });
  }
  return next();
};

const verificarProdutoExiste = async (req, res, next) => {
  const { id: productID } = req.params;
  const consultaProductID = await knex("produtos")
    .where("id", productID)
    .first();

  if (!consultaProductID) {
    return res.status(404).json({ mensagem: "produto não encontrado" });
  }
  next();
};

module.exports = {
  verificarCategoriaExiste,
  verificarProdutoExiste,
};
