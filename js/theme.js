// Función para establecer un tema
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
}

// Función para alternar entre temas
function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Función para inicializar el tema según la preferencia guardada
function initTheme() {
    // Verificar preferencia guardada
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('dark');
        document.getElementById('checkbox').checked = true;
    } else {
        setTheme('light');
        document.getElementById('checkbox').checked = false;
    }
    
    // Verificar preferencia del sistema si no hay preferencia guardada
    if (!localStorage.getItem('theme')) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.getElementById('checkbox').checked = true;
        }
    }
}

// Versión simplificada del theme.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    const checkbox = document.getElementById('checkbox');
    
    // Aplicar tema guardado al cargar la página
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-mode');
        if (checkbox) checkbox.checked = true;
    }
    
    // Escuchar cambios en el interruptor
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Activar modo oscuro
                document.body.setAttribute('data-theme', 'dark');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                showThemeMessage(true);
            } else {
                // Desactivar modo oscuro
                document.body.removeAttribute('data-theme');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                showThemeMessage(false);
            }
        });
    }
});

// Mensaje al cambiar el tema
function showThemeMessage(isDark) {
    const message = isDark ? 'Modo oscuro activado' : 'Modo claro activado';
    
    // Mostrar mensaje temporal
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.bottom = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '10px 15px';
    messageDiv.style.backgroundColor = isDark ? '#333' : '#fff';
    messageDiv.style.color = isDark ? '#fff' : '#333';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 500);
    }, 2000);
}

// Función para aplicar estilos de modo oscuro a elementos del quiz
function applyDarkModeToQuiz() {
    // Evitar bucles añadiendo una bandera para el estado de actualización
    if (document.body.dataset.themeUpdating === "true") {
        return; // Si ya estamos actualizando, salir para evitar ciclos
    }
    
    document.body.dataset.themeUpdating = "true";
    console.log("🔄 Aplicando ajustes de modo oscuro al quiz");
    
    if (document.body.classList.contains('dark-mode')) {
        console.log("🌙 Aplicando modo oscuro a elementos del quiz");
        
        // Seleccionar todos los elementos relevantes del quiz
        const quizElements = document.querySelectorAll('#quizContainer, .quiz-container, .question-card, .options-container, .option, .question, .quiz-intro, .result-container');
        
        // Aplicar estilos oscuros a cada elemento
        quizElements.forEach(el => {
            el.style.backgroundColor = '#343a40';
            el.style.color = '#f0f0f0';
            
            // Si tiene borde, cambiar color del borde
            if (el.style.border || getComputedStyle(el).border !== 'none') {
                el.style.borderColor = '#495057';
            }
            
            // Si tiene sombra, oscurecerla
            if (el.style.boxShadow || getComputedStyle(el).boxShadow !== 'none') {
                el.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.3)';
            }
            
            // Cambiar color de texto en todos los elementos hijos
            Array.from(el.querySelectorAll('*')).forEach(child => {
                // No cambiar colores de botones específicos
                if (!child.classList.contains('btn-primary') && 
                    !child.classList.contains('btn-success') && 
                    !child.classList.contains('btn-danger')) {
                    child.style.color = '#f0f0f0';
                }
            });
        });
        
        // Asegurarnos de que los inputs y labels tengan los colores correctos
        document.querySelectorAll('#quizContainer input, .quiz-container input, #quizContainer label, .quiz-container label').forEach(el => {
            if (el.type === 'radio' || el.type === 'checkbox') {
                el.style.backgroundColor = '#2c3136';
                el.style.borderColor = '#495057';
            }
        });
    } else {
        console.log("☀️ Restaurando modo claro a elementos del quiz");
        
        // Si se cambia al modo claro, restaurar estilos
        const quizElements = document.querySelectorAll('#quizContainer, .quiz-container, .question-card, .options-container, .option, .question, .quiz-intro, .result-container');
        
        quizElements.forEach(el => {
            el.style.backgroundColor = '';
            el.style.color = '';
            el.style.borderColor = '';
            el.style.boxShadow = '';
            
            Array.from(el.querySelectorAll('*')).forEach(child => {
                child.style.color = '';
            });
        });
        
        document.querySelectorAll('#quizContainer input, .quiz-container input').forEach(el => {
            if (el.type === 'radio' || el.type === 'checkbox') {
                el.style.backgroundColor = '';
                el.style.borderColor = '';
            }
        });
    }
    
    // Quitar la bandera después de un breve retraso
    setTimeout(() => {
        document.body.dataset.themeUpdating = "false";
    }, 100);
}

// Evento para el cambio de tema
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox');
    if (checkbox) {
        // Ejecutar cuando cambia el tema
        checkbox.addEventListener('change', function() {
            setTimeout(applyDarkModeToQuiz, 100); // Pequeño retraso para asegurar que se aplica después del cambio de tema
        });
        
        // También aplicar al cargar la página si ya está en modo oscuro
        if (document.body.classList.contains('dark-mode')) {
            setTimeout(applyDarkModeToQuiz, 300);
        }
    }
    
    // Buscar elementos del quiz después de que la página haya cargado
    setTimeout(function() {
        if (document.querySelector('#quizContainer') || document.querySelector('.quiz-container')) {
            console.log("🔍 Elementos de quiz detectados, verificando tema");
            if (document.body.classList.contains('dark-mode')) {
                applyDarkModeToQuiz();
            }
        }
    }, 1000);
});

// Función especial para forzar la actualización cuando la página ya está cargada
function forceQuizDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        applyDarkModeToQuiz();
        console.log("🔄 Modo oscuro forzado en elementos del quiz");
    }
}

// Botón de emergencia para forzar el modo oscuro (puedes activarlo desde la consola)
window.forceQuizDarkMode = forceQuizDarkMode;

// Agregar al final de theme.js
document.addEventListener('DOMContentLoaded', function() {
    // Función para aplicar estilos al quiz en modo oscuro de forma forzada
    function fixQuizDarkMode() {
        console.log("🔄 Aplicando ajustes de modo oscuro al quiz");
        
        if (document.body.classList.contains('dark-mode')) {
            // Primero el contenedor principal
            const quizContainer = document.getElementById('quizContainer');
            if (quizContainer) {
                quizContainer.style.backgroundColor = '#343a40';
                quizContainer.style.color = '#f0f0f0';
                
                // Luego todos los elementos internos
                const allElements = quizContainer.querySelectorAll('*');
                allElements.forEach(el => {
                    // Para todos los elementos de texto
                    if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || 
                        el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || 
                        el.tagName === 'LABEL' || el.tagName === 'SPAN') {
                        el.style.color = '#f0f0f0';
                    }
                    
                    // Para elementos específicos con clase
                    if (el.classList.contains('question-card')) {
                        el.style.backgroundColor = '#2c3136';
                        el.style.borderColor = '#495057';
                        el.style.color = '#f0f0f0';
                    }
                    
                    // Para contenedores
                    if (el.classList.contains('quiz-intro') || 
                        el.classList.contains('question-container') || 
                        el.classList.contains('options-container') || 
                        el.classList.contains('question')) {
                        el.style.backgroundColor = '#343a40';
                        el.style.color = '#f0f0f0';
                    }
                    
                    // Para sobrescribir cualquier estilo inline
                    if (el.style.backgroundColor === 'white' || 
                        el.style.backgroundColor === '#ffffff' || 
                        el.style.backgroundColor === '#fff') {
                        el.style.backgroundColor = '#343a40';
                    }
                });
            }
            
            // También aplicar a los elementos que se generan dinámicamente
            document.querySelectorAll('.question-card').forEach(card => {
                card.style.backgroundColor = '#2c3136';
                card.style.color = '#f0f0f0';
                card.style.borderColor = '#495057';
                
                // Y a todos sus hijos
                card.querySelectorAll('*').forEach(child => {
                    if (child.tagName === 'P' || child.tagName === 'H3' || 
                        child.tagName === 'H4' || child.tagName === 'H5' || 
                        child.tagName === 'LABEL' || child.tagName === 'SPAN') {
                        child.style.color = '#f0f0f0';
                    }
                });
            });
        }
    }
    
    // Ejecutar cuando cambia el tema
    const checkbox = document.getElementById('checkbox');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            setTimeout(fixQuizDarkMode, 200);
        });
    }
    
    // Ejecutar cuando se carga la página
    setTimeout(fixQuizDarkMode, 1000);
    
    // Ejecutar periódicamente para capturar elementos generados dinámicamente
    setInterval(fixQuizDarkMode, 2000);
    
    // Hacer la función disponible globalmente para llamarla desde la consola si es necesario
    window.fixQuizDarkMode = fixQuizDarkMode;
});

// Vamos a crear un nuevo archivo: js/dark-mode-fixer.js
const darkModeFixer = {
    init: function() {
        console.log("🌙 Dark Mode Fixer iniciado");
        
        // Crear un observador del DOM para detectar cambios
        this.setupObserver();
        
        // Aplicar inicialmente si está en modo oscuro
        if (document.body.classList.contains('dark-mode')) {
            this.fixAllElements();
        }
        
        // Escuchar cambios de tema
        document.getElementById('checkbox').addEventListener('change', () => {
            setTimeout(() => this.fixAllElements(), 100);
        });
    },
    
    setupObserver: function() {
        // Observar cambios en todo el documento
        const observer = new MutationObserver((mutations) => {
            if (document.body.classList.contains('dark-mode')) {
                mutations.forEach(mutation => {
                    // Si se añaden nodos
                    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            // Verificar si es un elemento DOM y aplicar estilos
                            if (node.nodeType === 1) { // ELEMENT_NODE
                                this.fixElement(node);
                                // También fix a todos sus hijos
                                node.querySelectorAll('*').forEach(child => {
                                    this.fixElement(child);
                                });
                            }
                        });
                    }
                });
            }
        });
        
        // Comenzar a observar el documento con todas las opciones
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
        
        console.log("👁️ Observer configurado");
    },
    
    fixAllElements: function() {
        console.log("🔄 Aplicando estilos a todos los elementos");
        
        if (document.body.classList.contains('dark-mode')) {
            // Primero los contenedores principales
            document.querySelectorAll('.card, #quizContainer, .quiz-container, .question-card, .question-container, .card-body').forEach(el => {
                this.fixElement(el);
            });
            
            // Luego todas las preguntas y opciones
            document.querySelectorAll('.question, .options-container, .option, .quiz-intro, .result-container').forEach(el => {
                this.fixElement(el);
            });
            
            // Y finalmente todos los elementos de texto
            document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, label, span, li, a:not(.btn)').forEach(el => {
                if (!el.closest('.btn-primary') && !el.closest('.btn-success') && !el.closest('.btn-danger')) {
                    el.style.color = '#f0f0f0';
                }
            });
            
            // Elementos con fondo blanco explícito
            document.querySelectorAll('[style*="background-color: white"], [style*="background-color: #fff"], [style*="background-color: #ffffff"], [style*="background: white"]').forEach(el => {
                el.style.backgroundColor = '#343a40';
            });
        }
    },
    
    fixElement: function(el) {
        if (!document.body.classList.contains('dark-mode')) return;
        
        // Detectar tipo de elemento
        const tagName = el.tagName.toLowerCase();
        const classList = Array.from(el.classList || []);
        const id = el.id;
        
        // Para contenedores de preguntas y quiz
        if (id === 'quizContainer' || classList.includes('quiz-container') || 
            classList.includes('question-card') || classList.includes('question-container') ||
            classList.includes('card') || classList.includes('card-body')) {
            
            el.style.setProperty('background-color', '#343a40', 'important');
            el.style.setProperty('color', '#f0f0f0', 'important');
            el.style.setProperty('border-color', '#495057', 'important');
            el.style.setProperty('box-shadow', '0 0.125rem 0.25rem rgba(0, 0, 0, 0.3)', 'important');
        }
        
        // Para elementos de texto
        if (tagName === 'p' || tagName === 'h1' || tagName === 'h2' || 
            tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || 
            tagName === 'h6' || tagName === 'label' || tagName === 'span' ||
            tagName === 'li') {
            
            // No cambiar color en botones
            if (!el.closest('.btn-primary') && !el.closest('.btn-success') && !el.closest('.btn-danger')) {
                el.style.setProperty('color', '#f0f0f0', 'important');
            }
        }
        
        // Detectar y corregir estilos inline de fondo blanco
        const style = el.getAttribute('style');
        if (style && (style.includes('background-color: white') || 
                      style.includes('background-color: #fff') || 
                      style.includes('background-color: #ffffff') ||
                      style.includes('background: white'))) {
            el.style.setProperty('background-color', '#343a40', 'important');
        }
    }
};

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    darkModeFixer.init();
    
    // También exponer globalmente para debug
    window.darkModeFixer = darkModeFixer;
}); 