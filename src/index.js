require('dotenv').config()
const express = require('express')
const routers = require('./routers/routers')
const knex = require('./db/conexao')
const app = express()

app.use(express.json())
app.use(routers)

app.listen(process.env.PORT)