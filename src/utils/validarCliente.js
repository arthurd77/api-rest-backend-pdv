const joi = require("joi");

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

  cpf: joi.string().min(11).max(11).required().messages({
    "any.required": "O campo cpf é obrigatório.",
    "string.empty": "O campo cpf não pode estar vázio",
    "string.min": "o cpf deve conter 11 digitos",
    "string.max": "o cpf deve conter 11 digitos",
  }),
  cep: joi.string().messages({
    "string.empty": "Se o campo 'cep' for selecionado ele deve ser preenchido",
  }),
  rua: joi.string().messages({
    "string.empty": "Se o campo 'rua' for selecionado ele deve ser preenchido",
  }),
  numero: joi.string().messages({
    "string.empty": "Se o campo 'numero' for selecionado ele deve ser preenchido",
  }),
  bairro: joi.string().messages({
    "string.empty": "Se o campo 'bairro' for selecionado ele deve ser preenchido",
  }),
  cidade: joi.string().messages({
    "string.empty": "Se o campo 'cidade' for selecionado ele deve ser preenchido",
  }),
  estado: joi.string().messages({
    "string.empty": "Se o campo 'estado' for selecionado ele deve ser preenchido",
  }),
});

module.exports = clienteSchema;
