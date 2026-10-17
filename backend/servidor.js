const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const rutasAutenticacion = require('./rutas/autenticacion');
const rutasContenidos = require('./rutas/contenidos');

const app = express();
const puerto = process.env.PUERTO || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos multimedia locales (música y portadas) con soporte de streaming
const rutaMedia = path.join(__dirname, 'media');
app.use('/media', express.static(rutaMedia));

// Rutas de la API
app.use('/api', rutasAutenticacion);
app.use('/api/contenidos', rutasContenidos);

// Si existe la compilación de frontend/dist, servir en producción
const rutaDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(rutaDist)) {
  app.use(express.static(rutaDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/media')) {
      return next();
    }
    res.sendFile(path.join(rutaDist, 'index.html'));
  });
}

// Iniciar servidor solo si se ejecuta directamente
if (require.main === module) {
  app.listen(puerto, () => {
    console.log(`Servidor de RetroPlay escuchando en el puerto ${puerto}`);
  });
}

module.exports = app;
