let currentOffset = 1; // Start mit ID 1
let limit = 20; // Anzahl der Pokémon, die pro Klick geladen werden kann jederzeit geändertwerden 
let totalPokemons = 1309; // Gesamtzahl der Pokémon, die es gibt

// Funktion, die durch den Button-Klick ausgelöst wird
function loadMorePokemon() {
  fetchPokedexJson();
}

async function fetchPokedexJson() {
  for (let i = currentOffset; i<currentOffset + limit && i <= totalPokemons; i++) { 
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let pokemon = await response.json(); // API-Antwort in JSON umwandeln
    renderPokemon(pokemon);// Direkt das Pokémon anzeigen
    console.log(pokemon);
    
  }
  //stopt das laden wenn currentifset über dem limit liegt. 
  currentOffset += limit; // Offset um den wert erhöhen
    // Die Anzeige des Ladefortschritts aktualisieren
    updatePokemonCount();
  }

 
function renderPokemon(pokemon) {
  let pokemonsRef = document.getElementById('condent-cards');

  // Bestimmen der CSS-Klasse basierend auf dem Typ des Pokémon (erste Type)
  const typeClass = pokemon.types[0].type.name;
  // Überprüfen, ob ein zweiter Typ existiert
  const hasSecondClass = pokemon.types.length > 1;
  const secondClass = hasSecondClass ? pokemon.types[1].type.name : ''; 
  //() in HTML setzte ich es in ein (ternären)operator hat es eine seconderklasse? wenn ja einsetzten wenn nein : ''dann freibleiben.)
 //syntax= condition ? exprIfTrue : exprIfFalse

  pokemonsRef.innerHTML += `
    <div class="poke-cards .example-1 bo_${typeClass}">
      <div class="header-cards">
        <p>#${pokemon.id}</p>
        <p><strong>${pokemon.name}</strong></p>
      </div>
      <img  
        class="card-img "
        src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}"
      />
      <div class="card-icons ${typeClass} ">
        <!-- Dynamisches Hinzufügen von Icons, basierend auf dem Typ -->
        <img class="type-icon" src="./assets/icons/typeIcon_${typeClass}.png"alt="${typeClass} icon">
          ${hasSecondClass ? `<img class="type-icon" src="./assets/icons/typeIcon_${secondClass}.png" alt="${secondClass} icon">` : ''}
    </div>
  `;
 }
 // Funktion zum Aktualisieren der Anzeige der geladenen Pokémon // Math.min wie in der Quizapp 
function updatePokemonCount() {
  const pokemonCountSpan = document.getElementById('pokemon-count');
  pokemonCountSpan.textContent = `${currentOffset}von ${Math.min(totalPokemons)} Pokémon geladen.`;
}
 