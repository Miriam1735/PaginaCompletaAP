// obtenemos los elementos del HTML usando sus IDs
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");
const preview = document.getElementById("preview");
const result = document.getElementById("result");


// cuando el usuario selecciona un archivo, mostramos vista previa
fileInput.addEventListener("change", function ()
{
    const file = fileInput.files[0];

    if(file)
    {
        // crea una URL temporal para mostrar la imagen antes de subirla
        preview.src = URL.createObjectURL(file);
    }
});


// cuando el usuario hace clic en subir
uploadBtn.addEventListener("click", function ()
{
    const file = fileInput.files[0];

    // validar que exista archivo
    if(!file)
    {
        status.textContent = "Selecciona una imagen primero.";
        return;
    }

    // validar que sea imagen
    if(!file.type.startsWith("image/"))
    {
        status.textContent = "El archivo debe ser una imagen.";
        return;
    }

    // desactivar botón mientras sube
    uploadBtn.disabled = true;

    // mostrar mensaje de carga
    status.textContent = "Subiendo...";


    // crear objeto FormData para enviar archivo
    const formData = new FormData();

    formData.append("file", file);

    // CAMBIA esto por tu upload preset
    formData.append("upload_preset", "unsigned_prueba");

    fetch("https://api.cloudinary.com/v1_1/dikcujvdv/image/upload",
    {
        method: "POST",
        body: formData
    })


    // convertir respuesta a JSON
    .then(function(response)
    {
        return response.json();
    })


    // cuando se sube correctamente
    .then(function(data)
    {
        // mostrar imagen subida desde Cloudinary
        result.src = data.secure_url;

        status.textContent = "Imagen subida correctamente.";

        uploadBtn.disabled = false;
    })


    // si ocurre error
    .catch(function(error)
    {
        status.textContent = "Error al subir la imagen.";

        uploadBtn.disabled = false;

        console.error(error);
    });

});
