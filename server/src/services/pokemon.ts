import { Abilities, Ability } from '../models/ability';
import { Pokemon, PokemonDetails } from '../models/pokemon';
import { Type, Types } from '../routes/types';
import { CAUGHT_POKEMONS_DATA_BASE } from './common';

export const setPokemonDetails = (data: PokemonDetails) => {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    type: data.types.map((type: any) => type.type.name).join(', '),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities?.map(
      (ability: Abilities) => ability.ability.name
    ).join(', '),
    caught: CAUGHT_POKEMONS_DATA_BASE.find(
      (item: Pokemon) => item.id === data.id
    ),
    url: data.url
  };
};

export const setCaughtPokemon = (data: PokemonDetails) => {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    type: data.types.map((type: any) => type.type.name).join(', '),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(
      (ability: Abilities) => ability.ability.name
    ).join(', '),
    caught: true,
    url: data.url
  };
};
