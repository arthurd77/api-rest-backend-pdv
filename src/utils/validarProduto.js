const joi = require("joi");

const schemaCategoria = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descrição é obrigatório.",
    "string.empty": "O campo descrição não pode estar vázio",
  }),
  quantidade_estoque: joi.number().min(1).required().messages({
    "any.required": "O campo quantidade_estoque é obrigatório.",
    "number.base": "O campo quantidade_estoque não pode estar vázio",
    "number.min": "O campo quantidade_estoque deve ser maior que 0",
  }),
  valor: joi.number().min(1).required().messages({
    "any.required": "O campo valor é obrigatório.",
    "number.base": "O campo valor não pode estar vázio",
    "number.min": "O campo valor deve ser maior que 0",
  }),
  categoria_id: joi.number().required().messages({
    "any.required": "O campo categoria_id é obrigatório.",
    "number.base": "O campo categoria_id não pode estar vázio",
  }),
  produto_imagem: joi
    .string()
    .regex(/.(jpg|jpeg|png)$/i)
    .messages({
      "string.empty":
        "Se o campo produto_imagem for selecionado ele deve ser preenchido",
      "string.pattern.base":
        "O arquivo precisa ser uma imagem (jpg, jpeg ou png)",
    }),
});

module.exports = schemaCategoria;
