const joi = require("joi");

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({
        "any.required": "O campo email é obrigatório.",
        "string.email": "O formato de email é inválido.",
        "string.empty": "O campo email não pode estar vázio",
    }),

    senha: joi.string().required().messages({
        "any.required": "O campo senha é obrigatório.",
        "string.empty": "O campo senha não pode estar vázio",
    })
})
module.exports = schemaLogin