const knex = require("../db/conexao");
const { uploadFile, deleteFile } = require("../storege");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;
  const { file } = req;

  try {
    if (file) {
      const cadastrarImagem = await knex("produtos")
        .insert({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
        })
        .returning("id");
      const arquivoUrl = await uploadFile(
        `imagens/${cadastrarImagem[0].id}/${file.originalname.replace(
          /\s/,
          "-"
        )}`,
        file.buffer,
        file.mimetype
      );
      const produto = await knex("produtos")
        .update({
          produto_imagem: arquivoUrl.url,
        })
        .where("id", cadastrarImagem[0].id)
        .returning("*");
      produto[0].produto_imagem = arquivoUrl.url;

      const produtoObj = produto[0];
      return res.status(201).json(produtoObj);
    }

    const cadastrar = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem,
      })
      .returning("*");

    const cadastrarObj = cadastrar[0];

    return res.status(201).json(cadastrarObj);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const editarProduto = async (req, res) => {
  const { id: productID } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;
  const { file } = req;

  try {
    if (file) {
      const arquivoUrl = await uploadFile(
        `imagens/${productID}/${file.originalname.replace(/\s/, "-")}`,
        file.buffer,
        file.mimetype
      );

      const atualizarImagem = await knex("produtos")
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem: arquivoUrl.url,
        })
        .where("id", productID)
        .returning("*");

      const atualizarImagemObj = atualizarImagem[0];

      return res.status(200).json(atualizarImagemObj);
    }
    const imagem = null;
    const atualizar = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imagem,
      })
      .where("id", productID)
      .returning("*");

    const atualizarObj = atualizar[0];
    return res.status(200).json(atualizarObj);
  } catch (Error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const { id: productID } = req.params;
  try {
    const consultaProductID = await knex("produtos").where("id", productID);
    if (consultaProductID.length < 1) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(consultaProductID[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listaProduto = async (req, res) => {
  try {
    const produtos = await knex("produtos").select("*");
    return await res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deletaProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = req.product;
    if (produto.produto_imagem) {
      const keyImagem = produto.produto_imagem.replace(
        `https://${process.env.ENDPOINT_S3}/${process.env.BACKBLAZE_BUCKET}/`,
        ""
      );
      await deleteFile(keyImagem);
    }
    await knex("produtos").where("id", "=", id).del();
    return res.status(204).json();
  } catch (error) {
    console.error(deleteFile);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarProduto,
  editarProduto,
  detalharProduto,
  listaProduto,
  deletaProduto,
};
