const knex = require("../db/conexao");

const listarClientes = async (req, res) => {
  const usuarioId = req.usuarioId;

  const cliente = await knex("clientes").select("id", "nome", "email");

  return res.status(200).json(cliente);
};

module.exports = {
  listarClientes,
};
