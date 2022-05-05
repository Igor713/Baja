class registerExpenses extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const form = this.createForm()
        shadow.appendChild(form)
        const title = this.createTitle()

        const labelName = this.createLabelName()
        const inputName = this.createInputName()

        const labelPrice = this.createLabelPrice()
        const inputPrice = this.createInputPrice()

        const labelExperationDay = this.createLabelExperationDay()
        const inputExperationDay = this.createInputExperationDay()

        const button = this.createRegisterButton()

        form.appendChild(title)

        form.appendChild(labelName)
        form.appendChild(inputName)

        form.appendChild(labelPrice)
        form.appendChild(inputPrice)

        form.appendChild(labelExperationDay)
        form.appendChild(inputExperationDay)

        form.appendChild(button)
    }

    createForm() {
        const form = document.createElement('form')
        form.setAttribute('action', '/register')
        form.setAttribute('method', 'POST')
        form.setAttribute('id', 'form-expenses')
        form.setAttribute('class', 'main-form')

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
        labelName.setAttribute('for', 'name')
        labelName.innerHTML = 'Nome'

        return labelName
    }

    createInputName() {
        const inputName = document.createElement('input')
        inputName.setAttribute('type', 'text')
        inputName.setAttribute('name', 'name')
        inputName.setAttribute('id', 'name')

        return inputName
    }

    createLabelPrice() {
        const labelPrice = document.createElement('label')
        labelPrice.setAttribute('for', 'price')
        labelPrice.innerHTML = 'Valor'

        return labelPrice
    }

    createInputPrice() {
        const inputPrice = document.createElement('input')
        inputPrice.setAttribute('type', 'text')
        inputPrice.setAttribute('name', 'price')
        inputPrice.setAttribute('id', 'price')

        return inputPrice
    }

    createLabelExperationDay() {
        const labelExperationDay = document.createElement('label')
        labelExperationDay.setAttribute('for', 'experation-day')
        labelExperationDay.innerHTML = 'Dia de vencimento'

        return labelExperationDay
    }

    createInputExperationDay() {
        const inputExperationDay = document.createElement('input')
        inputExperationDay.setAttribute('type', 'text')
        inputExperationDay.setAttribute('name', 'expiration-day')
        inputExperationDay.setAttribute('id', 'expiration-day')

        return inputExperationDay
    }

    createRegisterButton() {
        const registerButton = document.createElement('button')
        registerButton.setAttribute('type', 'submit')
        registerButton.setAttribute('class', 'submit-button')
        registerButton.innerHTML = "Cadastrar"

        return registerButton
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `
            .main-form {
                display: flex;
                flex-direction: column;
                background-color: #fff;
                padding: 20px;
                border-radius: 6px;
                box-shadow: 0 5px 5px rgb(0,0,0,0.1);
            }
            .main-form h2 {
                margin: 0;
                padding-bottom: 10px;
            }
            .main-form input {
                border: 1px solid #393E46;
                border-radius: 4px;
                margin-bottom: 10px;
                padding: 4px;
            }

            .main-form label {
                font-size: 14px;
            }

            .main-form .submit-button {
                margin-top: 10px;
                border: none;
                background-color: #B55400;
                color: #fff;
                padding: 8px;
                border-radius: 4px;
                transition: 0.5s;
            }
            .main-form .submit-button:hover {
                background-color: #d1711e;
                transition: 0.5s;
            }
        `

        return style
    }
}

customElements.define('register-expenses', registerExpenses)