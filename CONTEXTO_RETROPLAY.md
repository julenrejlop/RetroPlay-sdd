# CONTEXTO DEL PROYECTO: RetroPlay

> Documento de contexto integral para modelos de Inteligencia Artificial y desarrolladores.

---

## 1. Información General del Proyecto

- **Nombre del producto:** RetroPlay
- **Equipo de desarrollo:** Xan, Derek, Hugo y Julen
- **Tipo de producto:** Aplicación web multimedia accesible orientada a la tercera edad
- **Filosofía de diseño:** Máxima simplicidad, ausencia total de fricción tecnológica, navegación lineal y diseño visual adaptado a personas mayores.

---

## 2. El Problema que Resuelve

### Contexto y Necesidad
Muchas personas mayores sufren de aburrimiento, soledad y falta de actividades de ocio accesibles en su día a día. Aunque la tecnología actual ofrece catálogos infinitos de entretenimiento (Netflix, Spotify, YouTube, Prime Video), las plataformas comerciales presentan barreras infranqueables para ellos:
- **Sobrecarga cognitiva:** Interfaces repletas de carruseles infinitos, recomendaciones algorítmicas cambiantes, banners y publicidad invasiva.
- **Dificultad motriz y visual:** Fuentes pequeñas (<16 px), botones diminutos difíciles de pulsar, iconos abstractos y poco contraste visual.
- **Navegación laberíntica:** Menús de hamburguesa ocultos, navegación por gestos táctiles, barras de navegación complejas y estructuras profundas de pantallas.
- **Barreras de acceso:** Procesos de login complicados con contraseñas alfanuméricas complejas, verificación en dos pasos (2FA), emails de confirmación y formularios extensos.

---

## 3. La Solución: RetroPlay

**RetroPlay** es una plataforma web creada específicamente para personas mayores que elimina por completo la complejidad tecnológica:
1. **Acceso sencillo y sin contraseñas difíciles:** Se inicia sesión únicamente con **Nombre, Fecha de nacimiento y DNI** (sin necesidad de recordar contraseñas complejas).
2. **Recorrido en máximo 3-4 toques:** Desde el login hasta estar disfrutando de una película o canción, el usuario solo necesita 3 clics:
   `Login` → `Elegir Películas o Música` → `Elegir carátula` → `Reproducción inmediata`.
3. **Contenido nostálgico y significativo:**
   - **Películas clásicas:** Obras maestras de la época dorada (años 30 y 40 como *Tiempos modernos*, *Ahí está el detalle*, *Fíjate qué suave*), reproducidas desde YouTube sin publicidad ni distracciones.
   - **Música de su época:** Canciones icónicas de artistas familiares (como Julio Iglesias) con carátulas grandes y avance automático entre pistas.
4. **Diseño centrado en la accesibilidad (A11y):**
   - Tipografía base de al menos **24 px**.
   - Botones y controles gigantes de al menos **60 × 60 px**.
   - Colores de alto contraste: Fondo `#181A20`, texto `#F5F5F7` y avisos en amarillo accesible `#FFB703`.
   - Foco visual evidente para navegación con teclado (`outline: 4px solid #FFB703`).
   - Sin barras de menú superiores, sin menús desplegables ocultos y sin gestos.

---

## 4. Estructura y Flujo de Pantallas

La aplicación funciona mediante una máquina de estados lineal (`login` → `inicio` → `catalogo` → `reproductor`), sin recargas de página ni routers complejos:

### 1. Pantalla de Login / Registro
- Campos grandes: **Nombre**, **Fecha de nacimiento** y **DNI**.
- Botón grande **"Entrar"** y opción para alternar a **"Crear cuenta nueva"**.
- Mensaje de error exacto y comprensible en caso de fallo: *"Los datos no son correctos. Inténtelo de nuevo."*
- Si ya existe sesión previa guardada en el navegador, accede automáticamente a Inicio.

### 2. Pantalla de Inicio
- Divide la pantalla en dos grandes zonas/tarjetas:
  - 🎬 **Películas**
  - 🎵 **Música**
- En la esquina superior se ubica un botón discreto de *"Cerrar sesión"*, diseñado de forma tenue para evitar pulsaciones accidentales.

### 3. Pantalla de Catálogo
- Muestra únicamente la categoría seleccionada.
- Tarjetas con carátulas gigantes, títulos legibles y año.
- Botón grande y visible: **"← Volver"** para regresar a Inicio.
- Al pulsar cualquier tarjeta, pasa directamente a reproducirla.

### 4. Pantalla de Reproductor
- **Reproducción automática** al entrar, sin controles nativos diminutos ni barras de volumen confusas.
- **Película:** Vídeo de YouTube con botones grandes exteriores de **"Pausa / Reanudar"**, **"Ampliar / Reducir"** (el vídeo crece pero los controles nunca lo tapan) y **"Salir"** (vuelve al catálogo).
- **Música:** Carátula grande, audio en streaming local, botones de control y **avance automático** a la siguiente canción al terminar (la última canción se detiene sin reiniciar en bucle).
- En caso de fallo de red o del medio, muestra un mensaje claro y un botón *"Volver"*.

---

## 5. Arquitectura y Stack Tecnológico

El proyecto está construido bajo una arquitectura limpia, robusta y deliberadamente sencilla:

### Frontend
- **Framework:** React 18 con Vite.
- **Lenguaje:** JavaScript nativo (ES Modules), sin TypeScript.
- **Estilos:** CSS nativo (`estilos.css`) modular, sin frameworks pesados (sin Tailwind, sin Bootstrap, sin Material UI).
- **Enrutamiento:** Gestión de pantallas por estado React interno (`App.jsx`), sin `react-router`.
- **Sesión del usuario:** Se guarda exclusivamente el nombre en `localStorage` (`retroplay_usuario`). Sin cookies de terceros ni rastreadores.

### Backend
- **Entorno:** Node.js con Express 4.
- **Rutas API:**
  - `POST /api/login`: Valida nombre, fecha y DNI mediante comparación de hash.
  - `POST /api/registro`: Hashea el DNI y registra el usuario.
  - `GET /api/contenidos?tipo=pelicula|musica`: Devuelve el catálogo filtrado (valida que los medios locales existan antes de enviarlos).
- **Streaming de audio:** Servidor de medios estáticos con soporte de cabeceras `HTTP 206 Partial Content`.
- **Seguridad y Privacidad:**
  - El DNI **NUNCA** se guarda ni se transmite en texto plano; se protege con **bcryptjs** (10 rondas de salt).
  - Todas las consultas a la base de datos utilizan **parámetros preparados (`?`)** para prevenir inyecciones SQL.
  - Sin tokens JWT ni sesiones del lado del servidor.

### Base de Datos
- **Motor:** MySQL 8 en contenedor Docker oficial (`antybien_retroplay_mysql`).
- **Volumen aislado:** `antybien_retroplay_mysql_datos` para garantizar persistencia sin interferir con otros proyectos.
- **Codificación:** `utf8mb4` para admitir acentos y caracteres especiales en español.
- **Tablas:**
  - `usuarios`: `id`, `nombre`, `fecha_nacimiento`, `dni_hash` (único por nombre y fecha).
  - `contenidos`: `id`, `titulo`, `tipo`, `anio`, `archivo_portada`, `archivo_media`.

---

## 6. Puertos Asignados en el Entorno

Para evitar colisiones con servicios previamente existentes en la máquina de desarrollo:
- **MySQL (Docker):** Puerto `3309`
- **Backend API (Express):** Puerto `3001`
- **Frontend (Vite Dev):** Puerto `5174` (con proxy a `3001`)

---

## 7. Instrucciones para la Inteligencia Artificial Receptora

Cuando asistas a **Xan, Derek, Hugo y Julen** en este proyecto:
1. **Mantén la filosofía de accesibilidad extrema:** No propongas menús ocultos, barras de navegación superiores, gestos ni fuentes pequeñas.
2. **Conserva las convenciones de nombres:** Todo el código, interfaz, variables y componentes deben estar en **español** (`camelCase` en JS, `PascalCase` en React, `snake_case` en SQL).
3. **Simplicidad ante todo:** No añadas librerías de UI complejas, capas de abstracción innecesarias ni sistemas de autenticación basados en tokens/cookies.
4. **Respeto a la privacidad:** Recuerda siempre que el DNI debe tratarse como dato sensible y jamás persistirse en claro.
