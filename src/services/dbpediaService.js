const axios = require('axios');
const { URL, URLSearchParams } = require('url');
const dbpediaConfig = require('../config/dbpedia');
const { searchVideoGames } = require('../utils/sparqlQueries');

class DBpediaService {
  async searchVideoGames(term, lang = 'en') {
    const endpoint = this._getEndpoint();
    const query = searchVideoGames(term, lang);
    
    try {
      const response = await axios.get(endpoint, {
        params: {
          ...dbpediaConfig.defaultQueryOptions,
          query: query
        },
        headers: {
          'Accept': 'application/sparql-results+json'
        }
      });
      
      return this._parseResults(response.data);
    } catch (error) {
      this._handleError(error);
      throw new Error(`DBpedia query failed: ${error.message}`);
    }
  }

  _getEndpoint() {
    // Usar el endpoint estándar de DBpedia (no varía por idioma)
    return dbpediaConfig.endpoints.default;
  }

  _parseResults(data) {
    if (!data?.results?.bindings) {
      throw new Error('Invalid SPARQL results format');
    }
    
    return data.results.bindings.map(result => ({
      label: result.label?.value,
      abstract: result.abstract?.value
    }));
  }

  _handleError(error) {
    console.error('DBpedia Service Error:');
    console.error(`- Message: ${error.message}`);
    if (error.response) {
      console.error(`- Status: ${error.response.status}`);
      console.error(`- Response: ${JSON.stringify(error.response.data)}`);
    }
  }
}

module.exports = new DBpediaService();