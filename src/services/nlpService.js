const natural = require('natural');
const normalizer = require('../utils/normalizer');

// Tokenizador y stemmer básico
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

module.exports = {
  extractKeywords: (text) => {
    const normalized = normalizer.normalizeName(text);
    const tokens = tokenizer.tokenize(normalized);
    
    return tokens
      .map(token => stemmer.stem(token.toLowerCase()))
      .filter(token => token.length > 3);
  }
};