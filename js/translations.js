let translations = {};
let currentLanguage = localStorage.getItem('language') || 'es';

// Cargar las traducciones desde la API
async function loadTranslations() {
    try {
        const response = await fetch('/api/translations');
        translations = await response.json();
        translatePage();
        setActiveLanguage(); // Llama a la función para establecer el idioma activo
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Cambiar el idioma
function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('language', language);
    translatePage();
    setActiveLanguage(); // Llama a la función para establecer el idioma activo
}

// Traducir la página
function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = translations[currentLanguage];
        
        // Navegar por el objeto de traducciones
        for (const key of keys) {
            if (value) {
                value = value[key];
            }
        }
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.innerHTML = value;
            }
        }
    });
}

// Establecer la clase activa en el menú
function setActiveLanguage() {
    document.querySelectorAll('.language-option').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-lang') === currentLanguage) {
            el.classList.add('active');
        }
    });
}

// Cargar traducciones cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();

    // Establecer la clase activa en el menú al cargar la página
    document.querySelectorAll('.language-option').forEach(el => {
        if (el.getAttribute('data-lang') === currentLanguage) {
            el.classList.add('active');
        }
    });

    // Opcional: Establecer el idioma inicial basado en el navegador
    if (!localStorage.getItem('language')) {
        const browserLang = navigator.language.split('-')[0];
        if (['es', 'en', 'pt'].includes(browserLang)) {
            changeLanguage(browserLang);
        }
    }
}); 