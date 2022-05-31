const deleteExpense = document.querySelector('list-expenses').shadowRoot.querySelector('#delete-expense')

if (deleteExpense) {

    deleteExpense.addEventListener('submit', (e) => {

        e.preventDefault()

        const idExpense = document.querySelector('list-expenses').shadowRoot.querySelector('expense-id')

        const expenseElement = {

            _id: idExpense.value
        }

        const init = {

            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(expenseElement)
        }

        fetch('http://localhost:3000/expense', init)
            .then(data => {
                if (!data.ok) {
                    throw Error(data.status)
                }
                return data.json()
                // }).then(expenseElement => {
                //     console.log(expenseElement)
            }).catch(e => {
                console.log(e);
            });
    })
}