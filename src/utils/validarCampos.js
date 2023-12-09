const joi = require("joi");

const schemaUsuario = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório.",
    "string.empty": "O campo nome não pode estar vázio",
  }),

  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório.",
    "string.email": "O formato de email é inválido.",
    "string.empty": "O campo email não pode estar vázio",
  }),

  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.empty": "O campo senha não pode estar vázio",
  }),
});

const schemaUsuarioLogin = joi.object({
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório.",
    "string.email": "O formato de email é inválido.",
    "string.empty": "O campo email não pode estar vázio",
  }),

  senha: joi.string().required().messages({
    "any.required": "O campo senha é obrigatório.",
    "string.empty": "O campo senha não pode estar vázio",
  })
});

const schemaEditProduct = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório.",
    "string.empty": "O campo descrição não pode ser vazio"
  }),

  quantidade_estoque: joi.number().required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório.",
    "number.empty": "O campo quantidade_estoque não pode ser vazio"
  }),

  valor: joi.number().required().messages({
    "any.required": "O campo valor é obrigatório.",
    "number.empty": "O campo valor não pode ser vazio"
  }),

  categoria_id: joi.number().required().messages({
    "any.required": "O campo categoria_id é obrigatório.",
    "string.empty": "O campo categoria_id não pode estar vazio",
  })
});

module.exports = {
  schemaUsuario,
  schemaUsuarioLogin,
  schemaEditProduct
};
