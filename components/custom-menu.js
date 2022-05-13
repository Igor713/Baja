class customMenu extends HTMLElement {

    constructor() {
        super()

        this.build()
    }

    build() {

        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.styles())

        const nav = this.createNavMenu()
        const links = this.createLinks()

        shadow.appendChild(nav)
        links.forEach(link => nav.appendChild(link))

    }

    createNavMenu() {
        const nav = document.createElement('nav')
        nav.classList.add('nav', 'flex-column')
        return nav
    }

    createLinks() {
        const links = [
            {
                label: 'Home',
                url: '<custom-brand>'
            },
            {
                label: 'Cadastrar despesas',
                url: '<register-expenses>'
            },
            {
                label: 'Listar despesas',
                url: '<list-expenses>'
            },
            {
                label: 'Suporte',
                url: '<suport-form>'
            }
        ]
        const createLink = (_, id) => {
            const link = document.createElement('a')
            link.classList.add('nav-link')
            link.setAttribute('href', links[id].url)
            link.innerHTML = links[id].label
            link.addEventListener('click', this.setLink)

            return link
        }
        return Array.from({ length: 4 }, createLink)
    }

    setLink(e) {

        let content = document.getElementById('content')
        let link = e.currentTarget.getAttribute('href')
        content.innerHTML = link
        e.preventDefault()
    }

    styles() {
        const style = document.createElement('style')
        style.textContent = `
            .nav {
                display: flex;
                flex-direction: column;
            }
            .nav .nav-link {
                color: #fff;
                text-decoration: none;
                padding: 10px 10px; 
            }
            .nav .nav-link:hover {
                background-color: #393E46;
                transition: all 0.5s;
            }
            .nav .nav-link:active {
                background-color: #393E46;
            }
        `

        return style
    }
}

customElements.define('custom-menu', customMenu)