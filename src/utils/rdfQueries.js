module.exports = {
  searchVideoGames: (term) => {
    return {
      namePredicate: 'http://www.w3.org/2000/01/rdf-schema#label',
      matchTerm: term
    };
  }
};
