// Función para optimizar imágenes al cargarlas
function optimizeQuizImages() {
    const quizImages = document.querySelectorAll('.image-container img');
    
    quizImages.forEach(img => {
        // Aseguramos tamaño máximo
        img.style.maxWidth = '800px';
        img.style.height = 'auto';
        
        // Añadimos lazy loading
        img.loading = 'lazy';
        
        // Añadimos efecto de fade-in al cargar
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        
        img.onload = function() {
            this.style.opacity = '1';
        }
    });
}

// Ejecutar después de cargar cada pregunta
document.addEventListener('DOMContentLoaded', function() {
    // Observamos cambios en el contenedor del quiz
    const observer = new MutationObserver(function(mutations) {
        optimizeQuizImages();
    });
    
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        observer.observe(quizContainer, { childList: true, subtree: true });
    }
}); 