// Fonction pour rechercher et afficher les détails d'un Pokémon
function searchAndDisplayPokemon(pokemonNumber) {
    // Fonction pour récupérer les détails d'un Pokémon par son numéro
    function getPokemonDetails(pokemonNumber) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon introuvable!');
                }
                // console.log('Data from API:', response); // Afficher les données dans la console

                return response.json();
            });
    }

    // Fonction pour afficher les détails d'un Pokémon
    function displayPokemonDetails(pokemon) {
        const pokemonDetailsContainer = document.getElementById('pokemonDetails');
        pokemonDetailsContainer.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p><strong>Numéro:</strong> #${pokemon.id}</p>
            <p><strong>Description:</strong> ${pokemon.species.name}</p>
            <p><strong>Hauteur:</strong> ${pokemon.height}</p>
            <p><strong>Poids:</strong> ${pokemon.weight}</p>
            <img class="larger-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        `;
    }

    // Appel à la fonction pour récupérer les détails du Pokémon
    getPokemonDetails(pokemonNumber)
        .then(pokemon => {
            displayPokemonDetails(pokemon);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Pokémon not found!');
        });
}

// Écouteur d'événements pour le formulaire de recherche
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    const pokemonNumber = document.getElementById('pokemonNumber').value;
    searchAndDisplayPokemon(pokemonNumber);
});


// Fonction pour afficher 12 Pokémon au hasard
function displayRandomPokemons() {
    const numberOfPokemons = 12;

    // Fonction pour récupérer un nombre aléatoire entre min et max inclus
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Fonction pour récupérer les détails d'un Pokémon par son numéro
    function getPokemonDetails(pokemonNumber) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon inexitant!');
                }
                return response.json();
            });
    }

    // Fonction pour afficher les détails d'un Pokémon
    function displayPokemon(pokemon, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML += `
            <div class="col-md-3 mb-3">
                <div class="card">
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">#${pokemon.id}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Récupération de 12 Pokémon au hasard et affichage dans la partie supérieure
    for (let i = 0; i < numberOfPokemons; i++) {
        const randomPokemonNumber = getRandomNumber(1, 898); // Il y a actuellement 898 Pokémon répertoriés
        getPokemonDetails(randomPokemonNumber)
            .then(pokemon => {
                displayPokemon(pokemon, 'topPokemon');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// Appel à la fonction pour afficher 12 Pokémon au hasard
displayRandomPokemons();
