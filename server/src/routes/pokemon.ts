const express = require('express');
const { getPokemonDitto } = require('../controllers/pokemon');

const router = express.Router();

router.get('/', getPokemonDitto);

export default router;
