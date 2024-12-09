let currentIndex = 0;

function overlayContent(pokemon) {
    let overlayPokeContainer = document.getElementById("overlayBigCards");

    overlayPokeContainer.innerHTML = `
        <div class="bo_${pokemon.types[0].type.name}">
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
function bubblingProtextin(event) {
    event.stopPropagation();
}
function toggleOverlay() {
    let overlayRef = document.getElementById("overlay");
    overlayRef.classList.toggle("d_none");
}
function next() {
    if (loadedPokemons.length > 0) {
        currentIndex = (currentIndex + 1) % loadedPokemons.length; 
        overlayContent(loadedPokemons[currentIndex]); 
    }
}
function back() {
    if (loadedPokemons.length > 0) {
        currentIndex = (currentIndex - 1 + loadedPokemons.length) % loadedPokemons.length;
        overlayContent(loadedPokemons[currentIndex]); 
    }
}
function current(Poke){
    currentIndex = Poke
    overlayContent(loadedPokemons[currentIndex])
}





