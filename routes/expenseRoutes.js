const router = require('express').Router()
const Expense = require('../models/Expense')

// Rotas da API
// Criação de dados
router.post('/', async (req, res) => {

    const { name, price, experationDay } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório' })
    }

    const expense = {

        name,
        price,
        experationDay
    }

    try {

        await Expense.create(expense)

        res.status(201).json({ message: 'Despesa cadastrada com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - leitura de dados
router.get('/', async (req, res) => {

    try {

        const expense = await Expense.find()

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {

    // Extrair dado da requisição
    const id = req.params.id

    try {

        const expense = await Expense.findOne({ _id: id })

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router