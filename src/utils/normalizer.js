/**
 * Normaliza nombres para búsquedas consistentes
 */
module.exports = {
  /**
   * Normaliza nombres de juegos, desarrolladores, etc.
   * Ejemplo: "The_Witcher_3" → "the witcher 3"
   */
  normalizeName: (name) => {
    if (!name) return '';
    
    return name
      .replace(/_/g, ' ')                // Reemplaza guiones bajos
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Separa camelCase
      .replace(/[^\w\sáéíóúñü]/gi, '')    // Elimina caracteres especiales
      .toLowerCase()                     // A minúsculas
      .trim();                           // Elimina espacios al inicio/fin
  },

  /**
   * Normaliza URIs de DBpedia para obtener identificadores consistentes
   * Ejemplo: "http://dbpedia.org/resource/The_Witcher_3" → "the witcher 3"
   */
  normalizeUri: (uri) => {
    if (!uri) return '';
    
    return this.normalizeName(
      uri.replace(/^.*\/resource\//, '') // Elimina la parte inicial de la URI
    );
  },

  /**
   * Reconstruye URIs a partir de nombres normalizados
   * Ejemplo: "the witcher 3" → "http://dbpedia.org/resource/The_Witcher_3"
   */
  denormalizeToUri: (normalized, lang = 'en') => {
    if (!normalized) return '';
    
    const baseUri = lang === 'en' 
      ? 'http://dbpedia.org/resource/'
      : `http://${lang}.dbpedia.org/resource/`;
      
    return baseUri + normalized
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('_');
  },

  /**
   * Normaliza texto para comparaciones (elimina artículos, etc.)
   */
  normalizeForComparison: (text) => {
    return this.normalizeName(text)
      .replace(/^(the|a|an|el|la|los|las|der|die|das|le|les)\s+/i, '');
  }
};