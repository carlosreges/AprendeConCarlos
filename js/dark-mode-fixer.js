/**
 * Dark Mode Fixer Completo
 * Versión final que soluciona todos los problemas de estilo en modo oscuro
 */
const styleManager = {
    // Estado del sistema
    initialized: false,
    updating: false,
    isDarkMode: false,
    
    // Inicializar el sistema
    init() {
        if (this.initialized) return;
        
        console.log("🔧 Inicializando gestor de estilos unificado");
        
        // Crear nuestro elemento de estilo principal
        this.createStyleElement();
        
        // Detectar modo oscuro inicial
        this.detectDarkMode();
        
        // Configurar observadores para cambios
        this.setupObservers();
        
        // Aplicar todos los estilos iniciales
        this.applyAllStyles();
        
        // Marcar como inicializado
        this.initialized = true;
        
        // Programar verificaciones periódicas para asegurar que los estilos se mantienen
        this.scheduleChecks();
    },
    
    // Crear nuestro elemento de estilo personalizado
    createStyleElement() {
        let styleEl = document.getElementById('quiz-custom-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'quiz-custom-styles';
            document.head.appendChild(styleEl);
        }
        this.styleElement = styleEl;
        
        // Asegurarnos de que esté al final para tener prioridad
        document.head.appendChild(this.styleElement);
    },
    
    // Detectar si estamos en modo oscuro
    detectDarkMode() {
        this.isDarkMode = document.body.classList.contains('dark-mode') || 
                         document.body.getAttribute('data-theme') === 'dark';
        console.log(`🌓 Modo detectado: ${this.isDarkMode ? 'oscuro' : 'claro'}`);
    },
    
    // Configurar observadores para cambios en el tema
    setupObservers() {
        // Observar cambios en clases y atributos del body
        const observer = new MutationObserver((mutations) => {
            if (this.updating) return;
            
            const relevantChange = mutations.some(mutation => {
                return (mutation.target === document.body && 
                       (mutation.attributeName === 'class' || 
                        mutation.attributeName === 'data-theme'));
            });
            
            if (relevantChange) {
                this.detectDarkMode();
                this.applyAllStyles();
            }
        });
        
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class', 'data-theme'] 
        });
        
        // También observar cambios en el DOM para elementos dinámicos
        const contentObserver = new MutationObserver((mutations) => {
            if (this.updating) return;
            
            const hasNewElements = mutations.some(mutation => {
                return mutation.addedNodes.length > 0;
            });
            
            if (hasNewElements) {
                // Esperar un momento para que los elementos se estabilicen
                setTimeout(() => {
                    this.applyAllStyles();
                }, 100);
            }
        });
        
        contentObserver.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    },
    
    // Programar verificaciones periódicas
    scheduleChecks() {
        // Verificar cada 3 segundos si los estilos se mantienen
        setInterval(() => {
            if (!this.updating) {
                this.applyAllStyles();
            }
        }, 3000);
        
        // También verificar cuando se carga completamente la página
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.applyAllStyles();
            }, 500);
        });
    },
    
    // Aplicar todos los estilos
    applyAllStyles() {
        if (this.updating) return;
        
        this.updating = true;
        console.log("🔄 Aplicando todos los estilos");
        
        // Definir todos los estilos CSS globales
        this.defineGlobalStyles();
        
        // Aplicar estilos directamente a elementos específicos
        this.applyElementStyles();
        
        // Liberar bandera después de un tiempo
        setTimeout(() => {
            this.updating = false;
        }, 200);
    },
    
    // Definir todos los estilos CSS globales
    defineGlobalStyles() {
        this.styleElement.textContent = `
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
                
            /* Contenedor principal del quiz */
                #quizContainer {
                    max-width: 900px !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    padding: 20px !important;
                }
                
                /* Estilos del temporizador */
                .timer-container {
                    position: fixed !important;
                top: 90px !important;
                    left: 0 !important;
                    right: 0 !important;
                    margin: 0 auto !important;
                    width: 160px !important;
                z-index: 999 !important;
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
                
                /* Estilos para la barra de progreso */
                .progress {
                    height: 10px !important;
                    margin: 15px auto 25px !important;
                    max-width: 700px !important;
                    background-color: #e9ecef !important;
                    border-radius: 30px !important;
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1) !important;
                    overflow: hidden !important;
                }
                
                .progress-bar {
                    background: linear-gradient(90deg, #007bff, #00c6ff) !important;
                    border-radius: 30px !important;
                    transition: width 0.6s ease !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                .progress-bar::after {
                    content: "" !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: linear-gradient(
                        90deg,
                        rgba(255,255,255,0) 0%,
                        rgba(255,255,255,0.4) 50%,
                        rgba(255,255,255,0) 100%
                    ) !important;
                    width: 50% !important;
                    animation: shimmer 2s infinite !important;
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                
            /* Estilos para advertencias */
            .quiz-warning {
                position: relative !important;
                max-width: 800px !important;
                margin: 0 auto 15px auto !important;
                transform: translateY(-20px) !important;
                opacity: 0 !important;
                transition: all 0.3s ease !important;
                z-index: 100 !important;
            }
            
            .quiz-warning.show {
                transform: translateY(0) !important;
                opacity: 1 !important;
            }
            
            .warning-container {
                background-color: #f8d7da !important;
                color: #721c24 !important;
                    padding: 12px 20px !important;
                    border-radius: 8px !important;
                    border-left: 5px solid #dc3545 !important;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
                    font-weight: 500 !important;
                    display: flex !important;
                    align-items: center !important;
                    animation: shake 0.5s linear !important;
            }
            
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            
            .warning-container i {
                font-size: 1.2em !important;
                margin-right: 10px !important;
                color: #dc3545 !important;
            }
            
            /* Botones de navegación */
                #submitContainer {
                    max-width: 700px !important;
                    margin: 20px auto !important;
                    width: 85% !important;
                }
                
                #submitContainer .row {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                }
                
                #back-button, #submit {
                    border-radius: 10px !important;
                    padding: 10px 20px !important;
                    font-weight: 500 !important;
                    transition: all 0.3s ease !important;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
                }
                
                #back-button:hover:not(.disabled), #submit:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
                }
                
                #back-button:active:not(.disabled), #submit:active {
                    transform: translateY(0) !important;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
                }
                
            /* Estilos para el dropdown de idiomas */
            .language-selector .dropdown-menu {
                border-radius: 8px !important;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
                padding: 10px 0 !important;
                min-width: 160px !important;
            }
            
            .language-selector .dropdown-item {
                padding: 8px 20px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
            }
            
            .language-selector .dropdown-item:hover {
                background-color: #f8f9fa !important;
            }
            
            /* Estilos para modo oscuro */
            body.dark-mode .question-card,
            [data-theme="dark"] .question-card {
                background-color: #2d2d2d !important;
                border-color: #444 !important;
                color: #e4e4e4 !important;
            }
            
            body.dark-mode #quizContainer,
            [data-theme="dark"] #quizContainer {
                background-color: #222 !important;
                color: #e4e4e4 !important;
            }
            
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
            
            body.dark-mode .progress,
            [data-theme="dark"] .progress {
                background-color: #3d3d3d !important;
            }
            
            body.dark-mode .progress-bar,
            [data-theme="dark"] .progress-bar {
                background: linear-gradient(90deg, #0d6efd, #3b00c6) !important;
            }
            
            body.dark-mode .warning-container,
            [data-theme="dark"] .warning-container {
                background-color: #3e1c20 !important;
                color: #f8d7da !important;
                border-left-color: #dc3545 !important;
                }
                
                body.dark-mode #back-button,
                [data-theme="dark"] #back-button {
                    background-color: transparent !important;
                    border-color: #adb5bd !important;
                    color: #adb5bd !important;
                }
                
                body.dark-mode #back-button:hover:not(.disabled),
                [data-theme="dark"] #back-button:hover:not(.disabled) {
                    background-color: #adb5bd !important;
                    color: #212529 !important;
            }
            
                body.dark-mode .language-selector .dropdown-menu,
                [data-theme="dark"] .language-selector .dropdown-menu {
                    background-color: #2d2d2d !important;
                    border-color: #444 !important;
                }
                
                body.dark-mode .language-selector .dropdown-item,
                [data-theme="dark"] .language-selector .dropdown-item {
                    color: #e4e4e4 !important;
                }
                
                body.dark-mode .language-selector .dropdown-item:hover,
                [data-theme="dark"] .language-selector .dropdown-item:hover {
                    background-color: #3d3d3d !important;
                }
            `;
    },
    
    // Aplicar estilos directamente a elementos específicos
    applyElementStyles() {
        this.styleQuestionCards();
        this.styleTimer();
        this.styleProgressBar();
        this.styleButtonContainer();
        this.styleLanguageDropdown();
        this.styleQuizContainer();
    },
    
    // Aplicar estilos a las tarjetas de preguntas
    styleQuestionCards() {
        const cards = document.querySelectorAll('.question-card');
        cards.forEach(card => {
            card.setAttribute('style', `
                max-width: 700px !important;
                margin-left: auto !important;
                margin-right: auto !important;
                width: 85% !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                border-radius: 12px !important;
                overflow: hidden !important;
                transition: all 0.3s ease !important;
                padding: 20px !important;
                background-color: ${this.isDarkMode ? '#2d2d2d' : '#f8f9fa'} !important;
                border: 1px solid ${this.isDarkMode ? '#444' : '#dee2e6'} !important;
                color: ${this.isDarkMode ? '#e4e4e4' : '#212529'} !important;
            `);
        });
        
        // También estilizar contenedores de imágenes
        const imageContainers = document.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.setAttribute('style', `
                max-width: 90% !important;
                height: auto !important;
                margin: 20px auto 25px !important;
                text-align: center !important;
                border-radius: 8px !important;
                overflow: hidden !important;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1) !important;
            `);
            
            // Y las imágenes dentro
            const images = container.querySelectorAll('img');
            images.forEach(img => {
                img.setAttribute('style', `
                    max-width: 100% !important;
                    height: auto !important;
                    border-radius: 4px !important;
                    transition: transform 0.3s ease !important;
                `);
            });
        });
    },
    
    // Aplicar estilos al temporizador
    styleTimer() {
        const timerContainer = document.querySelector('.timer-container');
        if (!timerContainer) return;
        
        timerContainer.setAttribute('style', `
            position: fixed !important;
            top: 90px !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            width: 160px !important;
            z-index: 999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 8px 15px !important;
            background: ${this.isDarkMode ? 'rgba(35, 35, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)'} !important;
            border-radius: 20px !important;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25) !important;
            backdrop-filter: blur(4px) !important;
            border: 2px solid ${this.isDarkMode ? '#0d6efd' : '#007bff'} !important;
            transition: all 0.3s ease !important;
            font-size: 1.5rem !important;
            font-weight: bold !important;
            pointer-events: none !important;
            text-align: center !important;
            color: ${this.isDarkMode ? '#e4e4e4' : '#212529'} !important;
        `);
        
        // Estilizar el icono del temporizador
        const timerIcon = timerContainer.querySelector('.timer-icon');
        if (timerIcon) {
            timerIcon.setAttribute('style', `
                margin-right: 8px !important;
                color: ${this.isDarkMode ? '#0d6efd' : '#007bff'} !important;
                animation: timerIconPulse 2s infinite !important;
            `);
        }
    },
    
    // Aplicar estilos a la barra de progreso
    styleProgressBar() {
        const progressContainer = document.querySelector('.progress');
        if (!progressContainer) return;
        
        progressContainer.setAttribute('style', `
            height: 10px !important;
            margin: 15px auto 25px !important;
            max-width: 700px !important;
            background-color: ${this.isDarkMode ? '#3d3d3d' : '#e9ecef'} !important;
            border-radius: 30px !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1) !important;
            overflow: hidden !important;
        `);
        
        const progressBar = progressContainer.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.setAttribute('style', `
                background: ${this.isDarkMode ? 
                    'linear-gradient(90deg, #0d6efd, #3b00c6)' : 
                    'linear-gradient(90deg, #007bff, #00c6ff)'} !important;
                border-radius: 30px !important;
                transition: width 0.6s ease !important;
                position: relative !important;
                overflow: hidden !important;
            `);
            
            // Agregar efecto shimmer si no existe
            if (!progressBar.querySelector('.shimmer-effect')) {
                const shimmer = document.createElement('div');
                shimmer.className = 'shimmer-effect';
                shimmer.setAttribute('style', `
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: linear-gradient(
                        90deg,
                        rgba(255,255,255,0) 0%,
                        rgba(255,255,255,0.4) 50%,
                        rgba(255,255,255,0) 100%
                    ) !important;
                    width: 50% !important;
                    animation: shimmer 2s infinite !important;
                `);
                progressBar.appendChild(shimmer);
            }
        }
    },
    
    // Aplicar estilos al contenedor de botones
    styleButtonContainer() {
        const submitContainer = document.getElementById('submitContainer');
        if (!submitContainer) return;
        
        submitContainer.setAttribute('style', `
            max-width: 700px !important;
            margin: 20px auto !important;
            width: 85% !important;
        `);
        
        // Estilizar fila
        const row = submitContainer.querySelector('.row');
        if (row) {
            row.setAttribute('style', `
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
            `);
        }
        
        // Estilizar botones
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.setAttribute('style', `
                border-radius: 10px !important;
                padding: 10px 20px !important;
                font-weight: 500 !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
                ${this.isDarkMode ? `
                    background-color: transparent !important;
                    border-color: #adb5bd !important;
                    color: #adb5bd !important;
                ` : ''}
            `);
        }
        
        const submitButton = document.getElementById('submit');
        if (submitButton) {
            submitButton.setAttribute('style', `
                border-radius: 10px !important;
                padding: 10px 20px !important;
                font-weight: 500 !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
            `);
        }
    },
    
    // Aplicar estilos al dropdown de idiomas
    styleLanguageDropdown() {
        const dropdown = document.querySelector('.language-selector .dropdown-menu');
        if (!dropdown) return;
        
        dropdown.setAttribute('style', `
            border-radius: 8px !important;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
            padding: 10px 0 !important;
            min-width: 160px !important;
            ${this.isDarkMode ? `
                background-color: #2d2d2d !important;
                border-color: #444 !important;
            ` : ''}
        `);
        
        // Estilizar items del dropdown
        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.setAttribute('style', `
                padding: 8px 20px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
                ${this.isDarkMode ? `
                    color: #e4e4e4 !important;
                ` : ''}
            `);
        });
    },
    
    // Aplicar estilos al contenedor principal del quiz
    styleQuizContainer() {
        const quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;
        
        quizContainer.setAttribute('style', `
            max-width: 900px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding: 20px !important;
            ${this.isDarkMode ? `
                background-color: #222 !important;
                color: #e4e4e4 !important;
            ` : ''}
        `);
    }
};

// Inicializar el sistema
document.addEventListener('DOMContentLoaded', () => {
    styleManager.init();
});

// También inicializar ahora si el DOM ya está listo
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    styleManager.init();
}