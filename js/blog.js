/**
 * Script para la funcionalidad del blog
 */

document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de artículos por categoría
    initializeFilters();
    
    // Inicialización del formulario de newsletter
    initializeNewsletter();
    
    // Inicialización de la búsqueda
    initializeSearch();
    
    // Inicialización del podcast
    initializePodcast();
});

/**
 * Inicializa los filtros de categoría
 */
function initializeFilters() {
    // Obtener todos los enlaces de filtro
    const filterLinks = document.querySelectorAll('.blog-filter a');
    
    // Si no hay filtros, salir
    if (filterLinks.length === 0) return;
    
    // Agregar event listener a cada enlace
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover la clase active de todos los enlaces
            filterLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace actual
            this.classList.add('active');
            
            // Obtener el valor del filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Obtener todos los artículos
            const articleContainers = document.querySelectorAll('[class*="wow"]');
            
            // Filtrar artículos
            articleContainers.forEach(container => {
                if (!container.classList.contains('col-md-6') && 
                    !container.classList.contains('col-lg-4')) {
                    return; // No es un contenedor de artículo
                }
                
                if (filterValue === '*') {
                    container.style.display = 'block';
                } else {
                    if (container.classList.contains(filterValue.substring(1))) {
                        container.style.display = 'block';
                    } else {
                        container.style.display = 'none';
                    }
                }
            });
        });
    });
}

/**
 * Inicializa el formulario de newsletter
 */
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-box .input-group');
    
    if (!newsletterForm) return;
    
    const submitButton = newsletterForm.querySelector('button');
    const emailInput = newsletterForm.querySelector('input');
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Por favor, ingresa tu dirección de email.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Por favor, ingresa una dirección de email válida.');
            return;
        }
        
        // Aquí iría el código para enviar el email a tu sistema
        // Por ahora, solo mostramos un mensaje
        alert('¡Gracias por suscribirte! Pronto recibirás nuestros artículos.');
        emailInput.value = '';
    });
}

/**
 * Inicializa la funcionalidad de búsqueda
 */
function initializeSearch() {
    const searchForm = document.querySelector('.mb-5 .input-group');
    
    if (!searchForm) return;
    
    const searchButton = searchForm.querySelector('button');
    const searchInput = searchForm.querySelector('input');
    
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            alert('Por favor, ingresa un término de búsqueda.');
            return;
        }
        
        // Aquí iría el código para buscar en los artículos
        // Por ahora, solo mostramos un mensaje
        alert('Buscando: ' + searchTerm);
    });
}

/**
 * Inicializa la funcionalidad del podcast
 */
function initializePodcast() {
    const podcastContainer = document.querySelector('.podcast-container');
    
    if (!podcastContainer) return;
    
    // Agregar analytics para el podcast
    const podcastLink = podcastContainer.querySelector('.btn-primary');
    if (podcastLink) {
        podcastLink.addEventListener('click', function() {
            // Registrar evento de clic en el podcast
            if (typeof gtag === 'function') {
                gtag('event', 'podcast_visit', {
                    'event_category': 'engagement',
                    'event_label': 'Spotify Podcast Visit'
                });
            }
        });
    }
    
    // Agregar comportamiento a los enlaces de transcripción
    const transcriptionLinks = document.querySelectorAll('a[href*="transcripcion-podcast"]');
    if (transcriptionLinks.length > 0) {
        transcriptionLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (typeof gtag === 'function') {
                    gtag('event', 'transcription_view', {
                        'event_category': 'content',
                        'event_label': 'Podcast Transcription View'
                    });
                }
            });
        });
    }
}

/**
 * Valida un correo electrónico
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
} 