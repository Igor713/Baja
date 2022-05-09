const router = require('express').Router()
const Expense = require('../models/Expense')

// Rotas da API
// Criação de dados
router.post('/', async (req, res) => {

    const { name, price, experationDay } = req.body

    if (!name) {

        res.status(422).json({ error: 'O nome é obrigatório' })
        return
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

        if (!expense) {

            req.status(422).json({ message: 'Despesa não foi encontrado' })
            return
        }

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//Upadate - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, price, experationDay } = req.body

    const expense = {

        name,
        price,
        experationDay
    }

    try {

        const updatedExpense = await Expense.updateOne({ _id: id }, expense)

        if (updatedExpense.matchedCount === 0) {
            req.status(422).json({ message: 'Despesa não foi encontrado!' })
            return
        }

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Delete - deletar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const expense = await Expense.findOne({ _id: id })

    if (!expense) {

        res.status(422).json({ message: 'A despesa não foi encontrado!' })
        return
    }

    try {

        await Expense.deleteOne({ _id: id })

        res.status(200).json({ message: 'Despesa deletada' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router