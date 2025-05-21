const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

module.exports = function(app) {
  // Configuración de idiomas soportados
  const supportedLangs = {
    es: 'Español',
    en: 'English',
    pt: 'Português',
    fr: 'Français',
    de: 'Deutsch'
  };

  // Crear instancia de Handlebars con helpers para i18n
  const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      // Helper para codificación URI
      encodeURI: function(uri) {
        return encodeURIComponent(uri);
      },
      
      // Helper para truncar texto
      truncate: function(str, len) {
        if (str && str.length > len) {
          return str.substring(0, len) + '...';
        }
        return str;
      },
      
      // Helper para año actual
      currentYear: function() {
        return new Date().getFullYear();
      },
      
      // Helper para dividir strings
      split: function(str, index) {
        return str ? str.split(' ')[index] : '';
      },
      
      // Helper para comparación estricta
      eq: (a, b) => a === b,
      
      // Helper para comparación de idioma
      isLang: function(lang, options) {
        return this.lang === lang ? options.fn(this) : options.inverse(this);
      },
      
      // Helper para obtener texto traducido
      t: function(key) {
        const translations = {
          'search_placeholder': {
            es: 'Buscar videojuegos...',
            en: 'Search video games...',
            pt: 'Procurar jogos...',
            fr: 'Rechercher des jeux...',
            de: 'Spiele suchen...'
          },
          'search_button': {
            es: 'Buscar',
            en: 'Search',
            pt: 'Pesquisar',
            fr: 'Rechercher',
            de: 'Suchen'
          },
          'no_results': {
            es: 'No se encontraron resultados',
            en: 'No results found',
            pt: 'Nenhum resultado encontrado',
            fr: 'Aucun résultat trouvé',
            de: 'Keine Ergebnisse gefunden'
          }
          // Agrega más traducciones según necesites
        };
        
        const lang = this.lang || 'es';
        return translations[key]?.[lang] || key;
      },
      
      // Helper para listar idiomas soportados
      supportedLanguages: function(options) {
        return Object.entries(supportedLangs)
          .map(([code, name]) => options.fn({ code, name, current: this.lang === code }))
          .join('');
      },
      
      // Helper para formatear fechas según idioma
      formatDate: function(dateStr) {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const lang = this.lang || 'es';
        
        return date.toLocaleDateString(lang, options);
      }
    }
  });

  // Configurar Handlebars como motor de plantillas
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '../views'));

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Middleware para establecer el idioma
  app.use((req, res, next) => {
    // Obtener idioma de query param, cookie o cabecera Accept-Language
    const lang = req.query.lang || 
                 req.cookies.lang || 
                 req.acceptsLanguages(Object.keys(supportedLangs)) || 
                 'es';
    
    // Validar que el idioma esté soportado
    req.lang = supportedLangs[lang] ? lang : 'es';
    
    // Establecer el idioma en res.locals para acceso en vistas
    res.locals.lang = req.lang;
    res.locals.supportedLangs = supportedLangs;
    
    // Establecer cookie de idioma
    res.cookie('lang', req.lang, { maxAge: 900000, httpOnly: true });
    
    next();
  });
};