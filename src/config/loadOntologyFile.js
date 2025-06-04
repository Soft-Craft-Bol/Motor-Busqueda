const path = require('path');
const fs = require('fs');

function loadOntologyFilePath() {
    return path.join(__dirname, '../public/data/OntologiaJuegosMesa.ttl');
}

module.exports = { loadOntologyFilePath };
