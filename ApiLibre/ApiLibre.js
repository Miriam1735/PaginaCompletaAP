const API_KEY = "88JdPoMdWVaRMAmYeuZLf37kF73EvvKrp3HD8XPF";
const contenido = document.getElementById("contenido");
const buscador = document.getElementById("buscador");
const fechaInput = document.getElementById("fecha-input");

document.getElementById("btn-apod").addEventListener("click", cargarAPOD);
document.getElementById("btn-apod-fecha").addEventListener("click", mostrarBuscadorFecha);
document.getElementById("btn-buscar").addEventListener("click", cargarAPODPorFecha);
document.getElementById("btn-neo").addEventListener("click", cargarNEO);

// Imagen del día (APOD)
function cargarAPOD() {
    buscador.style.display = "none";
    contenido.innerHTML = "<p>Cargando imagen del día...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
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

// Mostrar buscador por fecha
function mostrarBuscadorFecha() {
    buscador.style.display = "block";
    contenido.innerHTML = "<p>Selecciona una fecha para buscar una imagen.</p>";
}

// Imagen APOD por fecha
function cargarAPODPorFecha() {
    const fecha = fechaInput.value;
    if (!fecha) {
        contenido.innerHTML = "<p>Selecciona una fecha primero.</p>";
        return;
    }

    contenido.innerHTML = "<p>Cargando imagen...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?date=${fecha}&api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
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

// Asteroides cercanos (NEO)
function cargarNEO() {
    buscador.style.display = "none";
    contenido.innerHTML = "<p>Cargando asteroides cercanos...</p>";

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const fecha = Object.keys(data.near_earth_objects)[0];
            const asteroides = data.near_earth_objects[fecha];

            contenido.innerHTML = `<h2>Asteroides cercanos (${fecha})</h2>`;

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
