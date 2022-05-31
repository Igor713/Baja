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
                    card.classList.add('card')

                    const name = document.createElement('div')
                    name.classList.add('name')
                    name.innerHTML = item.name
                    card.appendChild(name)

                    const price = document.createElement('div')
                    price.classList.add('price')
                    price.innerHTML = item.price
                    card.appendChild(price)

                    const experationDay = document.createElement('div')
                    experationDay.classList.add('experation-day')
                    experationDay.innerHTML = item.price
                    card.appendChild(experationDay)

                    const deleteButton = document.createElement('input')
                    deleteButton.setAttribute('id', 'delete-expense')
                    deleteButton.classList.add('delete-button')
                    deleteButton.setAttribute('type', 'button')
                    deleteButton.setAttribute('value', 'Excluir')
                    card.appendChild(deleteButton)

                    cardSection.appendChild(card)
                })
            })
            .catch(err => console.log(err))

        return cardSection
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