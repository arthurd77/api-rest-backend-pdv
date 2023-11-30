const express = require('express');
const { cadastrarUsuario } = require('../controllers/cadastrar');
const { validarCampos } = require('../middlewares/middlewares');
const schemaUsuario = require('../utils/validarCampos');


const rotas = express.Router()

rotas.post('/usuario', validarCampos(schemaUsuario), cadastrarUsuario)




module.exports = rotas