const knex = require("../db/conexao");

const cadastrarProduto = async (res, req) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const verificarCategoria = await knex('categorias').select('*').from('categorias').where("id", "=", categoria_id)
        if (!verificarCategoria) {
            return res.status(404).json({ mensagem: "Categoria não existe." })
        }
        const cadastrar = await knex("produtos").insert({
            descricao: "descricao",
            quantidade_estoque: "quantidade_estoque",
            valor: "valor",
            categoria_id: "categoria_id"
        })

        return res.status(201).json(cadastrar)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" })
    }
}

module.exports = cadastrarProduto