let pokemon = [];

const resultsDisplay = document.querySelector('.results__display');

let loadPokemonInfo = async (pokemonName) => {
    let responsePokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    let dataPokemonInfo = await responsePokemonInfo.json();

    return dataPokemonInfo;
}

let createTypesDisplay = (types) => {
    let typesDisplay = `<div class="pokemon__type ${types[0].type.name}">
                    ${types[0].type.name.toUpperCase()}
                </div>`
    if (types.length === 2){
        typesDisplay += `
                <div class="pokemon__type ${types[1].type.name}">
                    ${types[1].type.name.toUpperCase()}
                </div>`
    }

    return typesDisplay;

}

let renderCard = async (pokemonInfo) => {
    // number = .id
    // name = .name.toUpperCase()
    // .types (1 or 2)
    const typesDisplay = createTypesDisplay(pokemonInfo.types);
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon';
    pokemonCard.innerHTML = `
            <figure class="pokemon__img--wrapper">
                <img class="pokemon__img" src="${pokemonInfo.sprites.front_default}" alt="">
            </figure>
            <div class="pokemon__name">
                <div class="pokemon__name--number">
                    #${pokemonInfo.id}
                </div>
                <div class="pokemon__name--title">
                    ${pokemonInfo.name.toUpperCase()}
                </div>
            </div>
            <div class="pokemon__types">
                ${typesDisplay}
            </div>
    `
    resultsDisplay.appendChild(pokemonCard);
}

let getPokemon = async () => {
    let responsePokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1010`);
    let dataPokemonList = await responsePokemonList.json();

    await dataPokemonList.results.forEach(async e => {
        let pokemonInfo = await loadPokemonInfo(e.name);
        renderCard(pokemonInfo);
        pokemon.push(pokemonInfo);
    });
    // console.log(dataPokemonList)
    // // dataPokemonList.results.forEach(e => console.log(e));
    
    // 

    // renderResults();

    // setTimeout(() => {
    //     renderResults();
    // }, 5000)

} 

getPokemon();

