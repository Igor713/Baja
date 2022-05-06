const mongoose = require('mongoose')

const Expense = mongoose.model('Expense', {

    name: String,
    price: Number,
    experationDay: Number,
})

module.exports = Expense