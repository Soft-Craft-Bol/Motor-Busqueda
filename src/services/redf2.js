const express = require('express');
const path = require('path');
const { QueryEngine } = require('@comunica/query-sparql');

const app = express();
const port = 3000;
const queryEngine = new QueryEngine();

app.get('/juegos', async (req, res) => {
  try {
    // Ruta absoluta del archivo TTL
    const filePath = path.resolve(__dirname, '../public/data/OntologiaJuegosMesa.ttl');
    // Convertir a URL tipo file://
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

    const query = `
      PREFIX untitled: <http://www.semanticweb.org/adric/ontologies/2025/4/untitled-ontology-17#>
      SELECT ?juego ?nombre ?anio WHERE {
        ?juego a untitled:juego_de_mesa ;
               untitled:nombre ?nombre ;
               untitled:anio_publicacion ?anio .
      }
    `;

    const bindingsStream = await queryEngine.queryBindings(query, {
      sources: [fileUrl]
    });

    const juegos = [];

    bindingsStream.on('data', (binding) => {
      juegos.push({
        uri: binding.get('juego').value,
        nombre: binding.get('nombre').value,
        anio: binding.get('anio')?.value || 'Desconocido'
      });
    });

    bindingsStream.on('end', () => res.json(juegos));

    bindingsStream.on('error', (err) => {
      console.error('Error en el stream:', err);
      res.status(500).send('Error al procesar los resultados');
    });

  } catch (error) {
    console.error("Error general:", error);
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
