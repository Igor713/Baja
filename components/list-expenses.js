class listExpenses extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())
    }

    doGet() {

    }

    createCards() {

        const expense = fetch("http://localhost:3000/expense")
            .then(response => response.json())
            .catch(err => console.log(err))


        const createCards = (_, id) => {

            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = expense[id].name

            return card
        }

        return Array.from({ length: expense.length }, createCards)
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = ``

        return style
    }
}

customElements.define('list-expenses', listExpenses)