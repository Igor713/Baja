const mongoose = require('mongoose')

const Expense = mongoose.model('Expense', {

    name: String,
    price: String,
    experationDay: String,
})

module.exports = Expense