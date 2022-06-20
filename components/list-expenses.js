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

                const amountTotal = data.map((expense) => {

                    let expensePrice = expense.price.replace(',', '.')
                    let expensePriceFloat = parseFloat(expensePrice)

                    return expensePriceFloat
                })

                let sum = 0
                for (let i = 0; i < amountTotal.length; i++) {

                    sum += amountTotal[i]
                }

                const cardResult = document.createElement('div')
                cardResult.setAttribute('id', 'card-result')
                cardResult.innerHTML = `Valor total das despesas <br><span id="amount-value">R$ ${sum.toFixed(2).replace('.', ',')}</span>`
                cardSection.appendChild(cardResult)

                data.map((item) => {

                    const card = document.createElement('div')
                    card.setAttribute('id', item._id)
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

                    const messageExperation = document.createElement('div')
                    messageExperation.setAttribute('class', 'message-experation')
                    messageExperation.innerHTML = 'Vence no dia:'
                    card.appendChild(messageExperation)

                    const experationDay = document.createElement('input')
                    experationDay.setAttribute('id', 'experation-day')
                    experationDay.setAttribute('disabled', '')
                    experationDay.setAttribute('value', item.experationDay)
                    card.appendChild(experationDay)

                    const buttonsWrapper = document.createElement('div')
                    buttonsWrapper.setAttribute('class', 'buttons-wrapper')
                    card.appendChild(buttonsWrapper)

                    // Botão de editar
                    const editButton = document.createElement('button')
                    editButton.setAttribute('id', 'edit-expense')
                    editButton.setAttribute('function', 'editExpense')
                    editButton.addEventListener('click', this.editExpense)
                    buttonsWrapper.appendChild(editButton)

                    const editImg = document.createElement('img')
                    editImg.setAttribute('id', 'edit-img')
                    editImg.setAttribute('src', 'assets/image/pencil.png')
                    editImg.setAttribute('alt', 'edit image')
                    editImg.setAttribute('title', 'Editar despesa')
                    editButton.appendChild(editImg)

                    const cancelImg = document.createElement('img')
                    cancelImg.setAttribute('id', 'cancel-img')
                    cancelImg.setAttribute('src', 'assets/image/cancel.png')
                    cancelImg.setAttribute('alt', 'Botão de salvar')
                    cancelImg.setAttribute('title', 'Canxelar edição')
                    editButton.appendChild(cancelImg)

                    // Botão de salvar
                    const saveButton = document.createElement('button')
                    saveButton.setAttribute('id', 'save-expense')
                    saveButton.setAttribute('title', 'Salvar')
                    saveButton.addEventListener('click', this.saveExpense)
                    buttonsWrapper.appendChild(saveButton)

                    const saveImg = document.createElement('img')
                    saveImg.setAttribute('class', 'save-img')
                    saveImg.setAttribute('src', 'assets/image/save.png')
                    saveImg.setAttribute('alt', 'Botão de salvar')
                    saveButton.appendChild(saveImg)

                    // Botão de delete
                    const deleteButton = document.createElement('button')
                    deleteButton.setAttribute('id', 'delete-expense')
                    deleteButton.setAttribute('title', 'Excluir')
                    deleteButton.addEventListener('click', this.deleteExpense)
                    buttonsWrapper.appendChild(deleteButton)

                    const deleteImg = document.createElement('img')
                    deleteImg.setAttribute('class', 'delete-img')
                    deleteImg.setAttribute('src', 'assets/image/delete.png')
                    deleteImg.setAttribute('alt', 'Botão de deletar')
                    deleteButton.appendChild(deleteImg)

                    cardSection.appendChild(card)
                })
            })
            .catch(err => console.log(err))

        return cardSection
    }

    cancelEdit(e) {

        e.currentTarget.removeAttribute('class', 'cancel-button')

        e.currentTarget.parentElement.querySelector('#expense-name').setAttribute('disabled', '')
        e.currentTarget.parentElement.querySelector('#expense-price').setAttribute('disabled', '')
        e.currentTarget.parentElement.querySelector('#experation-day').setAttribute('disabled', '')

        e.currentTarget.parentElement.querySelector('#edit-expense').setAttribute('value', 'Editar')
    }

    deleteExpense(e) {

        const expenseId = e.currentTarget.parentElement.parentElement.getAttribute('id')
        let expenseValue = e.currentTarget.parentElement.parentElement.querySelector('#expense-price').value
        expenseValue = expenseValue.replace('R$', '')
        expenseValue = expenseValue.replace(',', '.')

        fetch(`http://localhost:3000/expense/${expenseId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {

                console.log(data)
                alert('Exclusão realizada com sucesso!')
            })
            .catch(err => console.log(err))

        let cardContent = e.currentTarget.parentElement.parentElement
        cardContent.remove()

        let amountTotal = document.querySelector('list-expenses').shadowRoot.querySelector('#amount-value').innerHTML.replace('R$ ', '')
        amountTotal = amountTotal.replace(',', '.')

        let newAmountTotal = amountTotal - expenseValue
        document.querySelector('list-expenses').shadowRoot.querySelector('#amount-value').innerHTML = 'R$ ' + newAmountTotal.toFixed(2).replace('.', ',')
    }

    editExpense(e) {

        e.currentTarget.classList.toggle('active')
        const functionButton = e.currentTarget.getAttribute('function')

        if (functionButton === 'editExpense') {

            e.currentTarget.parentElement.parentElement.querySelector('#expense-name').removeAttribute('disabled')
            e.currentTarget.parentElement.parentElement.querySelector('#expense-price').removeAttribute('disabled')
            e.currentTarget.parentElement.parentElement.querySelector('#experation-day').removeAttribute('disabled')

            e.currentTarget.setAttribute('function', 'cancelExpense')
            e.currentTarget.parentElement.querySelector('#save-expense').setAttribute('class', 'active')

        } else {

            e.currentTarget.parentElement.parentElement.querySelector('#expense-name').setAttribute('disabled', '')
            e.currentTarget.parentElement.parentElement.querySelector('#expense-price').setAttribute('disabled', '')
            e.currentTarget.parentElement.parentElement.querySelector('#experation-day').setAttribute('disabled', '')

            e.currentTarget.setAttribute('function', 'editExpense')
            e.currentTarget.parentElement.querySelector('#save-expense').removeAttribute('class', 'active')
        }
    }

    saveExpense(e) {

        const expenseId = e.currentTarget.parentElement.parentElement.getAttribute('id')

        const expenseName = e.currentTarget.parentElement.parentElement.querySelector('#expense-name')
        const expensePrice = e.currentTarget.parentElement.parentElement.querySelector('#expense-price')
        const priceSplit = expensePrice.value
        const priceArray = priceSplit.split('R$ ')
        const expenseExperationDay = e.currentTarget.parentElement.parentElement.querySelector('#experation-day')

        const expenseElement = {

            name: expenseName.value,
            price: priceArray[1],
            experationDay: expenseExperationDay.value
        }

        const init = {

            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(expenseElement)
        }

        fetch(`http://localhost:3000/expense/${expenseId}`, init)
            .then(response => response.json())
            .then(data => {

                alert('Alteração realizada com sucesso!')
                // location.reload()

            })
            .catch(err => console.log(err))

        e.currentTarget.parentElement.parentElement.querySelector('#expense-name').setAttribute('disabled', '')
        e.currentTarget.parentElement.parentElement.querySelector('#expense-price').setAttribute('disabled', '')
        e.currentTarget.parentElement.parentElement.querySelector('#experation-day').setAttribute('disabled', '')

        e.currentTarget.parentElement.querySelector('#edit-expense').removeAttribute('class', 'active')
        e.currentTarget.parentElement.querySelector('#edit-expense').setAttribute('function', 'editExpense')
        e.currentTarget.removeAttribute('class')
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
                position: relative;
            }

            #list main #card-result {
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
                padding: 15px;
                position: fixed;
                bottom: 15px;
                right: 30px;
                text-align: center;
                z-index: 1;
            }

            #list main #card-result span {
                font-weight: bold;
                color: green;
            }

            #list main .expense-card {
                padding: 15px;
                margin: 15px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                border-radius: 5px;
                position: relative;
            }
            #list main .expense-card .buttons-wrapper {
                display: flex;
                justify-content: space-between;
                gap: 15px;
                margin-top: 10px;
            }

            #list main .expense-card #edit-expense,
            #list main .expense-card #save-expense,
            #list main .expense-card #delete-expense {
                border-radius: 50%;
                display: flex;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
                border: none;
                background-color: #fff;
                padding: 0.5rem;
                color: #fff;
                transition: 0.3s;
                cursor: pointer;
            }

            #list main .expense-card #save-expense {
                display: none;
            }

            #list main .expense-card #save-expense.active {
                display: flex;
            }

            #list main .expense-card #edit-expense:hover,
            #list main .expense-card #save-expense:hover,
            #list main .expense-card #delete-expense:hover {
                box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
                color: #fff;
                transition: 0.3s;
            }

            #list main .expense-card #edit-img, 
            #list main .expense-card #cancel-img, 
            #list main .expense-card .save-img, 
            #list main .expense-card .delete-img {
                width: 20px;
                height: 20px;
            }

            #list main .expense-card #edit-expense.active #cancel-img {
                display: block;
            }

            #list main .expense-card #edit-expense #cancel-img {
                display: none;
            }

            #list main .expense-card #edit-expense.active #edit-img {
                display: none;
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
        `

        return style
    }
}

customElements.define('list-expenses', listExpenses)