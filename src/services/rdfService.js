const fs = require('fs');
const path = require('path');
const { QueryEngine } = require('@comunica/query-sparql');
const { searchVideoGames } = require('../utils/rdfQueries');

const rdfFilePath = path.join(__dirname, '../public/data/OntologiaJuegosMesa.rdf'); // ajusta esto

class RDFService {
  constructor() {
    this.engine = new QueryEngine();
  }

  async searchVideoGames(term, lang = 'es') {
    const queryInfo = searchVideoGames(term);
    const query = `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      SELECT ?s ?label WHERE {
        ?s rdfs:label ?label .
        FILTER(CONTAINS(LCASE(STR(?label)), LCASE("${term}")))
      } LIMIT 10
    `;

    const result = await this.engine.query(query, {
      sources: [{ type: 'file', value: rdfFilePath }]
    });

    const bindings = await result.bindings();

    return bindings.map(binding => ({
      uri: binding.get('?s')?.value,
      label: binding.get('?label')?.value
    }));
  }

  async getGameDetails(uri) {
    const query = `
      SELECT ?p ?o WHERE {
        <${uri}> ?p ?o .
      }
    `;
    const result = await this.engine.query(query, {
      sources: [{ type: 'file', value: rdfFilePath }]
    });

    const bindings = await result.bindings();

    const details = {};
    bindings.forEach(binding => {
      const predicate = binding.get('?p').value;
      const object = binding.get('?o').value;
      details[predicate] = object;
    });

    return details;
  }
}

module.exports = new RDFService();