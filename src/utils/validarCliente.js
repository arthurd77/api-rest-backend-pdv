const joi = require('joi')

const clienteSchema = joi.object({
    nome: joi.string().required().messages({
      "any.required": "O campo nome é obrigatório.",
      "string.empty": "O campo nome não pode estar vázio",
    }),
  
    email: joi.string().email().required().messages({
      "any.required": "O campo email é obrigatório.",
      "string.email": "O formato de email é inválido.",
      "string.empty": "O campo email não pode estar vázio",
    }),
  
    cpf: joi.string().required().messages({
      "any.required": "O campo cpf é obrigatório.",
      "string.empty": "O campo cpf não pode estar vázio",
    }),
  });
  
  module.exports = clienteSchema;