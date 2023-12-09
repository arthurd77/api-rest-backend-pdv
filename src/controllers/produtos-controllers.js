const knex = require("../db/conexao");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const senhaJwt = require('../../.private/.key')

const editarProduto = async (req, res) => {
    const { id: productID } = req.params;
    try {    
        const consultaProductID = await knex("produtos").where("id", productID);
        if(consultaProductID.length<1){
            return res.status(404).json({ mensagem: "Produto não encontrado" });
        }

        
    
        return res.status(204).json();
      } catch (Error) {
        return res.status(500).json({
          mensagem: "Erro interno do servidor",
        });
      }
}

module.exports = { editarProduto }