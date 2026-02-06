let latitud;
let longitud;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (coordenadas)=>{
            latitud = coordenadas.coords.latitude;
            longitud = coordenadas.coords.longitude;

            const coordenada = [21.068771, -98.541476];
            let map = L.map('map').setView(coordenada, 50);

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(map);

            let marcador = L.marker(coordenada).addTo(map);

            marcador.bindPopup("<b>Estoy aqui...</b><br>Axcaco, 43017 Hgo.<br>"
                + "Latitud : " + latitud + " ,<br> Longitud : " + longitud
            ).openPopup();

            const perimetroCasa = [
                [21.068867633119037, -98.54147332733092],
                [21.068850037264784, -98.54139650486324],
                [21.068813542153052, -98.54140209195181],
                [21.068726214527892, -98.54141256774287],
                [21.068680595598835, -98.54142653546424],
                [21.068675382006056, -98.54149078698266],
                [21.068715135646404, -98.54151383372296]
            ];

            let poligono = L.polygon(perimetroCasa, {
                color: '#e74c3c',
                fillColor: '#3498db',
                fillOpacity: 0.5,
                weight: 4
            }).addTo(map);

            poligono.on('click', function(e) {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(
                        "<b> Mi Terreno - Axcaco</b><br>" +
                        "43017 Hgo.<br>" +
                        "Superficie: 272.19 m² (2,929.87 pies²)<br>" +
                        "Perímetro: 75.62 m (248.11 pies)<br>" +
                        "Coordenadas: 21.068771, -98.541476<br>" +
                        "<i>Este es mi terreno</i>"
                    )
                    .openOn(map);
            });

        },
        (error)=>{
            alert("Si tiene geolocalización el navegador pero algo pasó....");
        }
    );
} else {
    alert("No tiene geolocalización el navegador");
}