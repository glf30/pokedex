let pokemon = [];

let searchFilterResults = [];

let sortOption = "NUMBER_LOW_TO_HIGH";
let filterOption = "NONE";

const resultsHeading = document.querySelector(".results__header--title");
const resultsDisplay = document.querySelector(".results__display");
const input = document.querySelector(".search__input");

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
    `https://pokeapi.co/api/v2/pokemon/?limit=1010` /* current limit before new forms */
  );
  let dataPokemonList = await responsePokemonList.json();

  resultsDisplay.classList.remove("results__loading");

  await dataPokemonList.results.forEach(async (e) => {
    let pokemonInfo = await loadPokemonInfo(e.name);
    renderCard(pokemonInfo);
    pokemon.push(pokemonInfo);
  });
};

resultsDisplay.classList.add("results__loading");
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
      break;
  }
};

let typeSelector = (type) => {
  searchFilterResults = pokemon.filter((e) => {
    if (e.types.length === 2) {
      return e.types[0].type.name === type || e.types[1].type.name === type;
    }

    return e.types[0].type.name === type;
  });
};

let filterPokemonByType = () => {
  if (filterOption !== "NONE") {
    typeSelector(filterOption.toLowerCase());
  } else {
    searchFilterResults = pokemon;
  }
};

let searchFilterSort = () => {
  resultsDisplay.innerHTML = "";
  resultsHeading.innerText = "Results:";
  input.value = "";

  filterPokemonByType();
  sortPokemon();
  searchFilterResults.forEach((e) => renderCard(e));
};

let searchPokemon = (event) => {
  event.preventDefault();

  resultsDisplay.innerHTML = "";
  resultsHeading.innerText = "Results:";

  let searchPokemonResult = undefined;
  if (isNaN(Number(input.value))) {
    //Search by Name
    searchPokemonResult = pokemon.find(
      (e) => e.name === input.value.toLowerCase().trim().replace(" ", "-")
    );
  } else if (typeof Number(input.value) === "number") {
    //Search by id
    searchPokemonResult = pokemon.find((e) => e.id === Number(input.value));
  }

  if (searchPokemonResult !== undefined) {
    renderCard(searchPokemonResult);
    input.value = "";
  } else {
    if (input.value.trim() === ""){
        input.value = " ";
    }
    resultsHeading.innerText += ` "${input.value}" Not Found`;
  }
};

let reset = () => {
  let selectSort = document.querySelector("#sort");
  let selectFilter = document.querySelector("#filter-type");

  selectSort.value = "NUMBER_LOW_TO_HIGH";
  selectFilter.value = "NONE";
  sortOption = "NUMBER_LOW_TO_HIGH";
  filterOption = "NONE";

  searchFilterSort();
};

let setDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};
