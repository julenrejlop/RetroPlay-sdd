# Instrucciones para el agente

## Objetivo
Desarrolla RetroPlay según `spec.md`, `plan.md` y `tasks.md`. Antes de programar, lee los tres documentos y revisa los archivos y medios que ya existan en el proyecto. Sigue las tareas en orden y no marques una tarea completada sin cumplir su criterio de aceptación.

## Alcance y stack
- Aplicación sencilla para personas mayores: Login → Inicio → Catálogo → Reproductor.
- Frontend: React + Vite, JavaScript, sin TypeScript, sin librerías de UI y sin react-router.
- Backend: Node.js + Express. Datos: MySQL 8 en Docker. Hash de DNI: bcryptjs.
- No añadas funciones fuera de `spec.md`.

## Idioma y convenciones
- Interfaz, nombres de variables, funciones, rutas API, componentes, tablas y campos en español.
- JavaScript `camelCase`, columnas SQL `snake_case`, componentes React `PascalCase`.
- Comentarios breves en español. Soluciones simples; no añadas capas o patrones innecesarios.
- Toda consulta SQL debe usar parámetros preparados (`?`).

## Accesibilidad
- No uses menús ocultos, barra superior de navegación ni gestos.
- Texto base de al menos 24 px; controles de al menos 60 × 60 px.
- Colores: fondo `#181A20`, texto `#F5F5F7`, error `#FFB703` en negrita y 24 px.
- Añade etiquetas accesibles claras y foco visible.
- Única excepción: el botón discreto "Cerrar sesión" de Inicio puede ser pequeño y tenue.

## Puertos y arranque
- Usa por defecto MySQL `3306`, API `3000` y Vite `5173`.
- Antes de arrancar, comprueba si esos puertos están libres. Si alguno está ocupado, no detengas ni reemplaces el servicio que lo usa: elige otro puerto libre para RetroPlay.
- Mantén coherentes el puerto publicado por Docker, `.env` del backend, proxy de Vite y cualquier configuración que lo necesite.
- Al terminar, escribe `ARRANCAR.md` con los puertos elegidos realmente, los comandos completos, directorios de ejecución, URL de la web, credenciales de prueba y cualquier requisito de medios.
- `requirements.txt` debe enumerar los requisitos reales necesarios para arrancar el proyecto terminado. Al comienzo está vacío deliberadamente; complétalo al finalizar.

## Privacidad
- Solo persiste nombre, fecha de nacimiento y hash bcrypt del DNI. Nunca guardes el DNI en claro.
- No añadas analíticas, cookies, sesiones, tokens ni transferencias de datos personales a terceros.
- La sesión se recuerda solo en el navegador mediante el nombre en `localStorage`.

## Medios
- Inspecciona los medios disponibles antes de escribir el catálogo. No inventes archivos que no existan.
- Las películas indicadas en `spec.md` se reproducen desde YouTube; las canciones usan archivos locales si están disponibles. Anota en `ARRANCAR.md` cualquier medio que deba aportar el usuario.
