const joi = require("joi");

const schemaPedidos = joi.object({
  cliente_id: joi.number().required().messages({
    "any.required": "O campo cliente_id é obrigatório.",
    "string.empty": "O campo cliente_id não pode ser vazio",
  }),

  pedido_produtos: joi.array().items({
    produto_id: joi.number().required().messages({
      "any.required": "O campo produto_id é obrigatório.",
      "number.base": "O campo produto_id não pode ser vazio",
    }),
  
    quantidade_produto: joi.number().required().messages({
      "any.required": "O campo quantidade_produto é obrigatório.",
      "string.empty": "O campo quantidade_produto não pode estar vazio",
    })
  }).required().messages({
    "any.required": "O campo pedido_produtos é obrigatório e deve ser um array.",
    "number.base": "O campo pedido_produtos não pode ser vazio e deve ser um array",
  }),

  observacao: joi.string()

});

module.exports = schemaPedidos