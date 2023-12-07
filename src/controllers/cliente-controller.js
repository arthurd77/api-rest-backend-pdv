const knex = require("../db/conexao");

const listarClientes = async (req, res) => {
  const cliente = await knex("clientes").select("id", "nome", "email");

  return res.status(200).json(cliente);
};

module.exports = {
  listarClientes,
};
