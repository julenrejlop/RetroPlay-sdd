const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../conexion');

const enrutador = express.Router();

// POST /api/login: valida credenciales y devuelve { nombre }
enrutador.post('/login', async (req, res) => {
  try {
    const { nombre, fechaNacimiento, dni } = req.body;

    if (!nombre || !fechaNacimiento || !dni) {
      return res.status(401).json({ mensaje: 'Los datos no son correctos. Inténtelo de nuevo.' });
    }

    const consulta = 'SELECT id, nombre, fecha_nacimiento, dni_hash FROM usuarios WHERE nombre = ? AND fecha_nacimiento = ?';
    const [filas] = await pool.execute(consulta, [nombre.trim(), fechaNacimiento.trim()]);

    if (filas.length === 0) {
      return res.status(401).json({ mensaje: 'Los datos no son correctos. Inténtelo de nuevo.' });
    }

    const usuario = filas[0];
    const dniCoincide = await bcrypt.compare(dni.trim(), usuario.dni_hash);

    if (!dniCoincide) {
      return res.status(401).json({ mensaje: 'Los datos no son correctos. Inténtelo de nuevo.' });
    }

    // Login correcto
    return res.json({ nombre: usuario.nombre });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
});

// POST /api/registro: registra nuevo usuario con DNI hasheado
enrutador.post('/registro', async (req, res) => {
  try {
    const { nombre, fechaNacimiento, dni } = req.body;

    if (!nombre || !fechaNacimiento || !dni) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nombreLimpio = nombre.trim();
    const fechaLimpia = fechaNacimiento.trim();
    const dniLimpio = dni.trim();

    if (!nombreLimpio || !fechaLimpia || !dniLimpio) {
      return res.status(400).json({ error: 'Todos los campos deben contener texto válido.' });
    }

    // Hashear DNI con bcrypt (nunca guardar en claro)
    const dniHash = await bcrypt.hash(dniLimpio, 10);

    const consulta = 'INSERT INTO usuarios (nombre, fecha_nacimiento, dni_hash) VALUES (?, ?, ?)';
    try {
      await pool.execute(consulta, [nombreLimpio, fechaLimpia, dniHash]);
      return res.status(201).json({ nombre: nombreLimpio });
    } catch (dbError) {
      // Clave duplicada: ER_DUP_ENTRY
      if (dbError.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Ya existe una cuenta con ese nombre y fecha de nacimiento.' });
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = enrutador;
