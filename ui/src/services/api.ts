import axios from 'axios';

const BASE_URL = 'http://localhost:8080/pokemon';

const fetchPokemons = async ({page}: {page: number}) => {
    try {
      const response = await axios.get(`${BASE_URL}?limit=20&offset=${page}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching Pokemon data:', error.message);
      throw error;
    }
  };

export {
    fetchPokemons
}