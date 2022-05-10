const axios = require('axios')

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {

    e.preventDefault()

    let data = new FormData(form)

    axios({

        method: 'post',
        url: '/',
        data: data,
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
})