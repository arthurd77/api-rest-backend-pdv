const knex = require("../db/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = process.env.JWT_PASS;

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const criptografarSenha = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
      .returning(["id", "nome", "email"])
      .insert({
        nome: nome,
        email: email,
        senha: criptografarSenha,
      });

    return res.status(201).json(usuario[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor!" });
  }
};

const loginDoUsuario = async (req, res) => {
  try {
    const usuario = req.usuario;

    const token = jwt.sign({ id: usuario.id }, senhaJwt, {
      expiresIn: "10h",
    });
    const { senha: _, ...usuarioLogado } = usuario;

    return res.json({ usuario: usuarioLogado, token });
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
  const id = req.usuarioId;
  try {
    const usuario = await knex("usuarios")
      .select("id", "nome", "email")
      .from("usuarios")
      .where("id", "=", id)
      .first();

    if (!usuario) {
      return res.status(400).json({ error: "Usuario Não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  editarUsuario,
  detalharUsuario,
  loginDoUsuario,
};
