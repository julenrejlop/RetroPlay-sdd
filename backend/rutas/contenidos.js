const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../conexion');

const enrutador = express.Router();

// GET /api/contenidos?tipo=pelicula|musica
enrutador.get('/', async (req, res) => {
  try {
    const { tipo } = req.query;

    if (!tipo || (tipo !== 'pelicula' && tipo !== 'musica')) {
      return res.status(400).json({ error: 'Tipo de contenido no válido o ausente. Debe ser "pelicula" o "musica".' });
    }

    const consulta = 'SELECT id, titulo, tipo, anio, archivo_portada, archivo_media FROM contenidos WHERE tipo = ? ORDER BY id ASC';
    const [filas] = await pool.execute(consulta, [tipo]);

    const rutaBaseMusica = path.join(__dirname, '..', 'media', 'musica');
    const rutaBasePortadas = path.join(__dirname, '..', 'media', 'portadas');

    const listaFormateada = [];

    for (const item of filas) {
      if (item.tipo === 'pelicula') {
        listaFormateada.push({
          id: item.id,
          titulo: item.titulo,
          tipo: item.tipo,
          anio: item.anio,
          urlPortada: `https://img.youtube.com/vi/${item.archivo_media}/hqdefault.jpg`,
          urlMedia: `https://www.youtube.com/embed/${item.archivo_media}?enablejsapi=1&autoplay=1`
        });
      } else if (item.tipo === 'musica') {
        const rutaArchivoAudio = path.join(rutaBaseMusica, item.archivo_media);
        const rutaArchivoPortada = path.join(rutaBasePortadas, item.archivo_portada);

        // Si los medios locales no existen en disco, no se muestran (según spec.md)
        if (fs.existsSync(rutaArchivoAudio) && fs.existsSync(rutaArchivoPortada)) {
          listaFormateada.push({
            id: item.id,
            titulo: item.titulo,
            tipo: item.tipo,
            anio: item.anio,
            urlPortada: `/media/portadas/${encodeURIComponent(item.archivo_portada)}`,
            urlMedia: `/media/musica/${encodeURIComponent(item.archivo_media)}`
          });
        }
      }
    }

    return res.json(listaFormateada);
  } catch (error) {
    console.error('Error al obtener contenidos:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = enrutador;
