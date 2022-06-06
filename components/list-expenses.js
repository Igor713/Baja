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
        sectionList.setAttribute('class', 'list')

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
                    price.setAttribute('value', item.price)
                    card.appendChild(price)

                    const experationDay = document.createElement('input')
                    experationDay.setAttribute('id', 'experation-day')
                    experationDay.setAttribute('disabled', '')
                    experationDay.setAttribute('value', item.experationDay)
                    card.appendChild(experationDay)

                    const wrapperbuttons = document.createElement('div')
                    wrapperbuttons.classList.add('wrapper-buttons')
                    card.appendChild(wrapperbuttons)

                    const deleteButton = document.createElement('input')
                    deleteButton.setAttribute('id', 'delete-expense')
                    deleteButton.setAttribute('type', 'button')
                    deleteButton.setAttribute('value', 'Excluir')
                    deleteButton.addEventListener('click', this.deleteExpense)
                    wrapperbuttons.appendChild(deleteButton)

                    const editButton = document.createElement('input')
                    editButton.setAttribute('id', 'edit-expense')
                    editButton.setAttribute('type', 'button')
                    editButton.setAttribute('value', 'Editar')
                    editButton.addEventListener('click', this.editExpense)
                    wrapperbuttons.appendChild(editButton)

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
            })
            .catch(err => console.log(err))
    }

    editExpense(e) {

        e.currentTarget.parentElement.querySelector('#expense-name').removeAttribute('disabled')
        e.currentTarget.parentElement.querySelector('#expense-price').removeAttribute('disabled')
        e.currentTarget.parentElement.querySelector('#experation-day').removeAttribute('disabled')

        e.currentTarget.parentElement.querySelector('#edit-expense').setAttribute('value', 'Salvar')

        const safeid = e.currentTarget.parentElement.getAttribute('expense-id')
        const safeEdit = e.currentTarget.parentElement.querySelector('#edit-expense')

        console.log(safeid)

        safeEdit.addEventListener('click', (e) => {

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

            console.log(expenseElement)

            if (safeEdit.value === 'Salvar') {

                fetch(`http://localhost:3000/expense/${safeid}`, init)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))
            }
        }, false)
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `

            .list {
                padding: 15px;
            }

            .list main {
                width: 100%;
                display: flex;
            }

            .list main .expense-card {
                padding: 10px;
                margin: 10px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
            }
            .list main .expense-card input {
                width: 100%;
                margin-bottom: 10px;
                border-bottom: 1px solid #ccc !important;
                background-color: transparent;
                padding: 5px;
                font-size: 18px;
                border: none;
            }

        `

        return style
    }
}

customElements.define('list-expenses', listExpenses)