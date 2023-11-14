const express = require('express');
const axios = require('axios');
const app = express();
const port = 80;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.use(express.static('node_modules/bootstrap/dist'));
const apiEndpoint = process.env.API_ENDPOINT || "http://api:5000/api/movies";

// Ruta principal
app.get('/', async (req, res) => {
  try {
    // Hacer una solicitud a la API de Flask
    const response = await axios.get(apiEndpoint + 'movies');
    
    // Renderizar la vista con los datos de la API
    res.render('index', { movies: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener datos de la API');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
