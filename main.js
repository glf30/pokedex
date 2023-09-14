let pokemon = [];

let searchFilterResults = [];

let sortOption = "NUMBER_LOW_TO_HIGH";
let filterOption = "NONE";

const resultsDisplay = document.querySelector(".results__display");

let loadPokemonInfo = async (pokemonName) => {
  let responsePokemonInfo = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  let dataPokemonInfo = await responsePokemonInfo.json();

  return dataPokemonInfo;
};

let createTypesDisplay = (types) => {
  let typesDisplay = `<div class="pokemon__type ${types[0].type.name}">
                    ${types[0].type.name.toUpperCase()}
                </div>`;
  if (types.length === 2) {
    typesDisplay += `
                <div class="pokemon__type ${types[1].type.name}">
                    ${types[1].type.name.toUpperCase()}
                </div>`;
  }

  return typesDisplay;
};

let renderCard = async (pokemonInfo) => {
  const typesDisplay = createTypesDisplay(pokemonInfo.types);
  const pokemonCard = document.createElement("div");
  pokemonCard.className = "pokemon";
  pokemonCard.innerHTML = `
            <figure class="pokemon__img--wrapper">
                <img class="pokemon__img" src="${
                  pokemonInfo.sprites.front_default
                }" alt="">
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
    `;
  resultsDisplay.appendChild(pokemonCard);
};

let getPokemon = async () => {
  let responsePokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=1010`
  );
  let dataPokemonList = await responsePokemonList.json();

  await dataPokemonList.results.forEach(async (e) => {
    let pokemonInfo = await loadPokemonInfo(e.name);
    renderCard(pokemonInfo);
    pokemon.push(pokemonInfo);
  });
};

getPokemon();

let setSortOption = (event) => {
  sortOption = event.target.value;
};

let setFilterOption = (event) => {
  filterOption = event.target.value;
};

let sortPokemon = () => {
  switch (sortOption) {
    case "NUMBER_LOW_TO_HIGH":
      searchFilterResults = searchFilterResults.sort((a, b) => a.id - b.id);
      break;

    case "NUMBER_HIGH_TO_LOW":
      searchFilterResults = searchFilterResults.sort((a, b) => b.id - a.id);
      break;

    case "ALPHA_A_TO_Z":
      searchFilterResults = searchFilterResults.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      break;

    case "ALPHA_Z_TO_A":
      searchFilterResults = searchFilterResults.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      break;

    default:
      searchFilterResults = pokemon;
  }
};

let filterPokemonByType = () => {

  switch (filterOption) {
    case "NORMAL":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "normal" ||
            e.types[1].type.name === "normal"
          );
        }

        return e.types[0].type.name === "normal";
      });
      console.log(searchFilterResults)
      break;

    case "FIRE":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "fire" || e.types[1].type.name === "fire"
          );
        }

        return e.types[0].type.name === "fire";
      });
      break;
    case "WATER":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "water" || e.types[1].type.name === "water"
          );
        }

        return e.types[0].type.name === "water";
      });
      break;
    case "GRASS":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "grass" || e.types[1].type.name === "grass"
          );
        }

        return e.types[0].type.name === "grass";
      });
      break;
    case "ELECTRIC":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "electric" ||
            e.types[1].type.name === "electric"
          );
        }

        return e.types[0].type.name === "electric";
      });
      break;
    case "FLYING":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "flying" ||
            e.types[1].type.name === "flying"
          );
        }

        return e.types[0].type.name === "flying";
      });
      break;
    case "BUG":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "bug" || e.types[1].type.name === "bug"
          );
        }

        return e.types[0].type.name === "bug";
      });
      break;
    case "POISON":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "poison" ||
            e.types[1].type.name === "poison"
          );
        }

        return e.types[0].type.name === "poison";
      });
      break;
    case "ROCK":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "rock" || e.types[1].type.name === "rock"
          );
        }

        return e.types[0].type.name === "rock";
      });
      break;
    case "GROUND":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "ground" ||
            e.types[1].type.name === "ground"
          );
        }

        return e.types[0].type.name === "ground";
      });
      break;
    case "FIGHTING":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "fighting" ||
            e.types[1].type.name === "fighting"
          );
        }

        return e.types[0].type.name === "fighting";
      });
      break;
    case "PSYCHIC":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "psychic" ||
            e.types[1].type.name === "psychic"
          );
        }

        return e.types[0].type.name === "psychic";
      });
      break;
    case "GHOST":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "ghost" ||
            e.types[1].type.name === "ghost"
          );
        }

        return e.types[0].type.name === "ghost";
      });
      break;
    case "DARK":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "dark" ||
            e.types[1].type.name === "dark"
          );
        }

        return e.types[0].type.name === "dark";
      });
      break;
    case "STEEL":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "steel" ||
            e.types[1].type.name === "steel"
          );
        }

        return e.types[0].type.name === "steel";
      });
      break;
    case "FAIRY":
      searchFilterResults = pokemon.filter((e) => {
        if (e.types.length === 2) {
          return (
            e.types[0].type.name === "fairy" ||
            e.types[1].type.name === "fairy"
          );
        }

        return e.types[0].type.name === "fairy";
      });
      break;
    case "NONE":
      searchFilterResults = pokemon;
      break;
    default:
      searchFilterResults = pokemon;
  }

};

let searchFilterSort = () => {
  resultsDisplay.innerHTML = "";

  filterPokemonByType();
  sortPokemon();

  searchFilterResults.forEach((e) => renderCard(e));
};
