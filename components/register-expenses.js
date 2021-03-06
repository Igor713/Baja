class registerExpenses extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const formWrapper = this.createFormWrapper()
        shadow.appendChild(formWrapper)
        const form = this.createForm()
        const title = this.createTitle()

        const labelName = this.createLabelName()
        const inputName = this.createInputName()

        const labelPrice = this.createLabelPrice()
        const inputPrice = this.createInputPrice()

        const labelExperationDay = this.createLabelExperationDay()
        const inputExperationDay = this.createInputExperationDay()

        const button = this.createRegisterButton()

        formWrapper.appendChild(form)
        form.appendChild(title)

        form.appendChild(labelName)
        form.appendChild(inputName)

        form.appendChild(labelPrice)
        form.appendChild(inputPrice)

        form.appendChild(labelExperationDay)
        form.appendChild(inputExperationDay)

        form.appendChild(button)
    }

    createFormWrapper() {

        const formWrapper = document.createElement('div')
        formWrapper.setAttribute('class', 'form-wrapper')

        return formWrapper
    }

    createForm() {

        const form = document.createElement('form')
        form.setAttribute('id', 'expense-form')
        form.addEventListener('submit', this.registerExpense)

        return form
    }

    createTitle() {
        const title = document.createElement('h2')
        title.setAttribute('class', 'expenses-title')
        title.innerHTML = 'Cadastrar nova despesa'

        return title
    }

    createLabelName() {
        const labelName = document.createElement('label')
        labelName.setAttribute('for', 'expense-name')
        labelName.innerHTML = 'Nome da despesa'

        return labelName
    }

    createInputName() {
        const inputName = document.createElement('input')
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('name', 'expense-name')
        inputName.setAttribute('id', 'expense-name')
        inputName.setAttribute('maxlength', '25')
        inputName.setAttribute('autocomplete', 'off')
        inputName.setAttribute('required', '')

        return inputName
    }

    createLabelPrice() {
        const labelPrice = document.createElement('label')
        labelPrice.setAttribute('for', 'expense-price')
        labelPrice.innerHTML = 'Valor'

        return labelPrice
    }

    createInputPrice() {
        const inputPrice = document.createElement('input')
        inputPrice.setAttribute('type', 'text')
        inputPrice.setAttribute('name', 'expense-price')
        inputPrice.setAttribute('id', 'expense-price')
        inputPrice.setAttribute('required', '')
        inputPrice.setAttribute('autocomplete', 'off')
        inputPrice.addEventListener('blur', this.formatPrice)

        return inputPrice
    }

    createLabelExperationDay() {
        const labelExperationDay = document.createElement('label')
        labelExperationDay.setAttribute('for', 'expense-experation-day')
        labelExperationDay.innerHTML = 'Dia de vencimento'

        return labelExperationDay
    }

    createInputExperationDay() {
        const inputExperationDay = document.createElement('input')
        inputExperationDay.setAttribute('type', 'date')
        inputExperationDay.setAttribute('min', '01/01/2000')
        inputExperationDay.setAttribute('max', '31/12/2050')
        inputExperationDay.setAttribute('name', 'expense-experationDay')
        inputExperationDay.setAttribute('required', '')
        inputExperationDay.setAttribute('autocomplete', 'off')
        inputExperationDay.setAttribute('id', 'expense-experation-day')

        return inputExperationDay
    }

    createRegisterButton() {
        const registerButton = document.createElement('input')
        registerButton.setAttribute('type', 'submit')
        registerButton.setAttribute('value', 'Registrar')
        registerButton.setAttribute('class', 'submit-button')
        registerButton.innerHTML = "Cadastrar"
        // registerButton.addEventListener('submit', this.registerExpense)

        return registerButton
    }

    formatPrice(e) {

        let inputPrice = e.currentTarget.value
        let input = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-price')

        if (inputPrice === '') {
            input.value = ''
        } else {

            let inputPriceFloat = parseFloat(inputPrice)
            input.value = inputPriceFloat.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
    }

    registerExpense() {

        const reload = document.querySelector('#content')

        const expenseName = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-name')
        const expensePrice = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-price')
        const expenseExperationDay = document.querySelector('register-expenses').shadowRoot.querySelector('#expense-experation-day')

        const expenseElement = {

            name: expenseName.value,
            price: expensePrice.value,
            experationDay: expenseExperationDay.value
        }

        const init = {

            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(expenseElement)
        }

        fetch('http://localhost:3000/expense', init)
            .then(r => r.json())
            .then(result => {
                console.log(result)
            }).catch(err => {
                console.log(err)
            })

        expenseName.value = ''
        expensePrice.value = ''
        expenseExperationDay.value = ''

        alert('Despesa cadastrada com sucesso!')

        reload.innerHTML = '<register-expenses></register-expenses>'
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `

            * {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            
            .form-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                height: 100%;
                position: relative;
            }

            #expense-form {
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 5px 5px rgb(0,0,0,0.1);
                max-width: 500px;
            }

            #expense-form h2 {
                margin: 0;
            }

            #expense-form input {
                border: none;
                border-bottom: 1px solid #393E46;
                margin-bottom: 10px;
                font-size: 16px;
            }

            #expense-form input:focus {
                outline: none;
            }

            #expense-form label {
                font-size: 18px;
                margin: 10px 0;
            }

            #expense-form .submit-button {
                border-radius: 5px;
                margin-top: 10px;
                font-size: 16px;
                border: none;
                background-color: #B55400;
                color: #fff;
                padding: 10px;
                transition: 0.5s;
                cursor: pointer;
            }

            #expense-form .submit-button:hover {
                background-color: #d1711e;
                transition: 0.5s;
            }
        `
        return style
    }
}

customElements.define('register-expenses', registerExpenses)