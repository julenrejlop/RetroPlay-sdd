# ARRANCAR.md — Guía de arranque y uso de RetroPlay

Esta guía detalla los pasos verificados para levantar y utilizar el proyecto RetroPlay.

---

## 1. Puertos asignados

Durante la inspección inicial se detectó que los puertos predeterminados (MySQL `3306`/`3308`, API `3000` y Vite `5173`) estaban en uso por otros servicios del sistema. Siguiendo las directivas de `AGENTS.md`, se eligieron puertos libres alternativos para evitar conflictos:

| Servicio | Puerto en RetroPlay | Descripción |
| :--- | :--- | :--- |
| **MySQL 8** (Docker) | `3309` | Mapeado en Docker al puerto interno `3306` |
| **Backend API** (Express) | `3001` | Servidor Node.js con API REST y streaming de medios |
| **Frontend Web** (Vite Dev) | `5174` | Servidor de desarrollo con proxy a la API |
| **Frontend Web** (Producción) | `3001` | Servido directamente por Express desde `frontend/dist` |

---

## 2. Requisitos previos

- **Docker Desktop** activo y funcionando.
- **Node.js** >= 18.0.0 (probado con v24.15.0).
- **npm** >= 9.0.0 (probado con v11.12.1).
- Conexión a Internet para la carga de vídeos y miniaturas de YouTube.

---

## 3. Credenciales de prueba

Para acceder a la aplicación existe un usuario de prueba precargado:

- **Nombre:** `Prueba`
- **Fecha de nacimiento:** `1950-01-01`
- **DNI:** `12345678A`

*(También puede usar la opción **"Crear cuenta nueva"** desde la pantalla de login para registrar cualquier otro usuario).*

---

## 4. Pasos completos de arranque

### Paso 1: Iniciar la base de datos (MySQL 8 en Docker)
En la raíz del proyecto (`o:\Proyecto\antybien-retroplay`):

```bash
docker compose up -d
```

> **Nota:** El contenedor se llama `antybien_retroplay_mysql` y utiliza un volumen persistente aislado denominado `antybien_retroplay_mysql_datos`. Para reiniciar la base de datos desde cero sin afectar a otros proyectos del sistema, ejecute:
> ```bash
> docker compose down -v
> docker compose up -d
> ```

---

### Paso 2: Sembrar datos y arrancar el Backend
Abra un terminal en la carpeta `backend`:

```bash
cd backend
npm install
npm run sembrar
npm start
```
*(Para modo desarrollo con recarga automática, use `npm run dev`).*

El servidor Express arrancará en: **`http://localhost:3001`**

---

### Paso 3: Arrancar el Frontend

#### Opción A: Modo Desarrollo con Vite (Recomendado para pruebas dinámicas)
Abra otro terminal en la carpeta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Abra el navegador en: **`http://localhost:5174`**

#### Opción B: Modo Producción
Si se desea servir la versión final optimizada:

```bash
cd frontend
npm run construir
```

Una vez construido, el propio backend sirve la aplicación completa en:
**`http://localhost:3001`**

---

## 5. Medios disponibles y catálogo

### Películas (YouTube)
Se reproducen directamente desde YouTube mediante inserción (`iframe` con API JavaScript habilitada):
1. **Tiempos modernos** (1936) — Vídeo `IS1dQU3Nsgo`
2. **Ahí está el detalle** (1940) — Vídeo `RjRpjNBO6s4`
3. **Fíjate qué suave** (1948) — Vídeo `kOawAA0GZkw`

### Música (Archivos locales)
Se encuentran en `backend/media/` con soporte de streaming:
1. **Me olvidé de vivir** (1978) — `musica/Julio Iglesias - Me Olvide De Vivir.mp3` | Portada: `portadas/portadameolvidedevivir.png`
2. **Quijote** (1982) — `musica/Julio Iglesias - Quijote.mp3` | Portada: `portadas/quijotejpg.jpg`
3. **Spanish Girl** (1970) — `musica/Julio Iglesias - Spanish Girl.mp3` | Portada: `portadas/portadameolvidedevivir.png`

---

## 6. Cómo detener los servicios

- **Frontend / Backend:** Pulse `Ctrl + C` en sus respectivas terminales.
- **Docker:** En la raíz del proyecto, ejecute `docker compose stop` (o `docker compose down` si desea retirar los contenedores).
