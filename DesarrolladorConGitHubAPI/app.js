// Usuario de GitHub 
const usuario = "Miriam1735";

// Petición al perfil de GitHub
fetch(`https://api.github.com/users/Miriam1735`) // Petición al perfil
    .then(res => res.json()) 
    .then(datos => {

        document.getElementById("perfil").innerHTML = `
            <img src="${datos.avatar_url}">
            <h2>${datos.name || datos.login}</h2>
            <p>${datos.bio || "Sin biografía"}</p>
            <p>${datos.location || "Ubicación no especificada"}</p>
            <p>👥 ${datos.followers} followers · ${datos.following} following</p>
        `;
    });

//Repositorios más recientes del usuario
fetch(`https://api.github.com/users/Miriam1735/repos?sort=updated&direction=desc&per_page=6&type=owner`) // URL con parámetros
    .then(res => res.json())
    .then(repos => {
        const contenedor = document.getElementById("repos");

        // Recorremos los repositorios y los mostramos
        repos.forEach(repo => {
            contenedor.innerHTML += `
                <div class="repo-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Sin descripción"}</p>
                    <a href="${repo.html_url}" target="_blank">Ver repositorio</a>
                </div>
            `;
        });
    });

//Followers más recientes del usuario
    fetch(`https://api.github.com/users/Miriam1735/followers?per_page=5`) // Traemos solo 5 seguidores
    .then(res => res.json())
    .then(followers => {
        const contenedor = document.getElementById("followers");

        // Si no hay seguidores, mostramos mensaje
        if (followers.length === 0) {
            contenedor.innerHTML = "<p>No hay seguidores aún.</p>";
            return;
        }

        // Mostramos los avatares
        followers.forEach(persona => {
            contenedor.innerHTML += `
                <img src="${persona.avatar_url}" title="${persona.login}">
            `;
        });
    });
