import axios from 'axios';
const BASE_URL = 'http://localhost:8080/ability';

const getAbilities = async () => {
    try {
  
      const response = await axios.get(
        `${BASE_URL}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon by type:', error);
      return [];
    }
  };
  
  export { getAbilities };
  