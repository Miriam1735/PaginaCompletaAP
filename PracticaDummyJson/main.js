const contenedor = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const modal = document.getElementById("modal");
const detalleProducto = document.getElementById("detalle-producto");
const cerrar = document.getElementById("cerrar");

let productos = [];

//Obtener productos 
fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        productos = data.products;
        mostrarProductos(productos.slice(0, 9));
    });

// Mostrar productos 
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${producto.title}</h3>
            <img src="${producto.thumbnail}">
            <span><strong>Precio:</strong> $${producto.price}</span>
            <span><strong>Categoría:</strong> ${producto.category}</span>
            <span><strong>Rating:</strong> ${producto.rating}</span>
        `;

        card.addEventListener("click", () => mostrarDetalle(producto));
        contenedor.appendChild(card);
    });
}

//Busqueda
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados.slice(0, 9));
});

function mostrarDetalle(producto) {
    detalleProducto.innerHTML = `
        <h2>${producto.title}</h2>
        <img src="${producto.thumbnail}" style="width:100%; height:200px; object-fit:contain">
        <p>${producto.description}</p>
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p><strong>Descuento:</strong> ${producto.discountPercentage}%</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <p><strong>Rating:</strong> ${producto.rating}</p>
    `;
    modal.style.display = "flex";
}

cerrar.addEventListener("click", () => {
    modal.style.display = "none";
});
