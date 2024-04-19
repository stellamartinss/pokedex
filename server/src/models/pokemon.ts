import { Abilities } from './ability';

export type Pokemon = {
    id: number;
    name: string;
    type: string;
    height: string;
    weight: string;
    image: string;
    abilities: string,
    url: string,
}

export type PokemonDetails = {
    id: number;
    name: string;
    type: string;
    height: string;
    weight: string;
    image: string;
    abilities: Abilities[],
    url: string,
    sprites: {
        front_default: string
    },
    types: string[],
}