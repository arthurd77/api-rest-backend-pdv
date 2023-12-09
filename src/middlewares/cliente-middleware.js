const knex = require("../db/conexao");

const clienteExiste = async (req, res, next) => {
  const clienteId = req.params.id;

  const cliente = await knex("clientes")
    .select("*")
    .where("id", clienteId)
    .first();

  if (!cliente) {
    return res.status(404).json({ mensagem: "Cliente não encontrado" });
  }

  req.cliente = cliente;

  return next();
};

module.exports = {
  clienteExiste,
};
