function getPokemonCardHTML(pokemon) {
    let typeClass = pokemon.types[0].type.name;
    let hasSecondClass = pokemon.types.length > 1;
    let secondClass = hasSecondClass ? pokemon.types[1].type.name : ''; 
    
    return `
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
        <div class="card-icons ${typeClass}">
          <img class="type-icon" title="${typeClass}" src="./assets/icons/typeIcon_${typeClass}.png" alt="${typeClass} icon">
          ${hasSecondClass ? `<img class="type-icon" src="./assets/icons/typeIcon_${secondClass}.png" alt="${secondClass} icon">` : ''}
        </div>
      </div>
    `;
  }

  function getOverlayHTML(pokemon) {
    let typeClass = pokemon.types[0].type.name;
    
    return `
      <div class="bo_${typeClass}">
        <div class="header-overlaybigcards">
          <p>#${pokemon.id}</p>
          <p><strong>${pokemon.name}</strong></p>
        </div>
        <img  
          class="overlaybigcard-img"
          src="${pokemon.sprites.other.dream_world.front_default}" 
          alt="${pokemon.name}" 
        />
        <div class="overlay-details">
          <p>Typ: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p>Höhe: ${(pokemon.height / 10).toFixed(1)} m</p>
          <p>Gewicht: ${(pokemon.weight / 10).toFixed(1)} kg</p>
        </div>
        <div class="nav-button">
          <button onclick="back()">←</button>
          <button onclick="next()">→</button> 
        </div>
      </div>
    `;
  }