

const URL_API = "https://swapi.co/api"
const FORMAT = "?format=json"
let divBody = document.getElementById('films')
let divGif = document.getElementById('loading')
let planets = []
let characters = []
let starships = []
let homeworlds = []
let species = []

let API = {
	getFilms : () => {
	   divGif.style.display= "block";
       fetch(URL_API+"/films/"+FORMAT, { method: 'GET'})
  		.then(response => response.json())
        .then( function(listFilms) {
        	divBody.innerHTML = ''
        	listFilms.results.map(async function(film, key){
        		let newFilm = await API.formatFilm(film)
        		divBody.appendChild(newFilm)
        		if(key == (listFilms.results.length-1))
        			divGif.style.display= "none";
        	})
		})
		.catch(function(err) {
			divGif.style.display= "none";
			console.log(err)
		})
	},
	formatFilm : async(film) => {
		let _planets = await API.getPlanet(film)
		let _characters = await API.getCharacter(film)
		let _starships = await API.getStartships(film)
		
		let format = {}
		format.name = film.title
		format.planets = _planets;
		format.characters = _characters;
		format.starships = _starships;

		let element = new Card(format).createCart();
		
		return new Promise(resolve => {
			resolve(element)
		})

	},
	getPlanet : async(film) => {
		return new Promise(resolve => {
			let planetsTmp = []
			film.planets.map(async function(url, key) {
				if(typeof planets[url] === 'undefined') {
					let res = await fetch(url+FORMAT, { method: 'GET'})
					let planet = await res.json()
					if(await planet){
						let json_planet = {}
						json_planet.name = planet.name
						json_planet.terrain = planet.terrain
						json_planet.gravity = planet.gravity
						json_planet.diameter = planet.diameter
						json_planet.population = planet.population
						planets[url] = json_planet
						planetsTmp.push(planets[url])
					}
				} else {
					planetsTmp.push(planets[url])
				}
				if(key == (film.planets.length-1))
					resolve(planetsTmp)
			})
		})
	},
	getCharacter : async(film) => {
		return new Promise(resolve => {
			let charactersTmp = []
			film.characters.map(async function(url, key) {
				if(typeof planets[url] === 'undefined') {
					let _character = await fetch(url+FORMAT, { method: 'GET'})
					let character = await _character.json()
					if(await character){

						let _homeworld = await fetch(character.homeworld+FORMAT, { method: 'GET'})
						let homeworld = await _homeworld.json()
						if(await homeworld) {
							homeworlds[character.homeworld] = homeworld.name
							character.homeworld = homeworld.name
						}

						if(typeof character.species[0] !== 'undefined'){
							let _species = await fetch(character.species[0]+FORMAT, { method: 'GET'})
							let specie = await _species.json()
							if(await specie){
								let json_specie = {}
								json_specie.name = specie.name
								json_specie.language = specie.language
								json_specie.average_height = specie.average_height
								homeworlds[character.species] = json_specie
								character.species = json_specie
							}
						}

						let json_character = {}
						json_character.name = character.name
						json_character.gender = character.gender
						json_character.hair_color = character.hair_color
						json_character.skin_color = character.skin_color
						json_character.eye_color = character.eye_color
						json_character.height = character.height
						json_character.homeworld = character.homeworld
						json_character.species = character.species
						characters[url] = json_character
						charactersTmp.push(characters[url])
					}
				} else {
					charactersTmp.push(characters[url])
				}
				if(key == (film.characters.length-1))
					resolve(charactersTmp)
			})
		})
	},
	getStartships : async(film) => {
		return new Promise(resolve => {
			let starshipsTmp = []
			film.starships.map(async function(url, key) {
				if(typeof starships[url] === 'undefined') {
					let res = await fetch(url+FORMAT, { method: 'GET'})
					let starship = await res.json()
					if(await starship){
						json_starship = {}
						json_starship.name = starship.name
						json_starship.model = starship.model
						json_starship.manufacturer = starship.manufacturer
						json_starship.passengers = starship.passengers
						starships[url] = json_starship
						starshipsTmp.push(starships[url])
					}
				} else {
					starshipsTmp.push(starships[url])
				}
				if(key == (film.starships.length-1))
					resolve(starshipsTmp)
			})
		})
	}

}
