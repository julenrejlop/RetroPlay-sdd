# tasks.md — Tareas de desarrollo

Lee `AGENTS.md`, `spec.md` y `plan.md` antes de empezar. Sigue las tareas en orden y cumple el criterio de aceptación de cada una antes de pasar a la siguiente. No marques como hecha una tarea sin comprobar el resultado indicado.

1. [x] **Inspección del proyecto y puertos** — Revisar archivos, carpetas de medios y servicios existentes. Usar puertos predeterminados libres o elegir alternativas libres sin parar procesos ajenos. Anotar los puertos elegidos para mantenerlos coherentes.
   - Hecho:
     - Puertos en conflicto detectados: MySQL 3306, 3308; API 3000; Vite 5173.
     - Puertos libres elegidos para RetroPlay:
       * MySQL: `3309` (mapeado a 3306 en contenedor Docker)
       * Backend API Express: `3001`
       * Frontend Vite: `5174`
     - Medios disponibles verificados y copiados en `backend/media/`:
       * `backend/media/musica/Julio Iglesias - Me Olvide De Vivir.mp3`
       * `backend/media/musica/Julio Iglesias - Quijote.mp3`
       * `backend/media/musica/Julio Iglesias - Spanish Girl.mp3`
       * `backend/media/portadas/portadameolvidedevivir.png`
       * `backend/media/portadas/quijotejpg.jpg` (reutilizada para Spanish Girl ya que no existe otra portada en medios locales)
       * Películas: reproducidas desde YouTube (`IS1dQU3Nsgo`, `RjRpjNBO6s4`, `kOawAA0GZkw`) con miniaturas de YouTube (`https://img.youtube.com/vi/<id>/hqdefault.jpg`).

2. [x] **Base de datos** — Crear Docker Compose, volumen aislado y SQL con tablas y catálogo descritos en `plan.md`.
   - Hecho: MySQL 8 ejecutándose en el contenedor `antybien_retroplay_mysql` en el puerto 3309 con el volumen aislado `antybien_retroplay_mysql_datos`. Ambas tablas (`usuarios`, `contenidos`) creadas y los 6 contenidos iniciales (3 películas con IDs de YouTube y 3 canciones con archivos locales) verificados.

3. [x] **Backend base y sembrado** — Crear conexión por variables de entorno, Express, archivos estáticos y script idempotente de usuario de prueba.
   - Hecho: conexión MySQL mediante pool con `.env`, Express configurado en el puerto 3001, middleware para `/media` estático y script `npm run sembrar` probado y repetido de forma idempotente (crea/actualiza usuario `Prueba` con hash bcrypt).

4. [x] **Autenticación** — Implementar login y registro con consultas preparadas y bcrypt.
   - Hecho: `POST /api/login` valida credenciales con bcrypt y consultas preparadas (éxito 200 `{ nombre }`, fallo 401 con el mensaje exacto `#FFB703`). `POST /api/registro` hashea el DNI con 10 rondas de salt (éxito 201, duplicado 409, campos vacíos 400). Todo verificado con tests automatizados.

5. [x] **Catálogo API** — Implementar `GET /api/contenidos?tipo=` con validación y URLs correctas para YouTube y medios locales.
   - Hecho: `GET /api/contenidos?tipo=pelicula` devuelve 3 películas con URLs de YouTube (reproducción y miniatura); `GET /api/contenidos?tipo=musica` devuelve 3 canciones con archivos locales y portadas verificadas en disco; y `tipo` ausente o no reconocido devuelve 400 con mensaje de error explicativo.

6. [x] **Frontend base y Login** — Crear Vite + React, proxy usando los puertos seleccionados, estado de navegación, Login y registro.
   - Hecho: aplicación Vite + React en JavaScript (sin TypeScript, sin UI kits ni router externo), proxy en puerto 5174 hacia backend 3001, navegación por estado en `App.jsx`, pantalla de Login con alternancia a registro, almacenamiento seguro en `localStorage` únicamente del nombre de usuario, estilos con fondo `#181A20`, texto `#F5F5F7`, error exacto en `#FFB703` de 24 px en negrita y botones >= 60 px.

7. [x] **Inicio y Catálogo** — Crear botones de categoría y catálogo de tarjetas con sus títulos, imágenes y botón Volver.
   - Hecho: pantalla de Inicio con dos grandes tarjetas dividiendo el espacio ("Películas" y "Música") y botón discreto para cerrar sesión. Catálogo filtrado por categoría seleccionada, mostrando carátulas grandes, títulos y botón grande "← Volver" a Inicio; al pulsar una tarjeta se abre el reproductor con el elemento seleccionado.

8. [x] **Reproductor** — Añadir vídeo de YouTube, audio local, controles grandes, ampliación de películas y avance automático de canción.
   - Hecho: reproductor de películas con iframe de YouTube incrustado (`enablejsapi=1`), botones accesibles "Pausa/Reanudar", "Ampliar/Reducir" (el contenedor se expande ocupando la mayor parte de la pantalla y los controles se mantienen fuera del vídeo sin taparlo) y "Salir". Reproductor de música con carátula grande, audio local en streaming, controles Pausa/Reanudar y avance automático a la siguiente canción al terminar (`onEnded`), deteniéndose tras la última sin reiniciar.

9. [x] **Accesibilidad y producción** — Revisar etiquetas, foco, tamaños, contraste y recorrido. Añadir construcción de producción y servir `frontend/dist` desde Express.
   - Hecho: compilación verificada con `npm run construir`, Express configurado para servir `frontend/dist` en el puerto 3001, recorrido lineal desde Login hasta Reproducción completado en solo 3 pulsaciones (máximo permitido 4), foco visible claro (`outline: 4px solid #FFB703`), contraste superior a 15:1, tipografía base >= 24 px y controles interactivos utilizables con teclado.

10. [x] **Documentación final** — Escribir `ARRANCAR.md` y `requirements.txt` según `AGENTS.md`, con los puertos realmente usados y pasos probados.
    - Hecho: `ARRANCAR.md` completado con puertos efectivos (MySQL 3309, Backend 3001, Frontend 5174/3001), credenciales del usuario de prueba (`Prueba`, `1950-01-01`, `12345678A`), comandos paso a paso probados, catálogo de medios y parada. `requirements.txt` documentado con las versiones y paquetes reales.
