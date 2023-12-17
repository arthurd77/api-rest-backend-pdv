const knex = require("../db/conexao");

const cadastrarPedido = async (req, res) => {
  const { observacao, cliente_id, pedido_produtos } = req.body;

  let qtdEstoque = 0;
  let total = 0;
  const valor_produto = [];
  let valor_unitario = [];

  try {
    await Promise.all(pedido_produtos.map(async (produto) => {
      const teste = await knex('produtos').select('quantidade_estoque').where('id', produto.produto_id).first();

      if (produto.quantidade_produto <= teste.quantidade_estoque) {
        return teste;
      } else {
        return qtdEstoque++;
      }
    }));

    if (!qtdEstoque) {
      await Promise.all(pedido_produtos.map(async (produto) => {
        await knex('produtos').update('quantidade_estoque', knex.raw('?? - ?', ['quantidade_estoque', produto.quantidade_produto]))
          .where('id', produto.produto_id);
        valor_unitario = await knex('produtos').select('valor').where('id', produto.produto_id).first()
        valor_produto.push(valor_unitario)


      }));
      for (let i = 0; i < pedido_produtos.length; i++) {
        total += pedido_produtos[i].quantidade_produto * valor_produto[i].valor
      }

      const pedidoID = await knex('pedidos').insert({
        cliente_id,
        observacao,
        valor_total: total
      }).returning('id');

   

      for (let j = 0; j < pedido_produtos.length; j++) {
        await knex('pedido_produtos').insert({
          pedido_id: pedidoID[0].id,
          produto_id: pedido_produtos[j].produto_id,
          quantidade_produto: pedido_produtos[j].quantidade_produto,
          valor_produto: valor_produto[j].valor
        })
      }
      

      return res.status(201).json();
    }

    return res.status(400).json({ mensagem: 'Estoque insuficiente.' })
  } catch (error) {
    console.error(error.message);

    if (error.message.startsWith('Quantidade insuficiente')) {
      return res.status(400).json({ mensagem: error.message });
    } else {
      return res.status(500).json({ mensagem: "Erro interno do servidor!" });
    }
  }
};

module.exports = cadastrarPedido;