const express = require('express')
const mongoose = require('mongoose')

// Criando a instancia do server
const app = express()

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// Rota inicial / endpoint
app.get('/', (req, res) => {

    // Mostrando requisição
    res.json({ message: 'Teste' })
})

// Criar porta
app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})