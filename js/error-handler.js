/**
 * Error Handler Script
 * Este script detecta y reporta errores comunes en el sitio web.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.info('🔍 Iniciando verificación del sitio...');
    
    // Verificar imágenes rotas
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            console.warn('⚠️ Imagen no encontrada o con errores:', img.src);
        }
        
        img.addEventListener('error', function() {
            console.warn('⚠️ Error al cargar imagen:', this.src);
        });
    });
    
    // Verificar que las traducciones existen para todos los elementos con data-i18n
    if (typeof translations !== 'undefined') {
        const currentLang = localStorage.getItem('language') || 'es';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            
            if (!translations[currentLang] || !translations[currentLang][key]) {
                console.warn(`⚠️ Falta traducción para "${key}" en idioma "${currentLang}"`);
            }
        });
    } else {
        console.warn('⚠️ El objeto translations no está definido. Verifica que translations.js está cargado correctamente.');
    }
    
    // Verificar que los scripts necesarios están cargados
    const requiredScripts = [
        { name: 'jQuery', check: () => typeof jQuery !== 'undefined' },
        { name: 'Bootstrap', check: () => typeof bootstrap !== 'undefined' },
        { name: 'WOW', check: () => typeof WOW !== 'undefined' }
    ];
    
    requiredScripts.forEach(script => {
        if (!script.check()) {
            console.warn(`⚠️ La biblioteca "${script.name}" parece no estar cargada correctamente`);
        }
    });
    
    // Verificar enlaces internos rotos
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        // Solo verificar enlaces internos que no sean anclas o javascript
        if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !href.startsWith('http') && !href.startsWith('mailto:')) {
            // Registrar enlaces para revisión manual
            console.info('🔗 Enlace interno para verificar:', href);
        }
    });
    
    // Verificar si el selector de temas está funcionando
    if (document.getElementById('checkbox')) {
        console.info('✓ Selector de tema encontrado.');
    } else {
        console.warn('⚠️ No se encontró el selector de tema en esta página.');
    }
    
    // Verificar si el selector de idiomas está disponible
    if (document.querySelectorAll('.language-option').length > 0) {
        console.info('✓ Selector de idioma encontrado.');
    } else {
        console.warn('⚠️ No se encontró el selector de idioma en esta página.');
    }
    
    console.info('✅ Verificación completada. Revisar advertencias si existen.');
});

// Capturar errores globales de JavaScript
window.addEventListener('error', function(event) {
    console.error('🛑 Error JavaScript:', event.message, 'en', event.filename, 'línea', event.lineno);
    return false; // Permite que el error se siga propagando
});

// Capturar promesas rechazadas no manejadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('🛑 Promesa rechazada no manejada:', event.reason);
    return false; // Permite que el error se siga propagando
});

// Verificar problemas de renderizado (layout shifts)
if ('PerformanceObserver' in window) {
    try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.hadRecentInput) continue;
                if (entry.value > 0.1) { // Solo reportar shifts significativos
                    console.warn('⚠️ Detectado cambio de layout significativo:', entry.value.toFixed(3));
                }
            }
        });
        
        layoutShiftObserver.observe({type: 'layout-shift', buffered: true});
        console.info('✓ Monitoreo de layout shifts activado.');
    } catch (e) {
        console.info('ℹ️ El monitoreo de layout shifts no está disponible en este navegador.');
    }
}

console.info('🚀 Error handler inicializado correctamente.'); 