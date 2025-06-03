module.exports = {
  searchVideoGames: (term, lang = "es") => {
    if (!term || typeof term !== "string") {
      throw new Error("Invalid search term");
    }

    // Escapar solo comillas dobles
    const escapedTerm = term.replace(/"/g, '\\"');

    return `
      PREFIX dbo: <http://dbpedia.org/ontology/>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX dbp: <http://dbpedia.org/property/>
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>

      SELECT DISTINCT 
        ?label ?abstract ?thumbnail ?comment 
        ?equipment ?players ?genre ?firstPlayed ?olympic 
        ?governingBody ?notablePlayers ?playerName
        ?rules ?inventor ?originCountry ?relatedGames
        ?officialWebsite ?dbpediaPage ?externalLinks
      WHERE {
        ?dbpediaPage rdfs:label "${escapedTerm}"@${lang} ;
                    rdfs:label ?label ;
                    dbo:abstract ?abstract ;
                    rdfs:comment ?comment .
        
        OPTIONAL { ?dbpediaPage dbo:equipment ?equipment }
        OPTIONAL { ?dbpediaPage dbo:numberOfPlayers ?players }
        OPTIONAL { ?dbpediaPage dbo:genre ?genre }
        OPTIONAL { ?dbpediaPage dbo:firstPlayed ?firstPlayed }
        OPTIONAL { ?dbpediaPage dbo:olympic ?olympic }
        OPTIONAL { ?dbpediaPage dbo:governingBody ?governingBody }
        OPTIONAL { ?dbpediaPage dbo:rules ?rules }
        OPTIONAL { ?dbpediaPage dbo:inventor ?inventor }
        OPTIONAL { ?dbpediaPage dbo:country ?originCountry }
        OPTIONAL { ?dbpediaPage dbo:related ?relatedGames }
        OPTIONAL { 
          ?dbpediaPage dbp:notablePlayers ?notablePlayers .
          ?notablePlayers rdfs:label ?playerName .
          FILTER(LANG(?playerName) = "${lang}")
        }
        OPTIONAL { ?dbpediaPage dbo:thumbnail ?thumbnail }
        OPTIONAL { ?dbpediaPage foaf:homepage ?officialWebsite }
        OPTIONAL { ?dbpediaPage dbo:wikiPageExternalLink ?externalLinks }
        
        FILTER(LANG(?abstract) = "${lang}")
        FILTER(LANG(?label) = "${lang}")
        FILTER(LANG(?comment) = "${lang}")
      }
      LIMIT 1
    `;
  }
};