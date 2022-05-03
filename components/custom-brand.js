class customBrand extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const brand = this.createBrand()

        shadow.appendChild(brand)
    }

    createBrand() {
        const brand = document.createElement('img')
        brand.setAttribute('src', 'assets/image/Baja logo.svg')
        brand.setAttribute('alt', 'baja logo')

        return brand
    }

    styles() {
        const style = document.createElement('style')
        style.textContent = ``

        return style
    }
}

customElements.define('custom-brand', customBrand)