import axios from 'axios';

const BASE_URL = 'http://localhost:8080/pokemon';

const fetchPokemons = async ({ page }: { page: number }) => {
  try {
    const response = await axios.get(`${BASE_URL}?limit=20&offset=${page}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching Pokemon data:', error.message);
    throw error;
  }
};

const caughtPokemons = async ({ page }: { page: number }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/caught-pokemons?=truelimit=20&offset=${page}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching Pokemon data:', error.message);
    throw error;
  }
};

const catchPokemon = async (id: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/catch-pokemon/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching Pokemon data:', error.message);
    throw error;
  }
};

const getPokemonDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/details/${id}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
};

const getPokemonsBy = async ({
  page,
  filters,
}: {
  page: number;
  filters: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter?${filters}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon by type:', error);
    return [];
  }
};

const getCaughtPokemonsBy = async ({
  page,
  filters,
}: {
  page: number;
  filters: string;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter-caught-pokemons?${filters}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon by type:', error);
    return [];
  }
};

export {
  fetchPokemons,
  getPokemonDetails,
  getPokemonsBy,
  caughtPokemons,
  catchPokemon,
  getCaughtPokemonsBy,
};
