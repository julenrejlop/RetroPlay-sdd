SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  dni_hash VARCHAR(255) NOT NULL,
  UNIQUE KEY usuario_unico (nombre, fecha_nacimiento)
);

CREATE TABLE IF NOT EXISTS contenidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  tipo ENUM('pelicula', 'musica') NOT NULL,
  anio INT,
  archivo_portada VARCHAR(150) NOT NULL,
  archivo_media VARCHAR(150) NOT NULL
);

INSERT INTO contenidos (titulo, tipo, anio, archivo_portada, archivo_media)
SELECT datos.titulo, datos.tipo, datos.anio, datos.archivo_portada, datos.archivo_media
FROM (
  SELECT 'Tiempos modernos' AS titulo, 'pelicula' AS tipo, 1936 AS anio, 'youtube' AS archivo_portada, 'IS1dQU3Nsgo' AS archivo_media
  UNION ALL SELECT 'Ahí está el detalle', 'pelicula', 1940, 'youtube', 'RjRpjNBO6s4'
  UNION ALL SELECT 'Fíjate qué suave', 'pelicula', 1948, 'youtube', 'kOawAA0GZkw'
  UNION ALL SELECT 'Me olvidé de vivir', 'musica', 1978, 'portadameolvidedevivir.png', 'Julio Iglesias - Me Olvide De Vivir.mp3'
  UNION ALL SELECT 'Quijote', 'musica', 1982, 'quijotejpg.jpg', 'Julio Iglesias - Quijote.mp3'
  UNION ALL SELECT 'Spanish Girl', 'musica', 1970, 'portadameolvidedevivir.png', 'Julio Iglesias - Spanish Girl.mp3'
) AS datos
WHERE NOT EXISTS (
  SELECT 1 FROM contenidos existente
  WHERE existente.tipo = datos.tipo AND existente.archivo_media = datos.archivo_media
);
