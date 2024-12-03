async function fetchPokedexJson() {
  for (let i = 1; i <= +30; i++) { // Schleife für die IDs 1 bis 10
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let pokemon = await response.json(); // API-Antwort in JSON umwandeln
    console.log(pokemon);
    renderPokemon(pokemon); // Direkt das Pokémon anzeigen
  }
 
function renderPokemon(pokemon) {
  let pokemonsRef = document.getElementById('condent-cards');

  // Bestimmen der CSS-Klasse basierend auf dem Typ des Pokémon (erste Type)
  const typeClass = pokemon.types[].type.name;
  

  pokemonsRef.innerHTML += `
    <div class="poke-cards bo_${typeClass}">
      <div class="header-cards">
        <p>#${pokemon.id}</p>
        <p><strong>${pokemon.name}</strong></p>
      </div>
      <img
        class="card-img bo_${typeClass}"
        src="${pokemon.sprites.front_default}"
        alt="${pokemon.name}"
      />
      <div class="card-icons ${typeClass}">
        <!-- Dynamisches Hinzufügen von Icons, basierend auf dem Typ -->
        <img class="type-icon" src="./assets/icons/typeIcon_${typeClass}.png" alt="${typeClass} icon">
        
    </div>
  `;
 }
}


