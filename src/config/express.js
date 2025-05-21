const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

module.exports = function(app) {
  // Crear instancia de Handlebars CON helpers
  const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      // Helpers existentes
      encodeURI: function(uri) {
        return encodeURIComponent(uri);
      },
      truncate: function(str, len) {
        if (str.length > len) {
          return str.substring(0, len) + '...';
        }
        return str;
      },
      currentYear: function() {
        return new Date().getFullYear();
      },
      split: function(str, index) {
        return str.split(' ')[index];
      },
      // 🔥 Añade el helper "eq" que falta
      eq: (a, b) => a === b,  // Compara dos valores
      // Ejemplo de uso en plantillas: {{#if (eq lang 'es')}}...{{/if}}
    }
  });

  // Configurar Handlebars como motor de plantillas (USANDO la instancia con helpers)
  app.engine('hbs', hbs.engine); // 🔥 Usa "hbs.engine" aquí
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '../views'));

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../public')));
};