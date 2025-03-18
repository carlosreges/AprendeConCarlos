/**
 * Dark Mode Fixer Completo
 * Versión final que soluciona todos los problemas de estilo en modo oscuro
 */
const darkModeManager = {
    // Estado interno para prevenir bucles
    updating: false,
    initialized: false,
    
    // Inicializar el sistema una sola vez
    init() {
        if (this.initialized) return;
        
        console.log("🔧 Inicializando gestor de modo oscuro unificado");
        
        // Reemplazar todas las funciones de cambio de tema
        this.overrideThemeFunctions();
        
        // Aplicar estilos una vez al inicio
        this.applyStyles();
        
        // Marcar como inicializado
        this.initialized = true;
    },
    
    // Anular todas las funciones de tema existentes
    overrideThemeFunctions() {
        // Si existe la función en theme.js, sobrescribirla
        if (window.applyDarkModeToQuiz) {
            const originalFn = window.applyDarkModeToQuiz;
            window.applyDarkModeToQuiz = () => {
                // No hacer nada, nuestra función se encargará
                console.log("🛑 Función original de tema interceptada");
            };
        }
        
        // Observar cambios en el body o en atributos data-theme
        const observer = new MutationObserver((mutations) => {
            if (this.updating) return;
            
            const relevantChange = mutations.some(mutation => {
                return (mutation.target === document.body && 
                       (mutation.attributeName === 'class' || 
                        mutation.attributeName === 'data-theme'));
            });
            
            if (relevantChange) {
                this.applyStyles();
            }
        });
        
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class', 'data-theme'] 
        });
    },
    
    // Aplicar todos los estilos necesarios
    applyStyles() {
        if (this.updating) return;
        
        // Establecer bandera para evitar bucles
        this.updating = true;
        console.log("🔄 Aplicando estilos unificados");
        
        // Determinar si estamos en modo oscuro
        const isDarkMode = document.body.classList.contains('dark-mode') || 
                          document.body.getAttribute('data-theme') === 'dark';
        
        // Aplicar estilos a elementos del quiz
        this.applyQuizStyles(isDarkMode);
        
        // Liberar bandera después de un tiempo
                setTimeout(() => {
            this.updating = false;
        }, 200);
    },
    
    // Aplicar estilos específicos al quiz
    applyQuizStyles(isDarkMode) {
        const quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;
        
        // Aplicar estilos al contenedor principal
        if (isDarkMode) {
            quizContainer.style.backgroundColor = '#2d2d2d';
            quizContainer.style.color = '#e4e4e4';
            quizContainer.style.borderColor = '#444';
        } else {
            quizContainer.style.backgroundColor = '';
            quizContainer.style.color = '';
            quizContainer.style.borderColor = '';
        }
        
        // Arreglar estilos del temporizador
        this.fixTimerStyles(isDarkMode);
        
        // Arreglar el ancho de la tarjeta de preguntas
        this.fixQuestionCardWidth();
        
        // Asegurarse de que los botones de navegación funcionan
        this.fixNavigationButtons();
    },
    
    // Añadir esta nueva función al objeto darkModeManager
    fixQuestionCardWidth() {
        // Buscar todas las tarjetas de preguntas
        const questionCards = document.querySelectorAll('.question-card');
        if (questionCards.length === 0) return;
        
        // Agregar estilos globales si no existen
        const styleEl = document.getElementById('quiz-custom-styles') || 
                       (() => {
                           const el = document.createElement('style');
                           el.id = 'quiz-custom-styles';
                           document.head.appendChild(el);
                           return el;
                       })();
        
        // Verificar si necesitamos actualizar los estilos de la tarjeta
        if (!styleEl.textContent.includes('.question-card {') || 
            !styleEl.textContent.includes('max-width: 700px')) {
            
            // Extraer y actualizar los estilos de la tarjeta
            const existingStyles = styleEl.textContent.replace(
                /\/\* Estilos para tarjetas de preguntas \*\/[\s\S]*?#quizContainer \{[\s\S]*?}/g, 
                ''
            );
            
            styleEl.textContent = existingStyles + `
                /* Estilos para tarjetas de preguntas */
                .question-card {
                    max-width: 700px !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    width: 85% !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                    border-radius: 12px !important;
                    overflow: hidden !important;
                    transition: all 0.3s ease !important;
                    padding: 20px !important;
                    background-color: #f8f9fa !important;
                    border: 1px solid #dee2e6 !important;
                }
                
                .question-card:hover {
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2) !important;
                    transform: translateY(-3px) !important;
                }
                
                /* Estilos para el contenedor de imágenes */
                .image-container {
                    max-width: 90% !important;
                    height: auto !important;
                    margin: 20px auto 25px !important;
                    text-align: center !important;
                    border-radius: 8px !important;
                    overflow: hidden !important;
                    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1) !important;
                }
                
                .image-container img {
                    max-width: 100% !important;
                    height: auto !important;
                    border-radius: 4px !important;
                    transition: transform 0.3s ease !important;
                }
                
                .image-container img:hover {
                    transform: scale(1.02) !important;
                }
                
                /* Asegurar que el contenedor del quiz no sea demasiado ancho */
                #quizContainer {
                    max-width: 900px !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    padding: 20px !important;
                }
                
                /* Estilos para modo oscuro */
                body.dark-mode .question-card,
                [data-theme="dark"] .question-card {
                    background-color: #2d2d2d !important;
                    border-color: #444 !important;
                    color: #e4e4e4 !important;
                }
            `;
        }
        
        // Aplicar estilos directamente a las tarjetas existentes
        questionCards.forEach(card => {
            card.style.maxWidth = '700px';
            card.style.width = '85%';
            card.style.borderRadius = '12px';
            card.style.padding = '20px';
            
            // Aplicar estilos adicionales según el tema
            const isDarkMode = document.body.classList.contains('dark-mode') || 
                              document.body.getAttribute('data-theme') === 'dark';
            
            if (isDarkMode) {
                card.style.backgroundColor = '#2d2d2d';
                card.style.borderColor = '#444';
                card.style.color = '#e4e4e4';
            } else {
                card.style.backgroundColor = '#f8f9fa';
                card.style.borderColor = '#dee2e6';
                card.style.color = '#212529';
            }
        });
    },
    
    // Añadir esta nueva función al objeto darkModeManager
    fixTimerStyles(isDarkMode) {
        const timerContainer = document.querySelector('.timer-container');
        
        // Crear o actualizar estilos globales para el temporizador
        const styleEl = document.getElementById('quiz-custom-styles') || 
                       (() => {
                           const el = document.createElement('style');
                           el.id = 'quiz-custom-styles';
                           document.head.appendChild(el);
                           return el;
                       })();
        
        // Actualizar los estilos del temporizador para evitar el problema del scroll
        if (!styleEl.textContent.includes('.timer-container {') || 
            styleEl.textContent.includes('transform: translateX(-50%)')) {
            // Reemplazar los estilos del temporizador existentes
            const existingStyles = styleEl.textContent.replace(
                /\/\* Estilos del temporizador \*\/[\s\S]*?body\.dark-mode \.timer-icon,[\s\S]*?}/g, 
                ''
            );
            
            styleEl.textContent = existingStyles + `
                /* Estilos del temporizador */
                .timer-container {
                    position: fixed !important;
                    top: 10px !important;
                    left: 0 !important;
                    right: 0 !important;
                    margin: 0 auto !important;
                    width: 160px !important;
                    z-index: 1000 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 8px 15px !important;
                    background: rgba(255, 255, 255, 0.9) !important;
                    border-radius: 20px !important;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25) !important;
                    backdrop-filter: blur(4px) !important;
                    border: 2px solid #007bff !important;
                    transition: all 0.3s ease !important;
                    font-size: 1.5rem !important;
                    font-weight: bold !important;
                    pointer-events: none !important;
                    text-align: center !important;
                }
                
                .quiz-timer {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .timer-icon {
                    margin-right: 8px !important;
                    color: #007bff !important;
                    animation: timerIconPulse 2s infinite !important;
                }
                
                @keyframes timerIconPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                
                /* Estilos para modo oscuro */
                body.dark-mode .timer-container,
                [data-theme="dark"] .timer-container {
                    background: rgba(35, 35, 35, 0.9) !important;
                    color: #e4e4e4 !important;
                    border-color: #0d6efd !important;
                }
                
                body.dark-mode .timer-icon,
                [data-theme="dark"] .timer-icon {
                    color: #0d6efd !important;
                }
            `;
        }
        
        // Actualizar el temporizador existente si ya está en el DOM
        if (timerContainer) {
            // Centrar usando márgenes automáticos
            timerContainer.style.left = '0';
            timerContainer.style.right = '0';
            timerContainer.style.margin = '0 auto';
            timerContainer.style.transform = 'none'; // Eliminar transform
            timerContainer.style.width = '160px';
            
            // Ajustar tamaño y apariencia
            timerContainer.style.fontSize = '1.5rem';
            timerContainer.style.padding = '8px 15px';
            timerContainer.style.borderRadius = '20px';
            
            // Aplicar estilos según el tema
            if (isDarkMode) {
                timerContainer.style.background = 'rgba(35, 35, 35, 0.9)';
                timerContainer.style.color = '#e4e4e4';
                timerContainer.style.borderColor = '#0d6efd';
            } else {
                timerContainer.style.background = 'rgba(255, 255, 255, 0.9)';
                timerContainer.style.color = '#212529';
                timerContainer.style.borderColor = '#007bff';
            }
            
            // Modificar la animación para que solo afecte al ícono, no al temporizador completo
            const timerElement = timerContainer.querySelector('.quiz-timer');
            if (timerElement) {
                timerElement.style.animation = 'none'; // Quitar animación del contenedor
                
                // Asegurar que el ícono tiene la animación
                const timerIcon = timerElement.querySelector('.timer-icon');
                if (timerIcon) {
                    timerIcon.style.animation = 'timerIconPulse 2s infinite';
                }
            }
        }
    },
    
    // Arreglar los botones de navegación
    fixNavigationButtons() {
        const submitButton = document.getElementById('submit');
        const backButton = document.getElementById('back-button');
        
        // Si no existen ambos botones o ya tienen eventos, salir
        if (!submitButton || submitButton.dataset.fixed === 'true') return;
        
        // Marcar como arreglado
        submitButton.dataset.fixed = 'true';
        
        // Obtener la instancia de Quiz
        const quizInstance = window.quiz;
        if (!quizInstance) return;
        
        console.log("🔧 Fijando botones de navegación");
        
        // Reemplazar setupEventListeners con una versión segura
        const originalSetup = quizInstance.setupEventListeners;
        quizInstance.setupEventListeners = function() {
            // Llamar a la función original con algunos ajustes
            originalSetup.call(this);
            
            // Y asegurarnos de que los eventos están correctamente asignados
            darkModeManager.ensureButtonEvents(this);
        };
        
        // Forzar llamada para arreglar botones existentes
        this.ensureButtonEvents(quizInstance);
    },
    
    // Asegurar que los eventos de los botones están correctamente asignados
    ensureButtonEvents(quizInstance) {
        const submitButton = document.getElementById('submit');
        if (submitButton && !submitButton.dataset.listenerAttached) {
            // Limpiar eventos anteriores
            const newSubmitButton = submitButton.cloneNode(true);
            submitButton.parentNode.replaceChild(newSubmitButton, submitButton);
            
            // Agregar nuevo evento explícitamente
            newSubmitButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("📣 Botón Siguiente/Finalizar clickeado (fijado)");
                
                // Verificar selección
                const selected = document.querySelector(`input[name="question${quizInstance.currentQuestion}"]:checked`);
                if (!selected && quizInstance.currentQuestion < quizInstance.totalQuestions) {
                    quizInstance.showWarning('Por favor, selecciona una opción antes de continuar.');
                    return;
                }
                
                // Proceder normalmente
                quizInstance.saveCurrentAnswer();
                
                if (quizInstance.currentQuestion < quizInstance.totalQuestions - 1) {
                    quizInstance.nextQuestion();
                } else {
                    quizInstance.checkAnswers();
                }
            });
            
            newSubmitButton.dataset.listenerAttached = 'true';
        }
        
        // Aplicar el mismo enfoque al botón de retroceso
        const backButton = document.getElementById('back-button');
        if (backButton && !backButton.dataset.listenerAttached) {
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            
            newBackButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("📣 Botón Atrás clickeado (fijado)");
                quizInstance.previousQuestion();
            });
            
            newBackButton.dataset.listenerAttached = 'true';
        }
    }
};

// Inicializar el sistema al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    darkModeManager.init();
});

// También inicializar ahora si el DOM ya está listo
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    darkModeManager.init();
}