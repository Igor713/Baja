require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
// Criando a instancia do server
const app = express()

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// app.use("/components", express.static('./components'));
// app.use("/assets", express.static('./assets'));
// app.use("/server", express.static('./server'));
// app.use("/routes", express.static('./routes'));


// Rotas da API
const expenseRoutes = require('../routes/expenseRoutes')

app.use('/expense', expenseRoutes)

// Rota inicial / endpoint
app.get('/', (req, res) => {

    // res.sendFile('index.html', { root: '.' })
    // Mostrando requisição 
    res.json({ message: 'Teste' })
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

