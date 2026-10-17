const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mysql = require('mysql2/promise');

// Pool de conexiones a MySQL usando variables de entorno
const pool = mysql.createPool({
  host: process.env.BD_HOST || 'localhost',
  port: Number(process.env.BD_PUERTO) || 3309,
  user: process.env.BD_USUARIO || 'retroplay',
  password: process.env.BD_CONTRASENA || 'retroplay_pass',
  database: process.env.BD_NOMBRE || 'retroplay',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
