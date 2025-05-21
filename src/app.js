const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config/express');
const routes = require('./routes/web.route');
//const apiRoutes = require('./routes/api');
const languageMiddleware = require('./middleware/language');


const app = express();

// Middlewares
app.use(cookieParser());
app.use(languageMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
// Configuración
config(app);

// Rutas
app.use('/', routes);
//app.use('/api', apiRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});