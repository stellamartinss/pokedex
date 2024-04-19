import { Request, Response } from 'express';
import axios from 'axios';
import { setCaughtPokemon, setPokemonDetails } from '../services/pokemon';
import { CAUGHT_POKEMONS_DATA_BASE } from '../services/common';
import { Pokemon } from '../models/pokemon';
import { Abilities, Ability } from '../models/ability';
import { Types } from '../routes/types';

const BASE_API_URL = 'https://pokeapi.co/api/v2/pokemon';

const getAllPokemons = async (req: Request, res: Response): Promise<void> => {
  const { query } = req;

  try {
    const response = await axios.get(`${BASE_API_URL}`, {
      params: {
        offset: query.offset || 0,
        limit: 20,
      },
    });

    const pokemonList = response.data.results;
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon: Pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return setPokemonDetails(pokemonDetails.data);
      })
    );

    res.json({
      count: response.data.count,
      results: pokemonData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPokemonDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_API_URL}/${id}`);

    const pokemonDetails = setPokemonDetails(response.data);
    res.status(200).json(pokemonDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPokemonBy = async (req: Request, res: Response) => {
  const { ability, type } = req.query;

  try {
    const response = await axios.get(`${BASE_API_URL}?limit=100`);

    const pokemonList = response.data.results;

    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon: Pokemon) => {
        const pokemonDetails = await axios.get(pokemon.url);
        const abilities = pokemonDetails.data.abilities.map(
          (ability: Abilities) => ability.ability.name
        );
        const types = pokemonDetails.data.types.map(
          (type: Types) => type.type.name
        );

        if (
          (ability && abilities.includes(ability)) ||
          (type && types.includes(type))
        ) {
          return setPokemonDetails(pokemonDetails.data);
        }
      })
    );

    res.status(200).json(pokemonData.filter((item: Pokemon) => !!item));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const caughtPokemons = async (req: Request, res: Response) => {
  try {
    res.json({ results: CAUGHT_POKEMONS_DATA_BASE });
  } catch (error) {
    console.error('Error fetching caught pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCaughtPokemonsBy = async (req: Request, res: Response) => {
  try {
    const { ability, type } = req.query;

  
    const response = CAUGHT_POKEMONS_DATA_BASE.filter(
      (item: Pokemon) => {
        if(ability) {
          return !!item.abilities.includes(ability as string) 
        }

        return !!item.type.includes(type as string)
      });

    res.json(response);
  } catch (error) {
    console.error('Error fetching caught pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const catchPokemon = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_API_URL}/${id}`);

    const pokemonDetails = setCaughtPokemon(response.data);

    CAUGHT_POKEMONS_DATA_BASE.push(pokemonDetails);

    res.status(201).json(pokemonDetails);
    return;
  } catch (error) {
    console.error('Error fetching caught pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getAllPokemons,
  getPokemonDetails,
  getPokemonBy,
  caughtPokemons,
  catchPokemon,
  getCaughtPokemonsBy,
};
