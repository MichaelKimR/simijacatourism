// Variable global para el idioma activo
let currentLang = localStorage.getItem('selectedLang') || 'es';

function updatePageLanguage() {
    // 1. Actualizar etiqueta del botón selector
    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
        langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';
    }

    // 2. Traducir elementos con diccionario appData.i18n (data-i18n)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (typeof appData !== 'undefined' && appData.i18n && appData.i18n[currentLang] && appData.i18n[currentLang][key]) {
            element.textContent = appData.i18n[currentLang][key];
        }
    });

    // 3. Traducir elementos directos con atributos data-es y data-en
    document.querySelectorAll('[data-es][data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${currentLang}`);
        if (translation) {
            element.textContent = translation;
        }
    });

    // 4. Si existe la función de renderizado del mapa, refrescar marcadores
    if (typeof updateMapPopups === 'function') {
        updateMapPopups(currentLang);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('selectedLang', currentLang);
    updatePageLanguage();
}

// Inicialización cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
});