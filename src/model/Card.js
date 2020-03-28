class Card {

	constructor(element) {
        this.element = element
    }

    createCart() {
    	let container = document.createElement('div')
        container.className = "card"
        let title = document.createElement('h1')
        title.innerHTML = this.element.name
        container.appendChild(title)

    	let planets = document.createElement('h3')
        planets.innerHTML = "Planetas"
        let _planets = document.createElement('pre')
        _planets.innerHTML = JSON.stringify(this.element.planets, null, 2);

    	let characters = document.createElement('h3')
        characters.innerHTML = "Actores"
        let _characters = document.createElement('pre')
        _characters.innerHTML = JSON.stringify(this.element.characters, null, 2);

    	let starships = document.createElement('h3')
        starships.innerHTML = "Nave estelar más grande"
        let _starships = document.createElement('pre')
        _starships.innerHTML = JSON.stringify(this.element.starships, null, 2);

        container.appendChild(planets)
        container.appendChild(_planets)
        container.appendChild(characters)
        container.appendChild(_characters)
        container.appendChild(starships)
        container.appendChild(_starships)

        return container
        
    }

}