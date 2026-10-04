let markersGroup = [];

function updateMapPopups(lang) {
    markersGroup.forEach(item => {
        const { marker, exp } = item;
        const title = exp.title[lang] || exp.title.es;
        const desc = exp.description[lang] || exp.description.es;

        marker.bindPopup(`
            <div style="text-align: center;">
                <b style="font-size: 1rem; color: #1b4d3e;">${title}</b><br>
                <img src="${exp.image}" alt="${title}" style="width:100%; max-width:180px; height:auto; border-radius:6px; margin: 6px 0;"><br>
                <p style="font-size: 0.85rem; margin: 0; color: #444;">${desc}</p>
            </div>
        `);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    
    // Solo inicializar si el div #map existe en la página actual
    if (!mapElement) return;

    // Coordenadas del centro de Simijaca, Cundinamarca
    const simijacaCoords = [5.5050, -73.8510]; 
    const map = L.map('map').setView(simijacaCoords, 14);

    // Capa base OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Limpiar arreglo de marcadores
    markersGroup = [];

    // Validar que appData exista
    if (typeof appData !== 'undefined' && appData.sections) {
        appData.sections.forEach(sec => {
            sec.subsections.forEach(sub => {
                sub.experiences.forEach(exp => {
                    if (exp.coords) {
                        const marker = L.marker(exp.coords).addTo(map);
                        markersGroup.push({ marker, exp });
                    }
                });
            });
        });
    }

    // Cargar popups con el idioma inicial
    updateMapPopups(typeof currentLang !== 'undefined' ? currentLang : 'es');
});