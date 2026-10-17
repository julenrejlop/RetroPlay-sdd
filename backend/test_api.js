const http = require('http');
const app = require('./servidor');

let servidor;
const PUERTO_TEST = 3001;

function peticion(metodo, ruta, datos = null) {
  return new Promise((resolve, reject) => {
    const opciones = {
      hostname: 'localhost',
      port: PUERTO_TEST,
      path: ruta,
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(opciones, (res) => {
      let cuerpo = '';
      res.on('data', chunk => cuerpo += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(cuerpo) });
        } catch {
          resolve({ status: res.statusCode, data: cuerpo });
        }
      });
    });

    req.on('error', reject);

    if (datos) {
      req.write(JSON.stringify(datos));
    }
    req.end();
  });
}

async function ejecutarPruebas() {
  servidor = app.listen(PUERTO_TEST, async () => {
    console.log(`Servidor de pruebas arrancado en puerto ${PUERTO_TEST}`);
    try {
      // 1. Login con credenciales correctas
      console.log('--- Probando Login correcto ---');
      const resLoginOk = await peticion('POST', '/api/login', {
        nombre: 'Prueba',
        fechaNacimiento: '1950-01-01',
        dni: '12345678A'
      });
      console.log('Login OK status:', resLoginOk.status, resLoginOk.data);
      if (resLoginOk.status !== 200 || resLoginOk.data.nombre !== 'Prueba') {
        throw new Error('Fallo en login correcto');
      }

      // 2. Login con credenciales incorrectas (DNI erróneo)
      console.log('--- Probando Login incorrecto (DNI erróneo) ---');
      const resLoginFail = await peticion('POST', '/api/login', {
        nombre: 'Prueba',
        fechaNacimiento: '1950-01-01',
        dni: 'DNI_FALSO'
      });
      console.log('Login Fail status:', resLoginFail.status, resLoginFail.data);
      if (resLoginFail.status !== 401 || resLoginFail.data.mensaje !== 'Los datos no son correctos. Inténtelo de nuevo.') {
        throw new Error('Fallo en login incorrecto');
      }

      // 3. Registro nuevo usuario
      console.log('--- Probando Registro nuevo ---');
      const nombreAleatorio = 'Usuario_' + Date.now();
      const resRegistro = await peticion('POST', '/api/registro', {
        nombre: nombreAleatorio,
        fechaNacimiento: '1945-03-20',
        dni: '99887766Z'
      });
      console.log('Registro status:', resRegistro.status, resRegistro.data);
      if (resRegistro.status !== 201 || resRegistro.data.nombre !== nombreAleatorio) {
        throw new Error('Fallo en registro nuevo');
      }

      // 4. Registro duplicado
      console.log('--- Probando Registro duplicado ---');
      const resRegistroDup = await peticion('POST', '/api/registro', {
        nombre: nombreAleatorio,
        fechaNacimiento: '1945-03-20',
        dni: '99887766Z'
      });
      console.log('Registro duplicado status:', resRegistroDup.status, resRegistroDup.data);
      if (resRegistroDup.status !== 409) {
        throw new Error('Fallo en detección de registro duplicado (debe ser 409)');
      }

      // 5. Catálogo API: pelicula
      console.log('--- Probando Catálogo Películas ---');
      const resPeliculas = await peticion('GET', '/api/contenidos?tipo=pelicula');
      console.log('Películas status:', resPeliculas.status, 'Total:', resPeliculas.data.length);
      console.log('Pelicula ejemplo:', resPeliculas.data[0]);
      if (resPeliculas.status !== 200 || resPeliculas.data.length !== 3) {
        throw new Error('Fallo en catálogo de películas (debe tener 3)');
      }

      // 6. Catálogo API: musica
      console.log('--- Probando Catálogo Música ---');
      const resMusica = await peticion('GET', '/api/contenidos?tipo=musica');
      console.log('Música status:', resMusica.status, 'Total:', resMusica.data.length);
      console.log('Música ejemplo:', resMusica.data[0]);
      if (resMusica.status !== 200 || resMusica.data.length !== 3) {
        throw new Error('Fallo en catálogo de música (debe tener 3)');
      }

      // 7. Catálogo API: tipo ausente o inválido
      console.log('--- Probando Catálogo con tipo inválido ---');
      const resInvalido = await peticion('GET', '/api/contenidos?tipo=otraCosa');
      console.log('Inválido status:', resInvalido.status, resInvalido.data);
      if (resInvalido.status !== 400) {
        throw new Error('Fallo en validación de tipo ausente o inválido (debe ser 400)');
      }

      const resVacio = await peticion('GET', '/api/contenidos');
      console.log('Vacío status:', resVacio.status, resVacio.data);
      if (resVacio.status !== 400) {
        throw new Error('Fallo en tipo vacío (debe ser 400)');
      }

      console.log('\n>>> ¡TODAS LAS PRUEBAS DE AUTENTICACIÓN Y CATÁLOGO PASARON EXITOSAMENTE! <<<');
    } catch (err) {
      console.error('ERROR EN PRUEBAS:', err);
      process.exitCode = 1;
    } finally {
      servidor.close(() => {
        const pool = require('./conexion');
        pool.end();
      });
    }
  });
}

ejecutarPruebas();
