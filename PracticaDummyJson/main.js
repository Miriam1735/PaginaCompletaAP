const tabla = document.getElementById("tabla-productos");
const buscador = document.getElementById("buscador");
const categoriasSelect = document.getElementById("categorias");
const anteriorBtn = document.getElementById("anterior");
const siguienteBtn = document.getElementById("siguiente");
const infoPagina = document.getElementById("info-pagina");

let limit = 10;
let skip = 0;
let total = 0;
let textoBusqueda = "";
let categoriaActual = "";
let modoBusqueda = false;

function cargarProductos() {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (modoBusqueda) {
        url = `https://dummyjson.com/products/search?q=${textoBusqueda}`;
    }

    if (categoriaActual) {
        url = `https://dummyjson.com/products/category/${categoriaActual}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            total = data.total || data.products.length;
            renderizarTabla(data.products.slice(0, limit));
            actualizarPaginacion();
        });
}

function renderizarTabla(productos) {
    tabla.innerHTML = "";

    productos.forEach(p => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}"></td>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td>${p.category}</td>
            <td>
                <a href="editar.html?id=${p.id}" class="editar">Editar</a>
                <button class="eliminar">Eliminar</button>
            </td>
        `;

        fila.querySelector(".eliminar")
            .addEventListener("click", () => eliminarProducto(p.id, fila));

        tabla.appendChild(fila);
    });
}

function eliminarProducto(id, fila) {
    if (!confirm("¿Eliminar este producto?")) return;

    fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => fila.remove());
}

function actualizarPaginacion() {
    const pagina = Math.floor(skip / limit) + 1;
    infoPagina.textContent = `Página ${pagina}`;
}

anteriorBtn.onclick = () => { skip -= limit; cargarProductos(); };
siguienteBtn.onclick = () => { skip += limit; cargarProductos(); };

buscador.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        textoBusqueda = buscador.value.trim();
        modoBusqueda = textoBusqueda !== "";
        categoriaActual = "";
        skip = 0;
        cargarProductos();
    }
});

fetch("https://dummyjson.com/products/category-list")
    .then(res => res.json())
    .then(cats => {
        cats.forEach(c => {
            const o = document.createElement("option");
            o.value = c;
            o.textContent = c;
            categoriasSelect.appendChild(o);
        });
    });

categoriasSelect.onchange = () => {
    categoriaActual = categoriasSelect.value;
    modoBusqueda = false;
    skip = 0;
    cargarProductos();
};

cargarProductos();
