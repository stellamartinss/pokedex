import {
  catchPokemon,
  caughtPokemons,
  getPokemonBy,
  getPokemonDetails,
  getAllPokemons,
} from '../controllers/pokemon';

const express = require('express');

const router = express.Router();

router.get('/', getAllPokemons);
router.get('/filter', getPokemonBy);
router.get('/details/:id', getPokemonDetails);
router.get('/caught-pokemons', caughtPokemons);

router.post('/catch-pokemon/:id', catchPokemon);

export default router;
