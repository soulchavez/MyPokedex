import {CondensedPokemon, Pokemon} from './types';

export async function pokemonList() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150', {
      method: 'GET',
    });

    let data = await res.json();

    const pokemonArray = [];
    const results = data.results;

    for (let i = 0; i < results.length; i++) {
      pokemonArray.push(cleanCondensedPokemon(results[i]));
    }
    return {data: pokemonArray, status: res.status};
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePokemon(id: number) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: 'GET',
    });

    let data = await res.json();

    return {data: cleanPokemon(data), status: res.status};
  } catch (error) {
    console.log(error);
  }
}

function cleanPokemon(dirtyPokemon: any) {
  const types = cleanTypes(dirtyPokemon.types);
  const cleanedPokemon: Pokemon = {
    id: dirtyPokemon.id,
    abilities: cleanAbilities(dirtyPokemon.abilities),
    height: dirtyPokemon.height,
    weight: dirtyPokemon.weight,
    name: dirtyPokemon.name,
    types: types,
    images: [
      dirtyPokemon.sprites.front_default,
      dirtyPokemon.sprites.back_default,
    ],
  };

  return cleanedPokemon;
}

function cleanTypes(dirtyTypes: any) {
  const clean = [];
  for (let i = 0; i < dirtyTypes.length; i++) {
    clean.push(dirtyTypes[i].type.name);
  }

  return clean;
}

function cleanAbilities(dirtyAbilities: any) {
    const clean = [];
    for (let i = 0; i < dirtyAbilities.length; i++) {
      clean.push(dirtyAbilities[i].ability.name);
    }
  
    return clean;
  }


function cleanCondensedPokemon(dirtyPokemon: any) {
  const id = dirtyPokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '');

  const cleanedPokemon: CondensedPokemon = {
    name: dirtyPokemon.name,
    url: dirtyPokemon.url,
    id: id.replace('/', ''),
  };

  return cleanedPokemon;
}
