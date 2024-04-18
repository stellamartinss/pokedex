import {
  caughtPokemons,
  getPokemonBy,
  getPokemonDetails,
  getPokemonDitto,
} from '../controllers/pokemon';

const express = require('express');

const router = express.Router();

router.get('/', getPokemonDitto);
router.get('/filter', getPokemonBy);
router.get('/details/:id', getPokemonDetails);
router.get('/caught-pokemons', caughtPokemons);

export default router;
