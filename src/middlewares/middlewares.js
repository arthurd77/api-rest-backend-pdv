const jwt = require("jsonwebtoken");
const senhaJwt = require("../../.private/.key");
const knex = require('../db/conexao')

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
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const validarCampos = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificarEmailUsuario = async (req, res, next) => {
  const email = req.body
  const emailExistente = await knex('usuarios').select('email').from('usuarios').where('email', '=', email).first()

  if (emailExistente && emailExistente.id !== req.usuarioId){
    return res.status(403).json({
      "mensagem": "Você não pode realizar essa ação"
    })
  }
  return next()
}

module.exports = {
  validarToken,
  validarCampos,
  verificarEmailUsuario
};
