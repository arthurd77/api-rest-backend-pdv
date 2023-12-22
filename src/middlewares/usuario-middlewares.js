const jwt = require("jsonwebtoken");
const senhaJwt = process.env.JWT_PASS;
const knex = require("../db/conexao");
const bcrypt = require("bcrypt");

const validarToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado",
    });
  }
  const token = authorization.split(" ")[1];

  try {
    const tokenUsuario = jwt.verify(token, senhaJwt);

    req.usuarioId = tokenUsuario.id;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "token inválido" });
  }
};

const validarCampos = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarEmailUsuario = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExistente = await knex("usuarios")
      .select("id", "email")
      .from("usuarios")
      .where("email", email)
      .first();
    if (req.method === "POST" && emailExistente) {
      return res.status(401).json({
        mensagem: "E-mail já está sendo utilizado.",
      });
    }
    if (
      req.method === "PUT" &&
      emailExistente &&
      emailExistente.id !== Number(req.usuarioId)
    ) {
      return res.status(403).json({
        mensagem: "Você não pode realizar essa ação",
      });
    }
    return next();
  } catch (erorr) {
    return res.status(500).json({
      mensagem: "Erro interno do Servidor",
    });
  }
};

const verificarLogin = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const usuario = await knex("usuarios")
      .select("*")
      .from("usuarios")
      .where("email", "=", email)
      .first();
    if (!usuario) {
      return res.status(401).json({ mensagem: "E-mail ou senha invalido." });
    }

    const confirmarSenha = await bcrypt.compare(senha, usuario.senha);
    if (!confirmarSenha) {
      return res.status(401).json({ mensagem: "E-mail ou senha invalido!" });
    }

    req.usuario = usuario;

    return next();
  } catch (Erro) {
    return res.status(500).json({
      mensagem: "Erro interno do Servidor",
    });
  }
};

module.exports = {
  validarToken,
  validarCampos,
  verificarEmailUsuario,
  verificarLogin,
};
