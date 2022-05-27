require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*')
    app.use(cors())
    next()
})

// Rotas da API
const expenseRoutes = require('../routes/expenseRoutes')

app.use('/expense', expenseRoutes)

// Rota inicial / endpoint
app.get('/', (req, res) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header("Access-Control-Allow-Credentials", "true");
    app.use(cors())
    res.json({ message: 'Rodando' })
})

// Criar porta / Conexão com banco de dados
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@bajaapicluster.rqtbx.mongodb.net/BajaDataBase?retryWrites=true&w=majority`
    )
    .then(() => {

        console.log('Conectado ao MongoDB')

        app.listen(3000, () => {
            console.log("Rodando na porta 3000")
        })
    })
    .catch((err) => {
        console.log(err)
    })

