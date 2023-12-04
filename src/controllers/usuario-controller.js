const knex = require("../db/conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const verificarEmailExistente = await knex("usuarios")
      .select("email")
      .from("usuarios")
      .where("email", "=", email);
    if (verificarEmailExistente.length > 0) {
      return res
        .status(401)
        .json({ mensagem: "E-mail já está sendo utilizado." });
    }

    const criptografarSenha = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await knex("usuarios").insert({
      nome: nome,
      email: email,
      senha: criptografarSenha,
    });

    if (!usuarioCadastrado) {
      return res.status(401).json({ mensagem: "algo deu errado!" });
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensagem: error.message });
  }
};

const editarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .update({ nome, email, senha: senhaCriptografada })
      .where("id", req.usuarioId);

    return res.status(204).json();
  } catch (Error) {
    console.error(Error);
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
};

const detalharUsuario = async (req,res) =>{
  const { id} = req.headers;

  try{
    const usuario = await knex("usuarios")
    .select("*")
    .from("usuarios")
    .where("id", "=",id)
    .first();

    if(!usuario){
      return res.status(400).json({error:"Usuario Não encontrado"})
    }

    return res.status(200).json(usuario);
  }catch(error){
    console.log(error.message)
  }
}

module.exports = {
  cadastrarUsuario,
  editarUsuario,
  detalharUsuario,
};
