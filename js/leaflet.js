let map;
function exibirMapa(lat, lon){
    if(map === undefined){
        map = L.map('map').setView([lat, lon], 13);
    }else{
        map.remove();
        map = L.map('map').setView([lat, lon], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    map.zoomControl.remove();

    L.marker([lat, lon]).addTo(map)
        // .bindPopup()
        .openPopup();
}


