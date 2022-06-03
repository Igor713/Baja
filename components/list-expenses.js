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

                    const deleteButton = document.createElement('input')
                    deleteButton.setAttribute('id', 'delete-expense')
                    deleteButton.setAttribute('type', 'button')
                    deleteButton.setAttribute('value', 'Excluir')
                    deleteButton.addEventListener('click', this.deleteExpense)
                    card.appendChild(deleteButton)

                    const editButton = document.createElement('input')
                    editButton.setAttribute('id', 'edit-expense')
                    editButton.setAttribute('type', 'button')
                    editButton.setAttribute('value', 'Editar')
                    editButton.addEventListener('click', this.editExpense)
                    card.appendChild(editButton)

                    cardSection.appendChild(card)
                })
            })
            .catch(err => console.log(err))

        return cardSection
    }

    deleteExpense(e) {

        const expenseId = e.currentTarget.parentElement.getAttribute('expense-id')

        fetch(`http://localhost:3000/expense/${expenseId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {

                console.log(data)
            })
            .catch(err => console.log(err))
    }

    editExpense(e) {


    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `

            .list {
                padding: 15px;
            }

            .list main {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }

            .list main .card {
                padding: 10px;
                margin: 10px;
                background-color: #fff;
            }

        `

        return style
    }
}

customElements.define('list-expenses', listExpenses)