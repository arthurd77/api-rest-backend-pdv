const knex = require("../db/conexao");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const senhaJwt = require('../../.private/.key')

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const criptografarSenha = await bcrypt.hash(senha, 10);

    await knex("usuarios").insert({
      nome: nome,
      email: email,
      senha: criptografarSenha
    });

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({mensagem: "erro interno do servidor!"});
  }
};

const loginDoUsuario = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(401).json({ mensagem: "Preencha todos os campos!" })
  }
  try {
    const usuarios = await knex('usuarios').select('*').from('usuarios').where('email', '=', email);
    if (usuarios.length < 1) {
      return res.status(401).json({ mensagem: "E-mail ou senha invalido." })
    }

    const usuario = usuarios[0]

    const confirmarSenha = await bcrypt.compare(senha, usuario.senha)
    if (!confirmarSenha) {
      return res.status(401).json({ mensagem: "E-mail ou senha invalida! 2" })
    }

    const Token = jwt.sign({ id: usuario.id }, senhaJwt, {
      expiresIn: '10h',
    })
    const { senha: _, ...usuarioLogado } = usuario;

    return res.json({ Usuario: usuarioLogado, Token })

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
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
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
};

const detalharUsuario = async (req, res) => {
  const id = req.usuarioId
  try {
    const usuario = await knex("usuarios")
      .select("id", "nome", "email")
      .from("usuarios")
      .where("id", "=", id)
      .first();

    if (!usuario) {
      return res.status(400).json({ error: "Usuario Não encontrado" })
    }

    return res.status(200).json({usuario});
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor"})
  }
}

module.exports = {
  cadastrarUsuario,
  editarUsuario,
  detalharUsuario,
  loginDoUsuario
};
