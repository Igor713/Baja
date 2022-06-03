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
        // form.setAttribute('action', '/expense')
        // form.setAttribute('method', 'POST')
        form.setAttribute('id', 'expense-form')

        return form
    }

    createTitle() {
        const title = document.createElement('h2')
        title.setAttribute('class', 'expenses-title')
        title.innerHTML = 'Cadastrando nova despesa'

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
        inputExperationDay.setAttribute('type', 'text')
        inputExperationDay.setAttribute('name', 'expense-experationDay')
        inputExperationDay.setAttribute('id', 'expense-experation-day')

        return inputExperationDay
    }

    createRegisterButton() {
        const registerButton = document.createElement('input')
        registerButton.setAttribute('type', 'submit')
        registerButton.setAttribute('value', 'Registrar')
        registerButton.setAttribute('class', 'submit-button')
        registerButton.innerHTML = "Cadastrar"

        return registerButton
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `
            
            .form-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                height: 100%;
            }
            #expense-form {
                display: flex;
                flex-direction: column;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 5px 5px rgb(0,0,0,0.1);
                max-width: 500px;
            }
            #expense-form h2 {
                margin: 0;
                padding-bottom: 10px;
            }
            #expense-form input {
                border: none;
                border-bottom: 1px solid #393E46;
                margin-bottom: 10px;
            }

            #expense-form input:focus {
                outline: none;
            }

            #expense-form label {
                font-size: 14px;
                margin-bottom: 10px;
            }

            #expense-form .submit-button {
                margin-top: 10px;
                border: none;
                background-color: #B55400;
                color: #fff;
                padding: 10px;
                transition: 0.5s;
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