# Motor de Búsqueda de Juegos de mesa

## 📌 Descripción del Proyecto

Este proyecto es un motor de búsqueda especializado en juegos de mesa que utiliza datos de **DBpedia** y  nuetsra **Ontologia** (la versión estructurada de Wikipedia). Permite a los usuarios:

- 🔍 Buscar información sobre cualquier videojuego
- 🌐 Consultar datos en múltiples idiomas (español, inglés, portugués, etc.)

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: Handlebars (HTML templates) + Bootstrap
- **Consultas SPARQL**: Para extraer datos estructurados de DBpedia
- **Axios**: Para realizar peticiones HTTP a los endpoints de DBpedia
- **NLP básico**: Procesamiento de términos de búsqueda

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js (v16 o superior)
- npm (viene con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Soft-Craft-Bol/Motor-Busqueda.git
   cd Motor-Busqueda
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```
4. **Ejecutar el servidor**:
   ```bash
   node .\src\app.js
   ```

5. **Acceder a la aplicación**:
   Abre tu navegador y visita:
   ```
   http://localhost:3000
   ```

## 🌍 Uso del Sistema

### Interfaz de Búsqueda
1. Ingresa el nombre de un Juego de mesa en el campo de búsqueda
2. Selecciona un idioma (opcional, por defecto español)
3. Haz clic en "Buscar"

### Resultados
- Se mostrará la descripcion del jeugo de mesa que decidio hacer la busqueda
- Cada resultado incluye:
  - Nombre del juego
  - Descripción/abstract

## 🎮 Sobre los Videojuegos en DBpedia

El sistema busca información sobre cualquier videojuego documentado en DBpedia, que incluye:

- 🕹️ Juegos clásicos y modernos
- 📅 Fechas de lanzamiento históricas

Los datos provienen de Wikipedia pero en formato estructurado, lo que permite búsquedas más precisas y relaciones entre conceptos.
