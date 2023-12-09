const knex = require("../db/conexao");


const editarProduto = async (req, res) => {
    const { id: productID } = req.params;
    const { categoria_id } = req.body

    try {    
        const consultaProductID = await knex("produtos").where("id", productID);
        const consultaCategoriaID = await knex("categorias").where("id", categoria_id);
        if(consultaProductID.length<1 || consultaCategoriaID.length<1){
            return res.status(404).json({ mensagem: "Produto ou categoria não encontrado" });
        }

        await knex("produtos")
        .update({ descricao, quantidade_estoque, valor, categoria_id })
        .where("id", productID);

        return res.status(204).json();
      } catch (Error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"});
      }
}

const detalharProduto = async (req, res) => {
    const { id: productID } = req.params;
    try {
        const consultaProductID = await knex("produtos").where("id", productID);
        if(consultaProductID.length<1){
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        return res.status(200).json(consultaProductID[0])
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"});
    }
}

module.exports = { editarProduto, detalharProduto }