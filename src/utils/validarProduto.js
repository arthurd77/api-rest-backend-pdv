const joi = require('joi')

const schemaCategoria = joi.object({
    descricao: joi.string().required().messages({
        "any.required": "O campo descrição é obrigatório.",
        "string.empty": "O campo descrição não pode estar vázio",
    }),
    quantidade_estoque: joi.number().required().messages({
        "any.required": "O campo quantidade_estoque é obrigatório.",
        "string.empty": "O campo quantidade_estoque não pode estar vázio",
    }),
    valor: joi.number().required().messages({
        "any.required": "O campo valor é obrigatório.",
        "string.empty": "O campo valor não pode estar vázio",
    }),
    categoria_id: joi.number().required().messages({
        "any.required": "O campo categoria_id é obrigatório.",
        "string.empty": "O campo categoria_id não pode estar vázio",
    })
})

module.exports = schemaCategoria