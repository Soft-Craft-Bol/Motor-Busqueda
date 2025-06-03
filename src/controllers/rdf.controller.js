const rdfService = require('../services/rdfService');

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    const results = await rdfService.searchVideoGames(q);
    res.render('search-results', {
      title: `Results for "${q}"`,
      query: q,
      games: results,
      isEmpty: results.length === 0
    });
  } catch (err) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'RDF search failed',
      error: err
    });
  }
};

exports.gameDetails = async (req, res) => {
  try {
    const { uri } = req.params;
    const decodedUri = decodeURIComponent(uri);
    const game = await rdfService.getGameDetails(decodedUri);
    res.render('game-detail', {
      title: game['http://www.w3.org/2000/01/rdf-schema#label'] || 'Game Details',
      game
    });
  } catch (err) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load game details',
      error: err
    });
  }
};
