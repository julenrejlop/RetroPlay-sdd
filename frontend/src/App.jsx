import React, { useState, useEffect } from 'react';
import Login from './pantallas/Login';
import Inicio from './pantallas/Inicio';
import Catalogo from './pantallas/Catalogo';
import Reproductor from './pantallas/Reproductor';

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('login');
  const [usuario, setUsuario] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
  const [listaContenidos, setListaContenidos] = useState([]);

  // Al montar, verificar si existe sesión guardada en localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('retroplay_usuario');
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
      setPantallaActual('inicio');
    }
  }, []);

  const iniciarSesion = (nombre) => {
    setUsuario(nombre);
    setPantallaActual('inicio');
  };

  const cerrarSesion = () => {
    localStorage.removeItem('retroplay_usuario');
    setUsuario(null);
    setTipoSeleccionado(null);
    setContenidoSeleccionado(null);
    setListaContenidos([]);
    setPantallaActual('login');
  };

  const seleccionarTipo = (tipo) => {
    setTipoSeleccionado(tipo);
    setPantallaActual('catalogo');
  };

  const volverAInicio = () => {
    setTipoSeleccionado(null);
    setContenidoSeleccionado(null);
    setPantallaActual('inicio');
  };

  const seleccionarContenido = (item, lista) => {
    setContenidoSeleccionado(item);
    setListaContenidos(lista);
    setPantallaActual('reproductor');
  };

  const salirDeReproductor = () => {
    setContenidoSeleccionado(null);
    setPantallaActual('catalogo');
  };

  const cambiarContenido = (nuevoItem) => {
    setContenidoSeleccionado(nuevoItem);
  };

  return (
    <div className="aplicacion">
      {pantallaActual === 'login' && (
        <Login alIniciarSesion={iniciarSesion} />
      )}

      {pantallaActual === 'inicio' && (
        <Inicio
          usuario={usuario}
          alSeleccionarTipo={seleccionarTipo}
          alCerrarSesion={cerrarSesion}
        />
      )}

      {pantallaActual === 'catalogo' && (
        <Catalogo
          tipo={tipoSeleccionado}
          alSeleccionarContenido={seleccionarContenido}
          alVolver={volverAInicio}
        />
      )}

      {pantallaActual === 'reproductor' && (
        <Reproductor
          contenido={contenidoSeleccionado}
          contenidos={listaContenidos}
          alSalir={salirDeReproductor}
          alCambiarContenido={cambiarContenido}
        />
      )}
    </div>
  );
}
