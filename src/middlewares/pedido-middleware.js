const { number } = require("joi");
const knex = require("../db/conexao");

const validarPedido = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            mensagem: error.message
        })
    }
}

const pedidoExiste = async (req, res, next) => {
    const { pedido_produtos } = req.body

    try {
        const pedidos = pedido_produtos.map(function (element) {
            return element.produto_id;

        });

        for (let i = 0; i < pedidos.length; i++) {

            const produto = await knex("produtos")
                .select("*")
                .where("id", pedidos[i])
                .first();

            if (!produto) {
                return res.status(404).json({ mensagem: "Produto não encontrado" });
            }

        }
        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({

        })
    }
}


const clienteExiste = async (req, res, next) => {
    const { cliente_id } = req.body;
  
    const cliente = await knex("clientes")
      .select("*")
      .where("id", cliente_id)
      .first();
  
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
  
    return next();
  };

module.exports = {
    validarPedido,
    pedidoExiste,
    clienteExiste
}