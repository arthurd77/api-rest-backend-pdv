const knex = require('../db/conexao')
const bcrypt = require('bcrypt')


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const verificarEmailExistente = await knex('usuarios').select('email').from('usuarios').where('email', '=', email)
        if (verificarEmailExistente.length > 0) {
            return res.status(401).json({ mensagem: "E-mail já está sendo utilizado." })
        }

        const criptografarSenha = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({ nome, email, senha: criptografarSenha })

        if (!usuarioCadastrado) {
            return res.status(401).json({ mensagem: "algo deu errado!" })
        }

        return res.json()

    } catch (error) {
        console.log(error);
        return res.status(400).json({ mensagem: error.message })
    }

}
module.exports = {
    cadastrarUsuario
}