import React, { useState, useEffect } from 'react';

export default function Catalogo({ tipo, alSeleccionarContenido, alVolver }) {
  const [contenidos, setContenidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const tituloSeccion = tipo === 'pelicula' ? 'Películas' : 'Música';

  useEffect(() => {
    let montado = true;
    setCargando(true);
    setError('');

    fetch(`/api/contenidos?tipo=${tipo}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar los contenidos');
        }
        return res.json();
      })
      .then((datos) => {
        if (montado) {
          setContenidos(datos);
          setCargando(false);
        }
      })
      .catch((err) => {
        if (montado) {
          setError('No se pudieron cargar los contenidos. Inténtelo más tarde.');
          setCargando(false);
        }
      });

    return () => {
      montado = false;
    };
  }, [tipo]);

  return (
    <main className="pantalla-catalogo">
      <div className="barra-superior-catalogo">
        <button
          type="button"
          onClick={alVolver}
          className="boton-grande"
          aria-label="Volver a la pantalla de inicio"
        >
          ← Volver
        </button>
        <h1>{tituloSeccion}</h1>
        <div style={{ width: '140px' }} aria-hidden="true"></div>
      </div>

      {cargando && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          Cargando {tituloSeccion.toLowerCase()}...
        </p>
      )}

      {error && (
        <div className="mensaje-fallo">
          <p className="mensaje-error" role="alert">{error}</p>
          <button
            type="button"
            onClick={alVolver}
            className="boton-grande"
            aria-label="Volver a Inicio"
          >
            Volver
          </button>
        </div>
      )}

      {!cargando && !error && contenidos.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>
          No hay contenidos disponibles en este momento.
        </p>
      )}

      {!cargando && !error && (
        <div className="cuadricula-catalogo">
          {contenidos.map((item) => (
            <button
              key={item.id}
              type="button"
              className="tarjeta-contenido"
              onClick={() => alSeleccionarContenido(item, contenidos)}
              aria-label={`Reproducir ${item.titulo}${item.anio ? ` del año ${item.anio}` : ''}`}
            >
              <img
                src={item.urlPortada}
                alt={`Portada de ${item.titulo}`}
                className="imagen-tarjeta"
                loading="lazy"
              />
              <div className="informacion-tarjeta">
                <span className="titulo-tarjeta">{item.titulo}</span>
                {item.anio && <span className="anio-tarjeta">{item.anio}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
