module.exports = {
  searchVideoGames: (term, lang = "en") => {
    if (!term || typeof term !== "string") {
      throw new Error("Invalid search term");
    }

    // Escapar comillas simples y dobles para SPARQL
    const escapedTerm = term.replace(/["']/g, match => `\\${match}`);

    return `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?label ?abstract
      WHERE {
        ?subject rdfs:label "${escapedTerm}"@${lang} ;
                 rdfs:label ?label ;
                 dbo:abstract ?abstract .
        FILTER(LANG(?abstract) = "${lang}")
      }
      LIMIT 1
    `.replace(/\s+/g, " ").trim(); // Optimización para consulta de una línea
  }
};