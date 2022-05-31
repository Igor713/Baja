class customBrand extends HTMLElement {

    constructor() {

        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const brand = this.createBrand()
        const wrapper = this.createWrapper()

        wrapper.appendChild(brand)
        shadow.appendChild(wrapper)
    }

    createWrapper() {

        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'brand-wrapper')

        return wrapper
    }

    createBrand() {

        const brand = document.createElement('img')
        brand.setAttribute('src', 'assets/image/Baja logo.svg')
        brand.setAttribute('alt', 'baja logo')

        return brand
    }

    styles() {

        const style = document.createElement('style')
        style.textContent = `

            .brand-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
        `

        return style
    }
}

customElements.define('custom-brand', customBrand)