const dbpediaService = require('../services/dbpediaService');
const translationService = require('../services/translationService');

exports.home = (req, res) => {
  res.render('index', { 
    title: 'Video Game Search Engine',
    lang: req.lang || 'en'
  });
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    const lang = req.lang || 'en';
    
    let results = await dbpediaService.searchVideoGames(q, lang);
    
    if (lang !== 'en') {
      results = await Promise.all(
        results.map(game => translationService.translateResults(game, lang))
      );
    }
    
    // Para depuración - ver todos los datos recibidos
    console.log("Full results data:", JSON.stringify(results, null, 2));
    
    res.render('search-results', { 
      title: `Results for "${q}"`,
      query: q,
      games: results,
      isEmpty: results.length === 0,
      lang,
      showDetails: true // Nueva variable para la vista
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Search error',
      error,
      lang: req.lang
    });
  }
};

exports.gameDetails = async (req, res) => {
  try {
    const { uri } = req.params;
    const lang = req.lang || 'en';
    const game = await dbpediaService.getGameDetails(decodeURIComponent(uri), lang);
    
    if (!game) {
      return res.status(404).render('error', {
        title: 'Game not found',
        message: 'The requested game was not found',
        lang
      });
    }
    
    if (lang !== 'en') {
      game = await translationService.translateResults(game, lang);
    }
    
    res.render('game-detail', { 
      title: game.name,
      game,
      lang
    });
  } catch (error) {
    res.status(500).render('error', { 
      title: 'Error',
      message: 'Error loading game details',
      error,
      lang: req.lang
    });
  }
};