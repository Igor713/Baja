// const formData = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-form')

// if (formData) {

//     formData.addEventListener('submit', (e) => {

//         e.preventDefault()

//         const expenseName = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-name')
//         const expensePrice = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-price')
//         const expenseExperationDay = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-experation-day')

//         const expenseElement = {

//             name: expenseName.value,
//             price: expensePrice.value,
//             experationDay: expenseExperationDay.value
//         }

//         const init = {

//             method: 'POST',
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(expenseElement)
//         }

//         fetch('http://localhost:3000/expense', init)
//             .then(data => {
//                 if (!data.ok) {
//                     throw Error(data.status)
//                 }
//                 return data.json()
//                 // }).then(expenseElement => {
//                 //     console.log(expenseElement)
//             }).catch(e => {
//                 console.log(e);
//             });
//     })
// }