function listPokemonDetail(domElementId, pokemonData) {
    // A appeler dans un fichier html affichant le dÃ©tail d'un pokemon
    const params = new URLSearchParams(document.location.search);
    const pokName = params.get("pokemonName");
    const pokId = getPokemonIdByName(pokName, pokemonData);
    const pokemon = pokemonData[pokId];
    const domElement = document.getElementById(domElementId);
    domElement.innerHTML = `
        <div>
            <p>${pokemon.identifier}</p>
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Base Experience: ${pokemon.base_experience}</p>
        </div>
    `;
}

function getPokemonIdByName(name, pokemonData) {
    for (key in pokemonData){
        if (name == pokemonData[key]["identifier"]){
            return key;
        }
    }
}

function listAllPokemon(domElementId, pokemonData) {

    const domElement = document.getElementById(domElementId);
    domElement.innerHTML = Object.values(pokemonData).map(pokemon => `
        <div class="card" style="background-color:${pokemon.type_color[0]}" onclick="goToDetail(${pokemon.id})">
            <img src="img/96px/${pokemon.id}.png" />
            <p>${pokemon.name.fr}</p>
            <p>N°${pokemon.id}</p>
        </div>
    `).join('');
}

function getRandomNumbers(count, min, max) {
    const randomNumbers = [];
    while (randomNumbers.length < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

function getRandomPokemonData(pokemonData, count) {
    const randomIds = getRandomNumbers(count, 1, Object.keys(pokemonData).length);
    const randomPokemonData = randomIds.map(id => pokemonData[id]);
    return randomPokemonData;
}


function createPokemonDropdown(domElementId, pokemonData) {
    const domElement = document.getElementById(domElementId);

    const selectElement = document.createElement('select');
    selectElement.id = 'pokemonDropdown';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Sélectionner un pokemon';
    selectElement.appendChild(defaultOption);

    Object.values(pokemonData).forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.identifier;
        option.textContent = pokemon.identifier;
        selectElement.appendChild(option);
    });

    domElement.appendChild(selectElement);
}

function listAllPokemonFromCollection(domElementId, collectionData, pokemonData) {
    const domElement = document.getElementById(domElementId);
    const pokemons = collectionData.map(assoc => {
        const pokemon = pokemonData[assoc.pokemon_id];
        return {
            ...pokemon,
            pokemon_nickname: assoc.pokemon_nickname
        };
    });
    domElement.innerHTML = pokemons.map(pokemon => `
        <div>
            <p>${pokemon.identifier}</p>
            <p>Nickname: ${pokemon.pokemon_nickname}</p>
        </div>
    `).join('');
}

function addPokemonToCollection(domElementId, pokemonId, pokemonData) {
    const domElement = document.getElementById(domElementId);

    const pokemon = pokemonData[pokemonId];

    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');    
    pokemonElement.id = 0; // On peut remplacer l'id par un id gÃ©nÃ©rÃ© unique (un nombre de milisecondes) avec l'objet Date() => voir la doc !
    // Stocker l'id gÃ©nÃ©rÃ© avec la date pourrait servir pour crÃ©er un bouton de suppression
    pokemonElement.innerHTML = `
        <p>Pokemon: ${pokemon.identifier}</p>
        <p>Surnom: -----</p>
        <p>Height: ${pokemon.height}</p>
        <p>Weight: ${pokemon.weight}</p>
        <p>Base Experience: ${pokemon.base_experience}</p>
    `;

    domElement.appendChild(pokemonElement);
}

function deletePokemonFromCollection(domElementId) {
    const pokemonElement = document.getElementById(domElementId);
    
    if (pokemonElement) {
        pokemonElement.remove();
    }
}

function changePokemonNickname(domElementId, newNickname) { 
    const domElement = document.getElementById(domElementId);
    domElement.innerHTML = `<p>Surnom du pokemon modifié en ${newNickname}</p>`;
}

function goToCatalogue() {
    window.location.href = 'catalogue.html#';
}
function goToDetail(pokemonId) {
    window.location.href = 'creature.html#';
}

function goToCatalogue(pokemonName,pokemonType,pokemonGeneration) {
    window.location.href = 'catalogue.html?name=' + pokemonName + '&type=' + pokemonType + '&generation=' + pokemonGeneration;
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const type = params.get('type');
    const generation = params.get('generation');
    
    document.getElementById('pokemonName').value = name;
    document.getElementById('pokemonType').value = type;
    document.getElementById('pokemonGeneration').value = generation;
}



function goToIndex() {
    window.location.href = 'index.html';
}
function searchPokemon(domElementId, pokemonData) {
    const nameInput = document.getElementById('pokemonName');
    const typeInput = document.getElementById('pokemonType');
    const generationInput = document.getElementById('pokemonGeneration');

    const filterAndDisplay = () => {
        const name = nameInput.value;
        const type = typeInput.value;
        const generation = generationInput.value;
        const filteredPokemon = filterPokemon(pokemonData, name, type, generation);
        listAllPokemon(domElementId, filteredPokemon);
    };

    
    nameInput.addEventListener('input', filterAndDisplay);
    typeInput.addEventListener('change', filterAndDisplay);
    generationInput.addEventListener('change', filterAndDisplay);
}

function filterPokemon(pokemonData, name, type, generation) {
    return Object.values(pokemonData).filter(pokemon => {
        const matchesName = name ? pokemon.identifier.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesType = type ? pokemon.type_fr.includes(type) : true;
        const matchesGeneration = generation ? pokemon.generation == generation : true;
        return matchesName && matchesType && matchesGeneration;
    });
    
}


function listCinqPokemon(domElementId, pokemonData, nb) {
    const domElement = document.getElementById(domElementId);
    const listeNombre = getRandomNumbers(5, 1, 200);
    const filteredPokemonData = Object.keys(pokemonData).reduce((result, key) => {
        if (listeNombre.includes(parseInt(key))) {
            result[key] = pokemonData[key];
        }
        return result;
    }, {});
    listAllPokemon(domElementId, filteredPokemonData);

}
