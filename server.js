import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("FrontEnd"));


// Listas todos os produtos
app.get("/produtos", async (req, res) => {
    const produtos = await prisma.Product.findMany();
    res.json(produtos);
})

// Obter um produto específico com base no ID
app.get("/produtos/:id", async (req, res) => {
  const produto = await prisma.Product.findUnique({
    where: { id: req.params.id },
  });
  res.json(produto);
});

//  Obter um produto espeficofico com base na categoria
app.get("/produtos/categoria/:categoria", async (req, res) => {
  const produtos = await prisma.Product.findMany({
    where: { Categoria: req.params.categoria },
  });
  res.json(produtos);
});

// Criar um novo produto
app.post("/produtos", async (req, res) => {
  await prisma.Product.create({
    data: {
      NomeProduto: req.body.NomeProduto,
      Preço: req.body.Preço,
      Descricao: req.body.Descricao,
      QuantidadeEmEstoque: req.body.QuantidadeEmEstoque,
      Avaliacao: req.body.Avaliacao,
      Categoria: req.body.Categoria,
    },
  })
    .then((novoProduto) => {
      res.status(201).json(novoProduto);
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao criar o produto" });
    });
});

// Editar um produto existente com base no ID
app.put("/produtos/:id", async (req, res) => {
    await prisma.Product.update({
    where: { id: req.params.id },
    data: {
      NomeProduto: req.body.NomeProduto,
        Preço: req.body.Preço,
        Descricao: req.body.Descricao,
        QuantidadeEmEstoque: req.body.QuantidadeEmEstoque,
        Avaliacao: req.body.Avaliacao,
        Categoria: req.body.Categoria,
    },
  })
    .then((produtoAtualizado) => {
      res.json(produtoAtualizado);
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao atualizar o produto" });
    });
});

// Deletar um produto com base no ID
app.delete("/produtos/:id", async (req, res) => {
  await prisma.Product.delete({
    where: { id: req.params.id },
  })
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao deletar o produto" });
    });
});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});