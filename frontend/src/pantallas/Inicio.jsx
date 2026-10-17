import React from 'react';

export default function Inicio({ usuario, alSeleccionarTipo, alCerrarSesion }) {
  return (
    <main className="pantalla-inicio">
      <header className="cabecera-inicio">
        <span className="saludo-usuario">Hola, {usuario}</span>
        <button
          type="button"
          onClick={alCerrarSesion}
          className="boton-cerrar-sesion"
          aria-label="Cerrar sesión de RetroPlay"
        >
          Cerrar sesión
        </button>
      </header>

      <h1>RetroPlay</h1>
      <p style={{ textAlign: 'center', marginBottom: '24px' }}>
        Elija qué desea ver o escuchar:
      </p>

      <div className="contenedor-categorias">
        <button
          type="button"
          className="tarjeta-categoria"
          onClick={() => alSeleccionarTipo('pelicula')}
          aria-label="Ver catálogo de Películas clásicas"
        >
          <span className="icono-categoria" aria-hidden="true">🎬</span>
          <span className="texto-categoria">Películas</span>
        </button>

        <button
          type="button"
          className="tarjeta-categoria"
          onClick={() => alSeleccionarTipo('musica')}
          aria-label="Ver catálogo de Música"
        >
          <span className="icono-categoria" aria-hidden="true">🎵</span>
          <span className="texto-categoria">Música</span>
        </button>
      </div>
    </main>
  );
}
