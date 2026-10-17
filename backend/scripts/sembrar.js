const bcrypt = require('bcryptjs');
const pool = require('../conexion');

async function sembrar() {
  try {
    const nombre = 'Prueba';
    const fechaNacimiento = '1950-01-01';
    const dniEnClaro = '12345678A';

    // Hashear DNI con bcrypt (10 rondas de salt)
    const dniHash = await bcrypt.hash(dniEnClaro, 10);

    // Insertar o actualizar de forma idempotente
    const consulta = `
      INSERT INTO usuarios (nombre, fecha_nacimiento, dni_hash)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE dni_hash = VALUES(dni_hash)
    `;

    await pool.execute(consulta, [nombre, fechaNacimiento, dniHash]);
    console.log('Usuario de prueba sembrado correctamente.');
  } catch (error) {
    console.error('Error al sembrar usuario de prueba:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

sembrar();
