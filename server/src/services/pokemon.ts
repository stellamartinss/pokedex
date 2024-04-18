import { CAUGHT_POKEMONS_DATA_BASE } from './common';

export const setPokemonDetails = (response: any) => {
  return {
    id: response.data.id,
    name: response.data.name,
    image: response.data.sprites.front_default,
    type: response.data.types.map((type: any) => type.type.name).join(', '),
    height: response.data.height,
    weight: response.data.weight,
    abilities: response.data.abilities.map(
      (ability: any) => ability.ability.name
    ),
    caught: CAUGHT_POKEMONS_DATA_BASE.find(
      (item: any) => item.id === response.data.id
    ),
  };
};

export const setCaughtPokemon = (response: any) => {
  return {
    id: response.data.id,
    name: response.data.name,
    image: response.data.sprites.front_default,
    type: response.data.types.map((type: any) => type.type.name).join(', '),
    height: response.data.height,
    weight: response.data.weight,
    abilities: response.data.abilities.map(
      (ability: any) => ability.ability.name
    ),
    caught: true,
  };
};
