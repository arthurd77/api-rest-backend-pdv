const knex = require("../db/conexao");
const nodemailer = require("nodemailer");

const cadastrarPedido = async (req, res) => {
  const { observacao, cliente_id, pedido_produtos } = req.body;

  let qtdEstoque = 0;
  let total = 0;
  const valor_produto = [];
  let valor_unitario = [];

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await Promise.all(
      pedido_produtos.map(async (produto) => {
        const teste = await knex("produtos")
          .select("quantidade_estoque")
          .where("id", produto.produto_id)
          .first();

        if (produto.quantidade_produto === 0) {
          return res.status(400).json({
            mensagem:
              "A quantidade de produtos de cada pedido deve ser maior que zero.",
          });
        }

        if (produto.quantidade_produto <= teste.quantidade_estoque) {
          return teste;
        } else {
          return qtdEstoque++;
        }
      })
    );

    if (!qtdEstoque) {
      await Promise.all(
        pedido_produtos.map(async (produto) => {
          await knex("produtos")
            .update(
              "quantidade_estoque",
              knex.raw("?? - ?", [
                "quantidade_estoque",
                produto.quantidade_produto,
              ])
            )
            .where("id", produto.produto_id);
          valor_unitario = await knex("produtos")
            .select("valor")
            .where("id", produto.produto_id)
            .first();
          valor_produto.push(valor_unitario);
        })
      );
      for (let i = 0; i < pedido_produtos.length; i++) {
        total += pedido_produtos[i].quantidade_produto * valor_produto[i].valor;
      }

      const pedidoID = await knex("pedidos")
        .insert({
          cliente_id,
          observacao,
          valor_total: total,
        })
        .returning("id");

      for (let j = 0; j < pedido_produtos.length; j++) {
        await knex("pedido_produtos").insert({
          pedido_id: pedidoID[0].id,
          produto_id: pedido_produtos[j].produto_id,
          quantidade_produto: pedido_produtos[j].quantidade_produto,
          valor_produto: valor_produto[j].valor,
        });
      }

      const html = `
        <!doctype html>
        <html>
          <h1>Olá!</h1>
          <h2>Seu pedido foi efetuado com sucesso! =)</h2>
        </html>
        `;
      const emailCliente = await knex("clientes")
        .select("email")
        .where("id", cliente_id)
        .first();
      transporter.sendMail({
        html: html,
        subject: "Pedido Concluído!",
        to: emailCliente.email,
        from: process.env.MAIL_FROM,
      });

      return res.status(201).json();
    }

    return res.status(400).json({ mensagem: "Estoque insuficiente." });
  } catch (error) {
    console.error(error.message);

    if (error.message.startsWith("Quantidade insuficiente")) {
      return res.status(400).json({ mensagem: error.message });
    } else {
      return res.status(500).json({ mensagem: "Erro interno do servidor!" });
    }
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;
  let pedidos;
  if (cliente_id) {
    pedidos = await knex("pedidos").select("*").where("cliente_id", cliente_id);
  } else {
    pedidos = await knex("pedidos").select("*");
  }

  for (const pedido of pedidos) {
    pedido.pedido_produtos = await knex("pedido_produtos")
      .select("*")
      .where("pedido_id", pedido.id);
  }
  console.log;
  return res.status(200).json(pedidos);
};

module.exports = { cadastrarPedido, listarPedidos };
