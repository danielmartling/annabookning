const BASEMAPS = {
    OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</a>.'
    }),
    Satellit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">Esri, Maxar, Earthstar Geographics, and the GIS User Community</a>.'
    })
};

const lfmap = L.map('map', {
    center: [60.25542, 18.69360],
    zoom: 13,
    minZoom: 12,
    zoomControl: false,
    layers: [BASEMAPS.OpenStreetMap],
    fullscreenControl: {
        position: "topright",
    }
});

function renderMapMessage(activity) {
    if (activity.geometry) {
        lfmap.setView(activity.geometry.coordinates, 15);
        document.getElementById("mapError").style.display = "none";
        document.getElementById("map").style.display = "";
        createMapMarker(activity);
    }
}

function createMapMarker(activity) {
    L.marker(activity.geometry.coordinates)
        .addTo(lfmap)
        .bindPopup(
            `<b>${activity.title} / ${activity.subtitle}</b><br>
            ${activity.desc_short}`
        )
}