import express from 'express'

const Cadastro = express()
Cadastro.use(express.json())

const itens = []

// Rota Listar os produtos
Cadastro.get('/produtos', (req, res) => {
   res.json(itens)
})

Cadastro.post('/produtos', (req, res) => {
    itens.push(req.body)

   res.send('Produto cadastrado com sucesso!')
})

Cadastro.listen(3000)