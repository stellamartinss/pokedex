import { Request, Response } from 'express';
import axios from 'axios';

const BASE_ABILITY_API_URL = 'https://pokeapi.co/api/v2/ability';
const BASE_TYPES_API_URL = 'https://pokeapi.co/api/v2/type';

const getAllAbilities = async (req: Request, res: Response): Promise<void> => {
  try {
    const abilities = await axios.get(`${BASE_ABILITY_API_URL}`);
    const type = await axios.get(`${BASE_TYPES_API_URL}`);

    res.status(200).json({
      abilities: abilities.data,
      type: type.data
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllAbilities };
