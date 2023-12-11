const knex = require("../db/conexao");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const cadastrar = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    return res.status(201).json(cadastrar);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const editarProduto = async (req, res) => {
  const { id: productID } = req.params;
  const { categoria_id } = req.body;

  try {
    await knex("produtos")
      .update({ descricao, quantidade_estoque, valor, categoria_id })
      .where("id", productID);

    return res.status(204).json();
  } catch (Error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const { id: productID } = req.params;
  try {
    const consultaProductID = await knex("produtos").where("id", productID);
    if (consultaProductID.length < 1) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(consultaProductID[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listaProduto = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      const todos = await knex("produtos").select("*").from("produtos");
      console.log("1");

      return res.status(200).json(todos);
    }
    const selecionado = knex("produtos")
      .select("*")
      .from("produtos")
      .where("categoria_id", "=", id);

    return await res.status(200).json(selecionado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deletaProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const deleta = await knex("produtos").where("id", "=", id).del();
    if (deleta == 0) {
      return res.status(200).json({ Mensagem: "Produto Não encontrado" });
    }

    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listaProduto,
  deletaProduto,
};
