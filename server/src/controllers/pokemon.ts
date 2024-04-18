import { Request, Response } from 'express';
import axios from 'axios';

const BASE_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const CAUGHT_POKEMONS_DATA_BASE: {
  name: string;
  image: string;
  type: string;
  height: number;
  weight: number;
  abilities: string;
}[] = [];

const getPokemonDitto = async (req: Request, res: Response): Promise<void> => {
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
      pokemonList.map(async (pokemon: any) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
          id: pokemonDetails.data.id,
          name: pokemonDetails.data.name,
          type: pokemonDetails.data.types.map((type: any) => type.type.name),
          height: pokemonDetails.data.height,
          weight: pokemonDetails.data.weight,
          image: pokemonDetails.data.sprites.front_default,
        };
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

    const pokemonDetails = {
      name: response.data.name,
      image: response.data.sprites.front_default,
      type: response.data.types.map((type: any) => type.type.name).join(', '),
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map(
        (ability: any) => ability.ability.name
      ),
    };
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
      pokemonList.map(async (pokemon: any) => {
        const pokemonDetails = await axios.get(pokemon.url);
        const abilities = pokemonDetails.data.abilities.map(
          (ability: any) => ability.ability.name
        );
        const types = pokemonDetails.data.types.map(
          (type: any) => type.type.name
        );

        if (
          (ability && abilities.includes(ability)) ||
          (type && types.includes(type))
        ) {
          return {
            id: pokemonDetails.data.id,
            name: pokemonDetails.data.name,
            type: pokemonDetails.data.types.map((type: any) => type.type.name),
            height: pokemonDetails.data.height,
            weight: pokemonDetails.data.weight,
            image: pokemonDetails.data.sprites.front_default,
          };
        }
      })
    );

    res.status(200).json(pokemonData.filter((item: any) => !!item));
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

const catchPokemon = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const response = await axios.get(`${BASE_API_URL}/${id}`);
   
    const pokemonDetails = {
      name: response.data.name,
      image: response.data.sprites.front_default,
      type: response.data.types.map((type: any) => type.type.name).join(', '),
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map(
        (ability: any) => ability.ability.name
      ),
    };
    
    CAUGHT_POKEMONS_DATA_BASE.push(pokemonDetails);
    
    res.status(201).json();
    return;
  } catch (error) {
    console.error('Error fetching caught pokemons:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getPokemonDitto,
  getPokemonDetails,
  getPokemonBy,
  caughtPokemons,
  catchPokemon,
};
