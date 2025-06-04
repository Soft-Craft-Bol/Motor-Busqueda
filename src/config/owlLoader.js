const path = require('path');
const fs = require('fs');

/**
 * Función que obtiene el contenido del archivo OWL/RDF
 * @returns {string} contenido RDF
 * @throws {Error} si el archivo no existe
 */
function loadOntologyFile() {
    const filePath = path.join(__dirname, '../public/data/OntologiaJuegosMesa.ttl');

  

    if (!fs.existsSync(filePath)) {
        throw new Error(`❌ El archivo no existe en: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
}

module.exports = { loadOntologyFile };
