const knex = require("../db/conexao");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const cliente = await knex("clientes").insert({
        nome: nome,
        email: email,
        cpf: cpf,
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado
      }).returning(["id", "nome", "email"]);

    return res.status(201).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor!" });
  }
};

const editarCliente = async (req, res) => {
  const { id: clienteID } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    const cliente = await knex("clientes").where("id", clienteID);


    if (cliente.length < 1) {
      return res
        .status(404)
        .json({ mensagem: "Cliente não encontrado" });
    }

    await knex("clientes")
      .update({ 
        nome: nome,
        email: email,
        cpf: cpf,
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado
       })
      .where("id", clienteID);

      return res.status(204).json()
    
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor!" });
  }
}

const listarClientes = async (req, res) => {
  const cliente = await knex("clientes").select("id", "nome", "email");

  return res.status(200).json(cliente);
};

const detalharCliente = async (req, res) => {
  const cliente = req.cliente;

  return res.status(200).json(cliente);
};

module.exports = {
  listarClientes,
  detalharCliente,
  cadastrarCliente,
  editarCliente
};
