// routes/web.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');

// Home
router.get('/', searchController.home);

// Búsqueda
router.get('/search', searchController.search);

// Detalle de juego
router.get('/game/:uri', searchController.gameDetails);

module.exports = router;