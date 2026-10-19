# RetroPlay — Visión de Producto, Contexto y Diseño UX/UI

> Documento de diseño de experiencia y contexto conceptual para creadores, diseñadores y modelos de Inteligencia Artificial.

---

## 1. Identidad del Producto

- **Nombre:** RetroPlay
- **Equipo creador:** Xan, Derek, Hugo y Julen
- **Público objetivo:** Personas mayores / Tercera edad
- **Misión:** Acabar con el aburrimiento, la soledad y la exclusión tecnológica de nuestros mayores a través del entretenimiento clásico y un diseño humano sin barreras.

---

## 2. El Problema Humano que Resuelve

### Soledad y Aburrimiento en la Tercera Edad
Nuestros mayores pasan muchas horas en casa con escasas opciones de entretenimiento adaptadas a ellos. Aunque la tecnología actual ofrece catálogos infinitos de entretenimiento (Netflix, Spotify, YouTube, Prime Video), las plataformas comerciales presentan barreras infranqueables para ellos:
- **Letras diminutas:** Textos microscópicos pensados para jóvenes que obligan a forzar la vista o buscar gafas.
- **Botones pequeños e imprecisos:** Controles minúsculos que resultan frustrantes para manos con pérdida de motricidad fina, artritis o pulso tembloroso.
- **Sobrecarga de opciones y laberintos:** Cientos de portadas, menús de hamburguesa ocultos, barras de navegación infinitas y gestos táctiles complejos que provocan el constante "miedo a tocar donde no es y romper algo".
- **Contraseñas y accesos hostiles:** La obligación de recordar claves con mayúsculas, números y símbolos, o verificar códigos por SMS, hace que dependan siempre de otra persona para encender la televisión o la tablet.

---

## 3. La Solución y Propuesta de Valor: RetroPlay

**RetroPlay** reinventa la forma en que una persona mayor interactúa con una pantalla:
- **Cero curvas de aprendizaje:** La interfaz es tan intuitiva que un abuelo que nunca ha usado un ordenador puede utilizarla sin pedir ayuda.
- **Nostalgia reconfortante:** Contenidos de su juventud (cine clásico de los años 30-40 y grandes éxitos de la música popular como Julio Iglesias) que despiertan recuerdos felices y conversación.
- **La regla de las 3 pulsaciones:** Desde que abren la aplicación hasta que la película o canción está sonando en pantalla solo hay 3 toques sencillos y lineales:
  1. *Tocar para entrar*
  2. *Tocar Películas o Música*
  3. *Tocar la carátula elegida* (y la reproducción empieza al instante)

---

## 4. Filosofía y Principios de Diseño UX (Experiencia de Usuario)

1. **Visibilidad Absoluta (Sin elementos ocultos):**
   - Nada de menús hamburguesa, menús desplegables, pestañas ocultas ni navegación por gestos de deslizar (*swipe*).
   - Todo lo que se puede hacer está a la vista con botones claros y explícitos.
2. **Acceso Familiar y Seguro:**
   - La persona accede introduciendo su **Nombre**, su **Fecha de nacimiento** y su **DNI**.
   - No hay que inventar ni memorizar contraseñas complejas.
3. **Tolerancia y Lenguaje Empático:**
   - Si los datos no coinciden, jamás se muestran mensajes técnicos o intimidantes (como "Error 401" o "Bad Request"). Se muestra un mensaje humano, grande y comprensible: *"Los datos no son correctos. Inténtelo de nuevo."*
4. **Diseño a prueba de pulsaciones erróneas:**
   - El botón de "Cerrar sesión" se sitúa en una esquina y con un diseño deliberadamente discreto y tenue, para que el usuario no lo pulse por equivocación mientras navega.

---

## 5. Sistema de Diseño Visual (UI y Ergonomía)

### Paleta de Colores y Contraste
Diseñada para evitar el cansancio visual, maximizar la legibilidad y cumplir con los más altos estándares de accesibilidad:
- **Fondo de pantalla (`#181A20`):** Tono grafito muy oscuro que reduce el deslumbramiento en la vista y descansa los ojos frente a pantallas brillantes.
- **Texto y elementos primarios (`#F5F5F7`):** Blanco marfil suave con un ratio de contraste superior a 15:1 sobre el fondo, permitiendo leer sin esfuerzo.
- **Color de atención y aviso (`#FFB703`):** Amarillo cálido de alta visibilidad para destacar errores, mensajes importantes y el foco de navegación.

### Tipografía y Legibilidad
- **Texto base gigante:** Mínimo **24 px** en toda la aplicación (titulares entre 32 px y 40 px).
- Familias tipográficas sin serifa, limpias, de trazo claro y peso visual rotundo.
- Interlineado generoso para evitar que los renglones se mezclen visualmente.

### Ergonomía de Controles y Botones
- **Dimensiones generosas:** Controles interactivos con tamaño mínimo de **60 × 60 px** (campos de formulario de 60 px de alto y botones de 64 px de alto).
- **Esquinas redondeadas y áreas de toque amplias:** Fáciles de pulsar tanto en pantallas táctiles (tablets) como con el cursor del ratón.
- **Foco visual reforzado:** Contorno dorado grueso de 4 px para que una persona que utilice el teclado o un dispositivo adaptado vea con total claridad dónde está situado en cada segundo.

---

## 6. Experiencia de las 4 Pantallas

```text
[ 1. ACCESO ]  ───>  [ 2. INICIO ]  ───>  [ 3. CATÁLOGO ]  ───>  [ 4. REPRODUCTOR ]
 Nombre + DNI         Películas / Música    Carátulas grandes      Vídeo o Audio
```

### Pantalla 1: Bienvenida y Acceso
- Formulario limpio, centrado y ordenado verticalmente.
- Tres campos claros: Nombre, Fecha de nacimiento y DNI.
- Botón principal de entrada grande y botón secundario para quien necesite registrarse por primera vez.

### Pantalla 2: Inicio (Decisión Clara)
- Dos mundos claramente diferenciados que ocupan la mayor parte de la pantalla:
  - 🎬 **Películas** (con icono ilustrativo grande y tipografía destacada).
  - 🎵 **Música** (con icono de nota musical).
- Arriba, saludo cercano (*"Hola, [Nombre]"*) y el botón sutil de cierre de sesión.

### Pantalla 3: Catálogo (Elección Visual)
- Botón muy visible en la esquina: **"← Volver"** para dar tranquilidad y permitir regresar siempre que se quiera.
- Cuadrícula espaciosa de tarjetas tipo cartelera de cine o portada de vinilo.
- Cada tarjeta contiene la imagen a gran tamaño, el título en letra grande y el año.

### Pantalla 4: Reproductor (Disfrute sin Obstáculos)
- **Inicio inmediato:** El contenido arranca automáticamente al entrar; no hay botones de "Play" perdidos ni barras de reproducción confusas.
- **Vídeo (Cine):**
  - El vídeo toma el protagonismo central.
  - Botones exteriores grandes: **Pausa / Reanudar**, **Ampliar / Reducir** y **Salir**.
  - Los botones **nunca tapan la película**, manteniéndose siempre accesibles fuera del área de visualización.
- **Audio (Música):**
  - Muestra la portada del álbum como si fuera un tocadiscos en la sala.
  - Reproducción continua inteligente: al terminar una canción, salta automáticamente a la siguiente del álbum; al terminar la última, se detiene suavemente sin reiniciar de golpe.

---

## 7. Mensaje Clave para Colaboradores y Diseñadores

> *"Cuando pienses en RetroPlay, no pienses en una aplicación informática: piensa en el tocadiscos o el televisor de tubo que tus abuelos sabían encender y disfrutar sin miedo. Toda decisión de diseño debe priorizar la calma, la claridad visual y la autonomía de la persona mayor."*
