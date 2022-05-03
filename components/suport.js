class suport extends HTMLElement {

    constructor() {

        super()

        build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())
    }

    createForm() {
        const suportForm = document.createElement('form')
        form.setAttribute('action', '')
        form.setAttribute('id', 'suport-form')
        form.setAttribute('class', 'main-suport-form')

        return suportForm
    }

    createSuportTitle() {
        const suportTitle = document.createElement('h2')
    }

    styles() {

        const style = document.createElement('style')
        style.content = ``

        return style
    }
}

customElements.define('suporte', suport)