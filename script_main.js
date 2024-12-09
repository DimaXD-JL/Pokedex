let currentOffset = 1;         // Startwert für das Laden der Pokémon-Daten
let limit = 40;                // Anzahl der Pokémon, die pro Anfrage geladen werden
let totalPokemons = 1309;      // Gesamtanzahl der verfügbaren Pokémon
let loadedPokemons = [];       // Ein Array, um die geladenen Pokémon zu speichern
let myVar;                     // Eine Variable für das Timeout in der Ladeanzeige

function init() {
  fetchPokedexJson();            // Starte das Laden der Pokémon-Daten
}
async function fetchPokedexJson() {
  for (let i = currentOffset; i < currentOffset + limit && i <= totalPokemons; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`); // API-Anfrage für jedes Pokémon
    let pokemon = await response.json();  // Die Antwort in JSON umwandeln
    loadedPokemons.push(pokemon);          // Das geladene Pokémon in das Array speichern
    renderPokemon(pokemon);                // Das Pokémon anzeigen
  }

  currentOffset += limit;                  // Offset aktualisieren für die nächste Ladung
  updatePokemonCount();                    // Den Zähler der geladenen Pokémon aktualisieren
}

function searchPokemon() {
  let search = document.getElementById('search').value.trim().toLowerCase();  // Suchbegriff aus dem Eingabefeld holen
  let content = document.getElementById('condent-cards');                     // Referenz auf den Bereich für die Pokémon-Karten   
  content.innerHTML = '';                                                      // Inhalte zurücksetzen

   // Wenn das Suchfeld leer ist, alle Pokémon neu laden
   if (search === '') {
    loadedPokemons.forEach(pokemon => renderPokemon(pokemon));
    return;
  }
  // Überprüfen, ob der Suchbegriff mindestens 3 Buchstaben hat
  if (search.length < 3) {
    content.innerHTML = '<p>Bitte geben Sie mindestens 3 Buchstaben für die Suche ein!</p>';
    return;
  }

  // Prüfen, ob bereits Pokémon geladen wurden
  if (loadedPokemons.length === 0) {
    content.innerHTML = '<p>Es wurden noch keine Pokémon geladen. Bitte lade zuerst Pokémon!</p>';
    return;
  }

  // Pokémon filtern, deren Name den Suchbegriff enthält
  let results = loadedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search));

  // Suchergebnisse anzeigen
  if (results.length > 0) {
    results.forEach(pokemon => renderPokemon(pokemon));
  } else {
    content.innerHTML = '<p>Kein Pokémon gefunden, das den Suchbegriff enthält.</p>';
  }

}

function renderPokemon(pokemon) {
  let pokemonsRef = document.getElementById('condent-cards');
  let pokemonHTML = getPokemonCardHTML(pokemon);
    pokemonsRef.innerHTML += pokemonHTML;
  }
 
  // function renderPokemon(pokemon) {
  //   let pokemonsRef = document.getElementById('condent-cards');
  
  //   let typeClass = pokemon.types[0].type.name;
  //   let hasSecondClass = pokemon.types.length > 1;
  //   let secondClass = hasSecondClass ? pokemon.types[1].type.name : ''; 
  //   pokemonsRef.innerHTML += 
    
  //     <div class="poke-cards bo_${typeClass}">
  //       <div class="header-cards">
  //         <p>#${pokemon.id}</p>
  //         <p><strong>${pokemon.name}</strong></p>
  //       </div>
  //       <img onclick="toggleOverlay(),current(${pokemon.id-1})"
  //                 class="card-img"
  //                 src="${pokemon.sprites.other.dream_world.front_default}" 
  //                 alt="${pokemon.name}" 
  //             />
  //       <div class="card-icons ${typeClass} ">
  //         <img class="type-icon" title="${typeClass}"src="./assets/icons/typeIcon_${typeClass}.png"alt="${typeClass} icon">
  //           ${hasSecondClass ? <img class="type-icon" src="./assets/icons/typeIcon_${secondClass}.png" alt="${secondClass} icon"> : ''}
  //     </div>
  //   ;
  //  }

  
function updatePokemonCount() {
  const pokemonCountSpan = document.getElementById('pokemon-count');
  pokemonCountSpan.textContent = `${currentOffset-1} von ${Math.min(totalPokemons)} Pokémon geladen.`;
}

function loadMorePokemon() {
  loadingspinner(); 
  fetchPokedexJson();
}

function loadingspinner() {
  let loader = document.getElementById("loader");
  let loadMoreButton = document.getElementById("load-more");
  let content = document.getElementById("myDiv");
    loader.style.display = "block";
    loadMoreButton.disabled = true;
    content.style.display = "none";
  myVar = setTimeout(showPage, 1000);
}

function showPage() {
  let loader = document.getElementById("loader");
  let content = document.getElementById("myDiv");
  let loadMoreButton = document.getElementById("load-more");


  loader.style.display = "none";
  content.style.display = "block";
  loadMoreButton.disabled = false;
} 

window.onload = function () {
  loadingspinner();
  setTimeout(() => {
    fetchPokedexJson();
  }, 1000); }