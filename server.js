import express from 'express'

const express = require('express');
const { connectDB } = require('./db');

const app = express();
app.use(express.json());

// Postar meus produtos
app.post('/produtos', async (req, res) => {
  const { nome, codigo, preco, descricao, quantidade_estoque, avaliacao, categoria } = req.body;
  try {
    const pool = await connectDB();
    await pool.request()
      .input('nome', nome)
      .input('codigo', codigo)
      .input('preco', preco)
      .input('descricao', descricao)
      .input('quantidade_estoque', quantidade_estoque)
      .input('avaliacao', avaliacao)
      .input('categoria', categoria)
      .query(`
        INSERT INTO Produtos (nome, codigo, preco, descricao, quantidade_estoque, avaliacao, categoria)
        VALUES (@nome, @codigo, @preco, @descricao, @quantidade_estoque, @avaliacao, @categoria)
      `);
    res.status(201).send({ mensagem: 'Produto adicionado com sucesso!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Listar meus produtos
app.get('/produtos', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM Produtos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Atualzar meus produtos
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, codigo, preco, descricao, quantidade_estoque, avaliacao, categoria } = req.body;
  try {
    const pool = await connectDB();
    await pool.request()
      .input('id', id)
      .input('nome', nome)
      .input('codigo', codigo)
      .input('preco', preco)
      .input('descricao', descricao)
      .input('quantidade_estoque', quantidade_estoque)
      .input('avaliacao', avaliacao)
      .input('categoria', categoria)
      .query(`
        UPDATE Produtos
        SET nome=@nome, codigo=@codigo, preco=@preco, descricao=@descricao,
            quantidade_estoque=@quantidade_estoque, avaliacao=@avaliacao, categoria=@categoria
        WHERE id=@id
      `);
    res.send({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Deletar meus produtos
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await connectDB();
    await pool.request()
      .input('id', id)
      .query('DELETE FROM Produtos WHERE id=@id');
    res.send({ mensagem: 'Produto removido com sucesso!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get por ID - Listar produto especifico por ID 
app.get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('id', id)
            .query('SELECT * FROM Produtos WHERE id=@id');
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.listen(3000)