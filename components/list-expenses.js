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

        // if (location.reload) {

        //     const contentLoad = document.getElementById('content')
        //     console.log(contentLoad)
        //     contentLoad.innerHTML = localStorage.getItem('lastLink')
        // }

        return sectionList
    }

    createCards() {

        const cardSection = document.createElement('main')

        fetch("http://localhost:3000/expense")
            .then(response => response.json())
            .then(data => {

                data.map((item) => {

                    const card = document.createElement('div')
                    card.setAttribute('id', item._id)
                    card.classList.add('expense-card')

                    const cancelButton = document.createElement('a')
                    cancelButton.setAttribute('id', 'cancel-button')
                    cancelButton.setAttribute('title', 'Cancelar edição')
                    cancelButton.innerHTML = 'X'
                    cancelButton.addEventListener('click', this.cancelEdit)
                    card.appendChild(cancelButton)

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

                    // Botão de salvar
                    const editButton = document.createElement('button')
                    editButton.setAttribute('id', 'edit-expense')
                    editButton.setAttribute('type', 'button')
                    editButton.setAttribute('value', 'Editar')
                    editButton.addEventListener('click', this.editExpense)
                    buttonsWrapper.appendChild(editButton)

                    const editImg = document.createElement('img')
                    editImg.setAttribute('class', 'edit-img')
                    editImg.setAttribute('src', 'assets/image/pencil.png')
                    editImg.setAttribute('alt', 'edit image')
                    editButton.appendChild(editImg)

                    // Botão de salvar
                    const saveButton = document.createElement('button')
                    saveButton.setAttribute('id', 'save-expense')
                    saveButton.setAttribute('type', 'button')
                    saveButton.setAttribute('title', 'Salvar')
                    saveButton.addEventListener('click', this.editExpense)
                    buttonsWrapper.appendChild(saveButton)

                    const saveImg = document.createElement('img')
                    saveImg.setAttribute('class', 'edit-img')
                    saveImg.setAttribute('src', 'assets/image/save.png')
                    saveImg.setAttribute('alt', 'edit image')
                    saveButton.appendChild(saveImg)

                    // Botão de delete
                    const deleteButton = document.createElement('button')
                    deleteButton.setAttribute('id', 'delete-expense')
                    deleteButton.setAttribute('type', 'button')
                    deleteButton.setAttribute('title', 'Excluir')
                    deleteButton.addEventListener('click', this.deleteExpense)
                    buttonsWrapper.appendChild(deleteButton)

                    const deleteImg = document.createElement('img')
                    deleteImg.setAttribute('class', 'delete-img')
                    deleteImg.setAttribute('src', 'assets/image/delete.png')
                    deleteImg.setAttribute('alt', 'delete image')
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

        const expenseId = e.currentTarget.parentElement.getAttribute('id')

        fetch(`http://localhost:3000/expense/${expenseId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {

                console.log(data)
                alert('Exclusão realizada com sucesso!')
            })
            .catch(err => console.log(err))


        const cardContent = e.currentTarget.parentElement
        cardContent.remove()
    }

    editExpense(e) {

        const saveId = e.currentTarget.parentElement.getAttribute('id')
        const saveButton = e.currentTarget.parentElement.querySelector('#edit-expense')

        if (saveButton.value === 'Editar') {

            e.currentTarget.parentElement.querySelector('#cancel-button').setAttribute('class', 'cancel-button')
            e.currentTarget.parentElement.querySelector('#expense-name').removeAttribute('disabled')
            e.currentTarget.parentElement.querySelector('#expense-price').removeAttribute('disabled')
            e.currentTarget.parentElement.querySelector('#experation-day').removeAttribute('disabled')
            e.currentTarget.parentElement.querySelector('#edit-expense').setAttribute('value', 'Salvar')

        } else {

            const expenseName = e.currentTarget.parentElement.querySelector('#expense-name')
            const expensePrice = e.currentTarget.parentElement.querySelector('#expense-price')
            const priceSplit = expensePrice.value
            const priceArray = priceSplit.split('R$ ')
            const expenseExperationDay = e.currentTarget.parentElement.querySelector('#experation-day')

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

            fetch(`http://localhost:3000/expense/${saveId}`, init)
                .then(response => response.json())
                .then(data => {

                    alert('Alteração realizada com sucesso!')
                    // location.reload()

                })
                .catch(err => console.log(err))

            e.currentTarget.parentElement.querySelector('#expense-name').setAttribute('disabled', '')
            e.currentTarget.parentElement.querySelector('#expense-price').setAttribute('disabled', '')
            e.currentTarget.parentElement.querySelector('#experation-day').setAttribute('disabled', '')
            e.currentTarget.parentElement.querySelector('#cancel-button').removeAttribute('class', 'cancel-button')
            e.currentTarget.parentElement.querySelector('#edit-expense').setAttribute('value', 'Editar')
        }
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
                margin: 15px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                border-radius: 5px;
                position: relative;
            }
            #list main .expense-card .buttons-wrapper {
                display: flex;
                gap: 15px;
                margin-top: 10px;
            }
            #list main .expense-card #cancel-button {
                position: absolute;
                display: none;
                top: -14px;
                right: -14px;
                font-weight: bold;
                background: #fff;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                padding: 2px 9px;
                color: red;
                height: 24px;
                cursor: pointer;
            }

            #list main .expense-card .cancel-button {
                display: block !important;
            }

            #list main .expense-card #edit-expense,
            #list main .expense-card #save-expense,
            #list main .expense-card #delete-expense {
                border-radius: 16px;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
                border: none;
                background-color: #fff;
                padding: 0.5rem;
                color: #fff;
                transition: 0.3s;
                cursor: pointer;
            }

            #list main .expense-card #edit-expense:hover,
            #list main .expense-card #save-expense:hover,
            #list main .expense-card #delete-expense:hover {
                box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
                color: #fff;
                transition: 0.3s;
            }

            #list main .expense-card .edit-img, 
            #list main .expense-card .save-img, 
            #list main .expense-card .delete-img {
                width: 20px;
                height: 20px;
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