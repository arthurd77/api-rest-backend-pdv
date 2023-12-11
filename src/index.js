require("dotenv").config();
const express = require("express");
const routers = require("./routers/routers");
const app = express();

app.use(express.json());
app.use(routers);

const port = process.env.PORT
console.log(port)
app.listen(port, () => {
    console.log("Servidor Iniciado")
} );
