# RetroPlay 🎬🎵

Plataforma web multimedia accesible diseñada para personas mayores, orientada a combatir el aburrimiento, la soledad y la brecha digital mediante entretenimiento nostálgico sin fricciones tecnológicas.

Desarrollada íntegramente bajo la metodología **SDD (*Spec-Driven Development*)**.

---

## 👥 Equipo de Desarrollo

- **Xan**
- **Derek**
- **Hugo**
- **Julen**

---

## 🌟 Características Principales

- **Fricción Cero:** Navegación lineal en un máximo de 3 clics desde el inicio de sesión hasta la reproducción.
- **Acceso Amigable:** Entrada mediante Nombre, Fecha de nacimiento y DNI protegido (sin contraseñas alfanuméricas complejas).
- **Accesibilidad Extrema:**
  - Tipografía base $\ge 24\text{ px}$.
  - Botones y controles gigantes $\ge 60 \times 60\text{ px}$.
  - Paleta de alto contraste ($> 15:1$): fondo oscuro `#181A20` y texto marfil `#F5F5F7`.
  - Foco visible accesible en dorado cálido (`#FFB703`).
  - Sin menús hamburguesa ocultos, sin barras de navegación superiores y sin gestos táctiles.
- **Contenido Clásico:**
  - **Películas:** Cine clásico de los años 30-40 (*Tiempos modernos*, *Ahí está el detalle*, *Fíjate qué suave*) reproducido desde YouTube con controles externos que nunca tapan el vídeo.
  - **Música:** Éxitos populares (Julio Iglesias) con carátulas grandes, audio en streaming y avance automático continuo entre canciones.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + Vite (JavaScript nativo, sin TypeScript, sin frameworks UI pesados y sin router externo).
- **Backend:** Node.js + Express (API REST, streaming HTTP 206 y protección de DNI con `bcryptjs`).
- **Base de Datos:** MySQL 8 en contenedor Docker oficial con volumen persistente y codificación `utf8mb4`.

---

## 🚀 Cómo Arrancar el Proyecto

Consulta la guía paso a paso completa y verificada en:
👉 **[ARRANCAR.md](ARRANCAR.md)**

### Resumen rápido de comandos:

```bash
# 1. Base de datos (MySQL en Docker en puerto 3309)
docker compose up -d

# 2. Backend (en puerto 3001)
cd backend
npm install
npm run sembrar
npm start

# 3. Frontend (en puerto 5174)
cd frontend
npm install
npm run dev
```

Acceso en el navegador: **`http://localhost:5174`**
- **Usuario de prueba:** Nombre: `Prueba` | Fecha: `1950-01-01` | DNI: `12345678A`

---

## 📚 Documentación del Proyecto (SDD en `sddDocs/`)

Toda la documentación metodológica se encuentra centralizada en la carpeta [`sddDocs/`](sddDocs/):
- **[sddDocs/spec.md](sddDocs/spec.md):** Especificación funcional y requisitos de producto.
- **[sddDocs/plan.md](sddDocs/plan.md):** Plan técnico, arquitectura y esquema de base de datos.
- **[sddDocs/tasks.md](sddDocs/tasks.md):** Registro de las 10 tareas completadas con criterios de aceptación.
- **[sddDocs/AGENTS.md](sddDocs/AGENTS.md):** Reglas operativas para agentes de desarrollo.
- **[sddDocs/CONTEXTO_RETROPLAY.md](sddDocs/CONTEXTO_RETROPLAY.md):** Documento de contexto integral para Inteligencias Artificiales y colaboradores.
- **[sddDocs/RETROPLAY_CONTEXTO_Y_DISENO.md](sddDocs/RETROPLAY_CONTEXTO_Y_DISENO.md):** Visión conceptual y decisiones de diseño UX/UI.
