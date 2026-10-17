# plan.md — Plan de implementación

## Stack y estructura
- React + Vite en JavaScript, sin TypeScript, UI kits ni react-router.
- Node.js + Express, MySQL 8 en Docker y bcryptjs.
- Código en español según las convenciones de `AGENTS.md`.

```text
proyecto/
├── AGENTS.md
├── spec.md
├── plan.md
├── tasks.md
├── ARRANCAR.md          # Lo escribe el agente al terminar
├── requirements.txt     # Vacío al inicio; lo completa el agente al terminar
├── docker-compose.yml
├── base_de_datos/inicio.sql
├── backend/
│   ├── .env
│   ├── package.json
│   ├── servidor.js
│   ├── conexion.js
│   ├── rutas/autenticacion.js
│   ├── rutas/contenidos.js
│   ├── scripts/sembrar.js
│   └── media/musica/ y media/portadas/
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── estilos.css
        └── pantallas/ (Login, Inicio, Catalogo, Reproductor)
```

## Puertos
Valores predeterminados: MySQL `3306`, API `3000`, Vite `5173`. Comprueba disponibilidad antes de iniciar. Si un puerto predeterminado está ocupado, deja intacto el proceso existente, escoge un puerto libre para RetroPlay y actualiza todas las configuraciones relacionadas (Docker, `.env`, proxy de Vite y comandos). Registra los puertos efectivos en `ARRANCAR.md`.

## Base de datos
MySQL 8 crea la base `retroplay` y las tablas `usuarios` y `contenidos`. El SQL inicial añade las películas y metadatos de canciones según `spec.md`. Usuario y fecha identifican una cuenta; `dni_hash` guarda solo el hash bcrypt. Usa un volumen persistente con nombre propio del proyecto para no compartir datos con otros servicios.

Películas: guarda el ID de YouTube en `archivo_media` y usa `archivo_portada='youtube'`. Construye la URL de reproducción incrustada y la URL de miniatura desde ese ID. Canciones: `archivo_media` y `archivo_portada` deben corresponder a archivos existentes en `backend/media/`.

El SQL de inicialización se ejecuta solo al crear un volumen vacío. Documenta en `ARRANCAR.md` cómo inicializar o reiniciar la base sin eliminar volúmenes de otros proyectos.

## Backend
Dependencias: `express`, `mysql2`, `bcryptjs`, `cors`, `dotenv`; desarrollo con `nodemon`.

- Lee las credenciales y puertos desde `.env`; no codifiques el puerto de MySQL en varias partes.
- `POST /api/login`: busca usuario por nombre y fecha, compara el DNI recibido con bcrypt y responde `{ nombre }` o 401.
- `POST /api/registro`: valida campos, hashea el DNI, inserta la cuenta; 400 si faltan datos, 409 si ya existe.
- `GET /api/contenidos?tipo=pelicula|musica`: valida tipo y devuelve `{ id, titulo, tipo, anio, urlPortada, urlMedia }`.
- Sirve medios locales bajo `/media` con soporte de streaming.
- No implementa sesión, cookies ni tokens.
- En producción, sirve `frontend/dist` si existe.

El sembrado crea o reemplaza de forma idempotente el usuario de prueba: `Prueba`, `1950-01-01`, DNI `12345678A`. Nunca imprime ni almacena el DNI en claro en la base de datos.

## Frontend
- Proxy de `/api` y `/media` a la dirección y puerto reales del backend.
- `App.jsx` gestiona las cuatro pantallas con estado y guarda solo el nombre en `localStorage`.
- Login alterna entre entrar y registro.
- Catálogo consume la API y muestra tarjetas grandes.
- Reproductor de YouTube usa iframe API para pausa/reanudación; el modo ampliado redimensiona el iframe sin cubrirlo con botones.
- Reproductor musical usa `<audio autoPlay>` y el evento `ended` para seleccionar la siguiente canción.

## Documentación de cierre
Al finalizar la implementación, el agente crea `ARRANCAR.md` específico del proyecto terminado: requisitos, puertos efectivos, instalación, arranque de Docker, backend y frontend, URL, usuario de prueba, contenido externo/local y parada de servicios. También completa `requirements.txt` con versiones o mínimos reales de herramientas y dependencias necesarios. Ambos archivos quedan vacíos al comenzar el desarrollo.
