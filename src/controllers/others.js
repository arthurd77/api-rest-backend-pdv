const { log } = require("console");
const knex = require("../db/conexao");

const listarCategoria = async (req,res) =>{
  
    try{
      const categorias = await knex("categorias").select("descricao");
      
      return res.status(200).json(categorias);
    }catch(error){
      console.log(error.message)
    }
  }
  
  module.exports = { listarCategoria };