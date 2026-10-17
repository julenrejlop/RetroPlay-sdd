import React, { useState, useRef, useEffect } from 'react';

export default function Reproductor({ contenido, contenidos, alSalir, alCambiarContenido }) {
  const [enPausa, setEnPausa] = useState(false);
  const [ampliado, setAmpliado] = useState(false);
  const [fallo, setFallo] = useState(false);

  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  const esPelicula = contenido?.tipo === 'pelicula';

  // Reiniciar estados al cambiar de contenido
  useEffect(() => {
    setEnPausa(false);
    setFallo(false);
    setAmpliado(false);

    if (!esPelicula && audioRef.current) {
      audioRef.current.currentTime = 0;
      const promesa = audioRef.current.play();
      if (promesa) {
        promesa.catch(() => {
          // Si el navegador bloquea autoplay o hay fallo
          setEnPausa(true);
        });
      }
    }
  }, [contenido, esPelicula]);

  // Alternar entre pausa y reanudar
  const alternarPausa = () => {
    if (esPelicula) {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const accion = enPausa ? 'playVideo' : 'pauseVideo';
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: accion, args: [] }),
          '*'
        );
      }
      setEnPausa(!enPausa);
    } else {
      if (audioRef.current) {
        if (enPausa) {
          audioRef.current.play().then(() => setEnPausa(false)).catch(() => setFallo(true));
        } else {
          audioRef.current.pause();
          setEnPausa(true);
        }
      }
    }
  };

  // Manejar finalización de una canción (avanzar a la siguiente, parar en la última)
  const manejarCancionTerminada = () => {
    if (!contenidos || contenidos.length === 0) return;
    const indiceActual = contenidos.findIndex((item) => item.id === contenido.id);
    if (indiceActual >= 0 && indiceActual < contenidos.length - 1) {
      // Pasar a la siguiente canción
      alCambiarContenido(contenidos[indiceActual + 1]);
    } else {
      // Última canción: detenerse sin volver al principio
      setEnPausa(true);
    }
  };

  if (!contenido) {
    return (
      <main className="pantalla-reproductor">
        <p>No hay contenido seleccionado.</p>
        <button type="button" onClick={alSalir} className="boton-grande" aria-label="Volver al catálogo">
          Volver
        </button>
      </main>
    );
  }

  return (
    <main className="pantalla-reproductor">
      {fallo ? (
        <section className="mensaje-fallo" role="alert">
          <p className="mensaje-error">
            No se pudo reproducir el contenido seleccionado.
          </p>
          <button
            type="button"
            onClick={alSalir}
            className="boton-grande"
            aria-label="Volver al catálogo"
          >
            Volver
          </button>
        </section>
      ) : (
        <>
          {esPelicula ? (
            <div className={`reproductor-pelicula-contenedor ${ampliado ? 'ampliado' : ''}`}>
              <iframe
                ref={iframeRef}
                src={contenido.urlMedia}
                title={contenido.titulo}
                className="iframe-video"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                onError={() => setFallo(true)}
              />
            </div>
          ) : (
            <div className="reproductor-musica-contenedor">
              <img
                src={contenido.urlPortada}
                alt={`Carátula de ${contenido.titulo}`}
                className="caratula-musica"
              />
              <audio
                ref={audioRef}
                src={contenido.urlMedia}
                autoPlay
                controls={false}
                onEnded={manejarCancionTerminada}
                onError={() => setFallo(true)}
              />
            </div>
          )}

          <h2 className="titulo-reproductor">{contenido.titulo}</h2>

          <div className="barra-controles">
            {esPelicula && (
              <button
                type="button"
                className="boton-grande"
                onClick={() => setAmpliado(!ampliado)}
                aria-label={ampliado ? 'Reducir tamaño del vídeo' : 'Ampliar tamaño del vídeo'}
              >
                {ampliado ? 'Reducir' : 'Ampliar'}
              </button>
            )}

            <button
              type="button"
              className="boton-grande"
              onClick={alternarPausa}
              aria-label={enPausa ? 'Reanudar reproducción' : 'Pausar reproducción'}
            >
              {enPausa ? 'Reanudar' : 'Pausa'}
            </button>

            <button
              type="button"
              className="boton-grande boton-secundario"
              onClick={alSalir}
              aria-label="Salir de la reproducción y volver al catálogo"
            >
              Salir
            </button>
          </div>
        </>
      )}
    </main>
  );
}
