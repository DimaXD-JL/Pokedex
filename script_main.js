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
    overlayContent(pokemon);// im overlay anzeigen 
    console.log(pokemon);
    
  }
  //stopt das laden wenn currentifset über dem limit liegt. 
  currentOffset += limit; // Offset um den wert erhöhen der Anzeige des Ladefortschritts zu aktualisieren
  updatePokemonCount();
  }

 
function renderPokemon(pokemon) {
  let pokemonsRef = document.getElementById('condent-cards');

  // Bestimmen der CSS-Klasse basierend auf dem Typ des Pokémon (erste Type)
  let typeClass = pokemon.types[0].type.name;
  // Überprüfen, ob ein zweiter Typ existiert
  let hasSecondClass = pokemon.types.length > 1;
  let secondClass = hasSecondClass ? pokemon.types[1].type.name : ''; 
  //() in HTML setzte ich es in ein (ternären)operator hat es eine seconderklasse? wenn ja einsetzten wenn nein : ''dann freibleiben.)
 //syntax= condition ? exprIfTrue : exprIfFalse

  pokemonsRef.innerHTML += `
    <div class="poke-cards bo_${typeClass}">
      <div class="header-cards">
        <p>#${pokemon.id}</p>
        <p><strong>${pokemon.name}</strong></p>
      </div>
      <img onclick="toggleOverlay()"
                class="card-img"
                src="${pokemon.sprites.other.dream_world.front_default}" 
                alt="${pokemon.name}" 
            />
      <div class="card-icons ${typeClass} ">
        <img class="type-icon" title="${typeClass}"src="./assets/icons/typeIcon_${typeClass}.png"alt="${typeClass} icon">
          ${hasSecondClass ? `<img class="type-icon" src="./assets/icons/typeIcon_${secondClass}.png" alt="${secondClass} icon">` : ''}
    </div>
  `;
 }
 // Funktion zum Aktualisieren der Anzeige der geladenen Pokémon // Math.min wie in der Quizapp 
function updatePokemonCount() {
  const pokemonCountSpan = document.getElementById('pokemon-count');
  pokemonCountSpan.textContent = `${currentOffset}von ${Math.min(totalPokemons)} Pokémon geladen.`;
}
 
function filterPokemon(filterW) {

  
}

// Globale Variablen
let pokemonData = []; // Speichert alle geladenen Pokémon-Daten
let nextUrl = 'https://pokeapi.co/api/v2/pokemon/${i}'; // Start-URL für die API

// Funktion, um Pokémon-Daten zu laden
async function fetchPokemonData(url) {
   const response = await fetch(url); // Daten von der API holen
       const data = await response.json(); // JSON-Daten parsen
        pokemonData = [...pokemonData, ...data.results]; // Ergebnisse speichern
        nextUrl = data.next; // Nächste URL speichern (falls vorhanden)
        console.log('Aktuelle Pokémon-Daten:', pokemonData);
      }
