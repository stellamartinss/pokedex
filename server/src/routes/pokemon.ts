import {
  catchPokemon,
  caughtPokemons,
  getPokemonBy,
  getPokemonDetails,
  getAllPokemons,
  getCaughtPokemonsBy
} from '../controllers/pokemon';

const express = require('express');

const router = express.Router();

router.get('/', getAllPokemons);
router.get('/filter', getPokemonBy);
router.get('/details/:id', getPokemonDetails);
router.get('/caught-pokemons', caughtPokemons);
router.get('/filter-caught-pokemons', getCaughtPokemonsBy);

router.post('/catch-pokemon/:id', catchPokemon);

export default router;
