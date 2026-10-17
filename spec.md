# spec.md — Especificación del producto

## Objetivo
Crear RetroPlay, una web lineal y sencilla para que personas mayores puedan iniciar sesión, elegir Películas o Música, seleccionar una carátula grande y reproducir el contenido.

## Contenido inicial
Tres películas clásicas disponibles como vídeos completos en YouTube:

- *Tiempos modernos* (1936), vídeo `IS1dQU3Nsgo`.
- *Ahí está el detalle* (1940), vídeo `RjRpjNBO6s4`.
- *Fíjate qué suave* (1948), vídeo `kOawAA0GZkw`.

Usa sus miniaturas de YouTube. La reproducción y las miniaturas dependen de que YouTube mantenga disponibles esos vídeos y permita su inserción.

El catálogo musical tiene tres canciones independientes, con archivos locales suministrados por el usuario. Antes de implementar, inspecciona los archivos existentes. En el proyecto de referencia los nombres son `Julio Iglesias - Me Olvide De Vivir.mp3`, `Julio Iglesias - Quijote.mp3` y `Julio Iglesias - Spanish Girl.mp3`, con portadas en `media/portadas/`. No inventes ni generes medios ausentes.

## Pantallas y comportamiento

### 1. Login y registro
- Campos grandes: Nombre, Fecha de nacimiento y DNI.
- Botón grande "Entrar".
- Si falla el login, mostrar exactamente: "Los datos no son correctos. Inténtelo de nuevo." en `#FFB703`, negrita, 24 px.
- "Crear cuenta nueva" alterna al registro con los mismos campos. Al crear cuenta, almacenar el DNI con bcrypt y entrar directamente.
- Si existe `retroplay_usuario` en `localStorage`, ir directamente a Inicio.

### 2. Inicio
- Dos botones grandes que dividen el espacio: "Películas" y "Música".
- Botón "Cerrar sesión" discreto en una esquina; al pulsarlo elimina `retroplay_usuario` y vuelve al Login.

### 3. Catálogo
- Mostrar solo el tipo seleccionado, con miniaturas/carátulas grandes y el título debajo.
- Botón grande "Volver" a Inicio.
- Al seleccionar una tarjeta, abrir el reproductor correspondiente.
- No mostrar tarjetas con archivos locales ausentes. Las películas usan sus vídeos y miniaturas de YouTube.

### 4. Reproductor
- Película: vídeo incrustado de YouTube. Canción: portada grande y audio local.
- Reproducción automática al entrar; sin controles nativos, volumen ni barra de progreso.
- Botones grandes "Pausa"/"Reanudar" y "Salir". "Salir" vuelve al catálogo.
- Para películas, botón "Ampliar"/"Reducir". El vídeo debe ocupar la mayor parte de la pantalla; los controles permanecen visibles fuera del vídeo y nunca lo tapan.
- Al terminar una canción, comenzar la siguiente del catálogo. Tras la última, detenerse sin volver al principio.
- Si el medio falla, mostrar un mensaje sencillo y un botón "Volver".

## Requisitos funcionales
- REQ-01 Login correcto lleva a Inicio; incorrecto enseña el mensaje especificado.
- REQ-02 Se puede crear una cuenta con nombre, nacimiento y DNI hasheado.
- REQ-03 La sesión se guarda únicamente en `localStorage` y se elimina al cerrar sesión.
- REQ-04 Inicio ofrece Películas y Música.
- REQ-05 Catálogo filtra por categoría y abre el elemento elegido.
- REQ-06 El reproductor inicia el medio y permite Pausa/Reanudar y Salir.
- REQ-07 Las películas permiten ampliar/reducir sin cubrir la imagen con controles.
- REQ-08 Al terminar una canción empieza la siguiente; la última se detiene.
- REQ-09 Si la reproducción no puede iniciarse, se ofrece un mensaje y Volver.

## Requisitos de calidad y accesibilidad
- Contraste mínimo 4,5:1 con fondo `#181A20` y texto `#F5F5F7`.
- Texto de interfaz de al menos 24 px; botones de al menos 60 × 60 px, salvo el botón discreto de cerrar sesión.
- Foco visible, `aria-label` o etiqueta equivalente clara en elementos interactivos.
- Sin navegación oculta ni interacción por gestos.
- Desde Login, el recorrido hasta iniciar reproducción debe requerir como máximo cuatro pulsaciones.
- El DNI nunca se guarda en claro. No hay sesiones ni tokens del lado servidor.

## Fuera de alcance
Búsqueda, volumen, foros, voz, pagos, modo familiar, favoritos, listas, paginación, subida de archivos y analíticas.
