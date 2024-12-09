let currentOffset = 1; 
let limit = 40; 
let totalPokemons = 1309; 
let loadedPokemons = [];
let myVar;


function init(){
  currentNames = totalPokemons;
  fetchPokedexJson();  
  overlayContent(pokemon);
}

async function fetchPokedexJson() {

    for (let i = currentOffset; i < currentOffset + limit && i <= totalPokemons; i++) {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      let pokemon = await response.json(); 
      loadedPokemons.push(pokemon);
      renderPokemon(pokemon); 
      overlayContent(pokemon); 
      console.log(pokemon);
    }
    currentOffset += limit;
    updatePokemonCount();
  }

  function searchPokemon() {
    let search = document.getElementById('search').value.trim().toLowerCase();
    let content = document.getElementById('condent-cards');
    document.getElementById('load-more').classList.add('d-none');
    content.innerHTML = '';
    if (search.length < 3) {
        content.innerHTML = '<p>Bitte geben Sie mindestens 3 Buchstaben für die Suche ein!</p>';
        document.getElementById('load-more').classList.remove('d-none');
        return; 
    }
    if (loadedPokemons.length === 0) {
        content.innerHTML = '<p>Es wurden noch keine Pokémon geladen. Bitte lade zuerst Pokémon!</p>';
        return;
    }

    let results = loadedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search));
    if (results.length > 0) {
        results.forEach(pokemon => renderPokemon(pokemon));
    } else {
        content.innerHTML = '<p>Kein Pokémon gefunden, das den Suchbegriff enthält.</p>';
    }
    document.getElementById('load-more').classList.remove('d-none');
}
async function searchThroughAllPokemons(search) {
    let results = [];
    for (let i = 1; i <= totalPokemons; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemon = await response.json();
        if (pokemon.name.toLowerCase().includes(search)) {
            results.push(pokemon);
        }
    }
    return results;
}


function renderPokemon(pokemon) {

  let pokemonsRef = document.getElementById('condent-cards');
  let typeClass = pokemon.types[0].type.name;
  let hasSecondClass = pokemon.types.length > 1;
  let secondClass = hasSecondClass ? pokemon.types[1].type.name : ''; 

  pokemonsRef.innerHTML += `
    <div class="poke-cards bo_${typeClass}">
      <div class="header-cards">
        <p>#${pokemon.id}</p>
        <p><strong>${pokemon.name}</strong></p>
      </div>
      <img onclick="toggleOverlay(),current(${pokemon.id-1})"
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
function updatePokemonCount() {
  const pokemonCountSpan = document.getElementById('pokemon-count');
  pokemonCountSpan.textContent = `${currentOffset}von ${Math.min(totalPokemons)} Pokémon geladen.`;
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
  }, 1000); 
};