
const express = require('express');
const router = express.Router();
const rdfController = require('../controllers/rdf.controller');

// Ruta principal (home)
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Video Game RDF Search Engine' 
  });
});

// Ruta para búsqueda de videojuegos desde RDF
router.get('/search', rdfController.search);

// Ruta para mostrar detalles de un videojuego RDF
router.get('/game/:uri', rdfController.gameDetails);

module.exports = router;
