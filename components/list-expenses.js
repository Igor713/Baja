class listExpenses extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const section = this.createSectionList()
        const cards = this.createCards()

        shadow.appendChild(section)
        cards.forEach(card => section.appendChild(card))
    }

    createSectionList() {

        const sectionList = document.createElement('section')
        sectionList.setAttribute('class', 'list')

        return sectionList
    }

    createCards() {

        fetch("http://localhost:3000/expense")
            .then(response => response.json())
            .then(jsonBody => {

                console.log(jsonBody)
                return jsonBody
            })
            .catch(err => console.log(err))

        const createCards = (_, id) => {

            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = jsonBody[id].name

            return card
        }

        return Array.from({ length: jsonBody.length }, createCards)
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = ``

        return style
    }
}

customElements.define('list-expenses', listExpenses)