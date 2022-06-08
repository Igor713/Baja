class listExpenses extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const section = this.createSectionList()
        const cardSection = this.createCards()

        shadow.appendChild(section)
        section.appendChild(cardSection)
    }

    createSectionList() {

        const sectionList = document.createElement('section')
        sectionList.setAttribute('id', 'list')

        return sectionList
    }

    createCards() {

        const cardSection = document.createElement('main')

        fetch("http://localhost:3000/expense")
            .then(response => response.json())
            .then(data => {

                data.map((item) => {

                    const card = document.createElement('div')
                    card.setAttribute('expense-id', item._id)
                    card.classList.add('expense-card')

                    const name = document.createElement('input')
                    name.setAttribute('id', 'expense-name')
                    name.setAttribute('disabled', '')
                    name.setAttribute('value', item.name)
                    card.appendChild(name)

                    const price = document.createElement('input')
                    price.setAttribute('id', 'expense-price')
                    price.setAttribute('disabled', '')
                    price.setAttribute('value', 'R$ ' + item.price)
                    card.appendChild(price)

                    const experationDay = document.createElement('input')
                    experationDay.setAttribute('id', 'experation-day')
                    experationDay.setAttribute('disabled', '')
                    experationDay.setAttribute('value', item.experationDay)
                    card.appendChild(experationDay)

                    const editButton = document.createElement('input')
                    editButton.setAttribute('id', 'edit-expense')
                    editButton.setAttribute('type', 'button')
                    editButton.setAttribute('value', 'Editar')
                    editButton.addEventListener('click', this.editExpense)
                    card.appendChild(editButton)

                    const deleteButton = document.createElement('input')
                    deleteButton.setAttribute('id', 'delete-expense')
                    deleteButton.setAttribute('type', 'button')
                    deleteButton.setAttribute('value', 'Excluir')
                    deleteButton.addEventListener('click', this.deleteExpense)
                    card.appendChild(deleteButton)

                    cardSection.appendChild(card)
                })
            })
            .catch(err => console.log(err))

        return cardSection
    }

    deleteExpense(e) {

        const expenseId = e.currentTarget.parentElement.getAttribute('expense-id')

        fetch(`http://localhost:3000/expense/${expenseId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {

                console.log(data)
                alert('Exclusão realizada com sucesso!')
            })
            .catch(err => console.log(err))
    }

    editExpense(e) {

        e.currentTarget.parentElement.querySelector('#expense-name').removeAttribute('disabled')
        e.currentTarget.parentElement.querySelector('#expense-price').removeAttribute('disabled')
        e.currentTarget.parentElement.querySelector('#experation-day').removeAttribute('disabled')

        e.currentTarget.parentElement.querySelector('#edit-expense').setAttribute('value', 'Salvar')

        const saveId = e.currentTarget.parentElement.getAttribute('expense-id')
        const saveEdit = e.currentTarget.parentElement.querySelector('#edit-expense')

        saveEdit.addEventListener('click', (e) => {

            const expenseName = e.currentTarget.parentElement.querySelector('#expense-name')
            const expensePrice = e.currentTarget.parentElement.querySelector('#expense-price')
            const expenseExperationDay = e.currentTarget.parentElement.querySelector('#experation-day')

            const expenseElement = {

                name: expenseName.value,
                price: expensePrice.value,
                experationDay: expenseExperationDay.value
            }

            const init = {

                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(expenseElement)
            }

            if (saveEdit.value === 'Salvar') {

                fetch(`http://localhost:3000/expense/${saveId}`, init)
                    .then(response => response.json())
                    .then(data => {

                        alert('Alteração realizada com sucesso!')
                        location.reload()

                    })
                    .catch(err => console.log(err))
            }
        }, false)
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `

            #list {
                padding: 15px;
            }

            #list main {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }

            #list main .expense-card {
                padding: 15px;
                margin: 10px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                border-radius: 5px;
            }
            #list main .expense-card input {
                border: none;
                border-radius: 5px;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                margin-bottom: 10px;
                padding: 10px;
                font-size: 16px;
                font-weight: bold;
            }

            #list main .expense-card input:hover {
                background-color: rgba(0, 0, 0, 0.2);
                transition: 0.5s;
            }

            #list main .expense-card input:disabled {
                background-color: rgba(0, 0, 0, 0.10);
            }
            #list main .expense-card #edit-expense {
                background-color: #393E46;
                color: #fff;
                transition: 0.3s;
            }

            #list main .expense-card #edit-expense:hover {
                background-color: #222831;
                color: #fff;
                transition: 0.3s;
            }

            #list main .expense-card #delete-expense {
                background-color: #c31e1e;
                color: #fff;
                margin: 0;
                transition: 0.3s;
            }
            #list main .expense-card #delete-expense:hover {
                background-color: #a01919;
                color: #fff;
                margin: 0;
                transition: 0.3s;
            }

        `

        return style
    }
}

customElements.define('list-expenses', listExpenses)