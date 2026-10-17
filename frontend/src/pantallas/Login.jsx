import React, { useState } from 'react';

export default function Login({ alIniciarSesion }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !fechaNacimiento.trim() || !dni.trim()) {
      setError(esRegistro ? 'Por favor, complete todos los campos.' : 'Los datos no son correctos. Inténtelo de nuevo.');
      return;
    }

    setCargando(true);

    try {
      if (!esRegistro) {
        // Iniciar sesión
        const respuesta = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nombre.trim(),
            fechaNacimiento: fechaNacimiento.trim(),
            dni: dni.trim()
          })
        });

        if (respuesta.ok) {
          const datos = await respuesta.json();
          localStorage.setItem('retroplay_usuario', datos.nombre);
          alIniciarSesion(datos.nombre);
        } else {
          // Requisito estricto: mostrar exactamente este texto
          setError('Los datos no son correctos. Inténtelo de nuevo.');
        }
      } else {
        // Registrarse
        const respuesta = await fetch('/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nombre.trim(),
            fechaNacimiento: fechaNacimiento.trim(),
            dni: dni.trim()
          })
        });

        if (respuesta.ok) {
          const datos = await respuesta.json();
          localStorage.setItem('retroplay_usuario', datos.nombre);
          alIniciarSesion(datos.nombre);
        } else if (respuesta.status === 409) {
          setError('Ya existe una cuenta con ese nombre y fecha de nacimiento.');
        } else {
          setError('Los datos no son correctos. Inténtelo de nuevo.');
        }
      }
    } catch {
      setError('Error al conectar con el servidor. Inténtelo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const alternarModo = () => {
    setError('');
    setEsRegistro(!esRegistro);
  };

  return (
    <div className="contenedor-login">
      <h1>RetroPlay</h1>
      <h2>{esRegistro ? 'Crear cuenta nueva' : 'Iniciar sesión'}</h2>

      {error && (
        <p className="mensaje-error" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      <form onSubmit={manejarEnvio} noValidate>
        <div className="campo-formulario">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={cargando}
            aria-label="Nombre completo"
            autoComplete="name"
          />
        </div>

        <div className="campo-formulario" style={{ marginTop: '16px' }}>
          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
          <input
            id="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            disabled={cargando}
            aria-label="Fecha de nacimiento"
          />
        </div>

        <div className="campo-formulario" style={{ marginTop: '16px' }}>
          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            disabled={cargando}
            aria-label="Documento Nacional de Identidad DNI"
          />
        </div>

        <div className="acciones-formulario">
          <button
            type="submit"
            className="boton-grande"
            disabled={cargando}
            aria-label={esRegistro ? 'Crear cuenta' : 'Entrar a RetroPlay'}
          >
            {cargando ? 'Entrando...' : (esRegistro ? 'Crear cuenta' : 'Entrar')}
          </button>

          <button
            type="button"
            onClick={alternarModo}
            className="boton-grande boton-secundario"
            disabled={cargando}
            aria-label={esRegistro ? 'Cambiar a iniciar sesión con cuenta existente' : 'Cambiar a crear cuenta nueva'}
          >
            {esRegistro ? 'Ya tengo cuenta, iniciar sesión' : 'Crear cuenta nueva'}
          </button>
        </div>
      </form>
    </div>
  );
}
