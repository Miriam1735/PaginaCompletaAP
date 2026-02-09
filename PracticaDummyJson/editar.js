const id = new URLSearchParams(location.search).get("id");

fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(p => {
        titulo.value = p.title;
        precio.value = p.price;
    });

document.getElementById("form-editar").addEventListener("submit", e => {
    e.preventDefault();

    fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titulo.value,
            price: precio.value
        })
    })
    .then(res => res.json())
    .then(() => window.location.href = "index.html");
});
