const express = require('express');
const {
    getAllAbilities,
    getAbility
} = require('../controllers/abilities');

const router = express.Router();

router.get('/', getAllAbilities);

export default router;
