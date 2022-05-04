const express = require('express')
const app = express()

app.get('/', (req, res) => {

    return res.json({ message: 'Listening' })
})

app.listen('3333', () => {
    console.log('Server running on port 3333')
})
