const knex = require("../db/conexao");

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
  listaProduto,
  deletaProduto,
};
