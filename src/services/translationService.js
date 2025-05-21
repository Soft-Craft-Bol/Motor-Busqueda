const { translate } = require('@vitalets/google-translate-api');

class TranslationService {
  async translateText(text, targetLang, sourceLang = 'es') {
    try {
      const result = await translate(text, { 
        to: targetLang,
        from: sourceLang 
      });
      return result.text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }

  async translateResults(results, targetLang) {
    if (targetLang === 'es') return results;
    
    const translated = { ...results };
    const fieldsToTranslate = ['abstract', 'genre', 'platform'];
    
    for (const field of fieldsToTranslate) {
      if (translated[field]) {
        translated[field] = await this.translateText(translated[field], targetLang);
      }
    }
    
    return translated;
  }
}

module.exports = new TranslationService();