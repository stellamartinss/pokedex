import { Request, Response } from 'express';
import axios from 'axios';

const BASE_API_URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemonDitto = async (req: Request, res: Response): Promise<void> => {
  const {query} = req
  
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
            offset: query.offset || 0, 
            limit: 20
        }
    });

    const pokemonList = response.data.results;
    const pokemonData = await Promise.all(pokemonList.map(async (pokemon: any) => {
        const pokemonDetails = await axios.get(pokemon.url);
        return {
            name: pokemonDetails.data.name,
            type: pokemonDetails.data.types.map((type: any) => type.type.name),
            height: pokemonDetails.data.height,
            weight: pokemonDetails.data.weight,
        };
    }));


    res.json({
      count:  response.data.count,
      results: pokemonData
    }); 
} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}
};

export { getPokemonDitto };

function next() {
  throw new Error('Function not implemented.');
}
