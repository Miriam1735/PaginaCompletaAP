document.getElementById("form-producto").addEventListener("submit", e => {
    e.preventDefault();

    fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titulo.value,
            price: precio.value,
            category: categoria.value,
            thumbnail: imagen.value
        })
    })
    .then(res => res.json())
    .then(() => window.location.href = "index.html");
});
