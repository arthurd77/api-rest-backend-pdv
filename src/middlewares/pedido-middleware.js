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

const validarEstoque = async (req, res, next) => {
    const { pedido_produtos } = req.body;
    try {
        const produtos = pedido_produtos.map(function(element){
            return element.produto_id;
        });

        const quantidade_produtos_pedido = pedido_produtos.map(function(element){
            return element.quantidade_produto;
        }); 
        
        for (let i=0; i<quantidade_produtos_pedido.length; i++){
            
            const quantidade_produtos_estoque = await knex("produtos")
            .select("quantidade_estoque")
            .where("id", produtos[i])
            .first();
        
            if(Number(quantidade_produtos_pedido[i]) > Number(quantidade_produtos_estoque)){
                return res.status(400).json({mensagem: "Estoque insuficiente."})
            }
            next();
        }



        

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
        const pedidos = pedido_produtos.map(function(element){
            return element.produto_id;

        });
        
        for (let i=0; i<pedidos.length; i++){
            
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



  module.exports = {
    validarPedido,
    pedidoExiste,
    validarEstoque
}