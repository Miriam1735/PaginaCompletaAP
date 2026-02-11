
// CLAVE DE LA API DE NASA

const API_KEY = "88JdPoMdWVaRMAmYeuZLf37kF73EvvKrp3HD8XPF";

// ELEMENTOS DEL DOM
const contenido = document.getElementById("contenido"); // Donde se muestran los resultados
const buscador = document.getElementById("buscador");   // Contenedor del input de fecha
const fechaInput = document.getElementById("fecha-input"); // Campo para seleccionar fecha

// EVENTOS DE LOS BOTONES
document.getElementById("btn-apod").addEventListener("click", cargarAPOD);
document.getElementById("btn-apod-fecha").addEventListener("click", mostrarBuscadorFecha);
document.getElementById("btn-buscar").addEventListener("click", cargarAPODPorFecha);
document.getElementById("btn-neo").addEventListener("click", cargarNEO);

// FUNCIÓN: CARGAR IMAGEN DEL DÍA (APOD)
function cargarAPOD() {
    // Oculta el buscador de fecha
    buscador.style.display = "none";

    // Mensaje mientras cargan los datos
    contenido.innerHTML = "<p>Cargando imagen del día...</p>";

    // Petición a la API de NASA
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
        .then(res => res.json()) // Convertimos la respuesta a JSON
        .then(data => {
            // Mostramos los datos en pantalla
            contenido.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            // Mensaje si ocurre un error
            contenido.innerHTML = "<p>Error al cargar imagen.</p>";
            console.error(error);
        });
}

// FUNCIÓN: MOSTRAR BUSCADOR POR FECHA
function mostrarBuscadorFecha() {
    // Muestra el input para elegir fecha
    buscador.style.display = "block";
    contenido.innerHTML = "<p>Selecciona una fecha para buscar una imagen.</p>";
}

// FUNCIÓN: CARGAR IMAGEN APOD POR FECHA
function cargarAPODPorFecha() {
    const fecha = fechaInput.value; // Obtenemos la fecha seleccionada

    // Validamos que el usuario haya elegido una fecha
    if (!fecha) {
        contenido.innerHTML = "<p>Selecciona una fecha primero.</p>";
        return;
    }

    contenido.innerHTML = "<p>Cargando imagen...</p>";

    // Petición a la API usando la fecha seleccionada
    fetch(`https://api.nasa.gov/planetary/apod?date=${fecha}&api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            // Mostramos la información recibida
            contenido.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            contenido.innerHTML = "<p>Error al cargar imagen.</p>";
            console.error(error);
        });
}

// FUNCIÓN: CARGAR ASTEROIDES CERCANOS (NEO)
function cargarNEO() {
    // Ocultamos el buscador
    buscador.style.display = "none";
    contenido.innerHTML = "<p>Cargando asteroides cercanos...</p>";

    // Petición al endpoint de asteroides
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            // Obtenemos la primera fecha disponible
            const fecha = Object.keys(data.near_earth_objects)[0];
            const asteroides = data.near_earth_objects[fecha];

            contenido.innerHTML = `<h2>Asteroides cercanos (${fecha})</h2>`;

            // Mostramos solo los primeros 6 asteroides
            asteroides.slice(0, 6).forEach(ast => {
                contenido.innerHTML += `
                    <p>
                        <strong>${ast.name}</strong><br>
                        ¿Peligroso?: ${ast.is_potentially_hazardous_asteroid ? "Sí" : "No"}
                    </p>
                `;
            });
        })
        .catch(error => {
            contenido.innerHTML = "<p>Error al cargar asteroides.</p>";
            console.error(error);
        });
}
