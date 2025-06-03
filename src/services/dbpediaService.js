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
      paramsSerializer: params => {
        // Codificación manual para asegurar el formato correcto
        return Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
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
    // Información básica
    label: result.label?.value,
    abstract: result.abstract?.value,
    comment: result.comment?.value,
    
    // Multimedia
    thumbnail: result.thumbnail?.value,
    
    // Detalles del juego
    equipment: result.equipment?.value,
    players: result.players?.value,
    genre: result.genre?.value,
    firstPlayed: result.firstPlayed?.value,
    olympic: result.olympic?.value,
    governingBody: result.governingBody?.value,
    rules: result.rules?.value,
    inventor: result.inventor?.value,
    originCountry: result.originCountry?.value,
    
    // Relaciones
    relatedGames: result.relatedGames?.value,
    notablePlayers: result.notablePlayers?.value,
    playerName: result.playerName?.value,
    
    // Enlaces
    officialWebsite: result.officialWebsite?.value,
    externalLinks: result.externalLinks?.value,
    dbpediaPage: result.dbpediaPage?.value
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