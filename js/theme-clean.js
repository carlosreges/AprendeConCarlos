/**
 * Sistema de temas simplificado
 * Este archivo reemplaza completamente theme.js y dark-mode-fixer.js
 */

// Función principal para gestionar temas
const themeManager = {
    // Inicializar el sistema
    init() {
        console.log("🔄 Inicializando sistema de temas limpio");
        
        // Eliminar cualquier clase o atributo de tema anterior
        this.cleanupPreviousTheme();
        
        // Configurar el tema según la preferencia guardada
        this.loadSavedTheme();
        
        // Configurar el evento para cambiar el tema
        this.setupThemeToggle();
    },
    
    // Limpiar configuraciones previas de tema
    cleanupPreviousTheme() {
        // Eliminar cualquier estilo inline que pudiera haberse aplicado
        document.querySelectorAll('[style*="background-color"], [style*="color"]').forEach(el => {
            // Solo eliminar estilos relacionados con colores y fondos
            const style = el.getAttribute('style');
            if (style) {
                el.setAttribute('style', style
                    .replace(/background-color:[^;]+;?/g, '')
                    .replace(/color:[^;]+;?/g, '')
                    .replace(/border-color:[^;]+;?/g, '')
                );
                
                // Si el estilo quedó vacío, quitarlo completamente
                if (el.getAttribute('style').trim() === '') {
                    el.removeAttribute('style');
                }
            }
        });
        
        // Remover cualquier bandera o atributo de data del tema anterior
        document.body.removeAttribute('data-theme-updating');
    },
    
    // Cargar el tema guardado
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        const checkbox = document.getElementById('checkbox');
        
        if (savedTheme === 'dark') {
            this.applyDarkTheme();
            if (checkbox) checkbox.checked = true;
        } else {
            this.applyLightTheme();
            if (checkbox) checkbox.checked = false;
        }
    },
    
    // Configurar el interruptor de tema
    setupThemeToggle() {
        const checkbox = document.getElementById('checkbox');
        
        if (checkbox) {
            // Primero, eliminar cualquier evento existente clonando el elemento
            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);
            
            // Agregar el nuevo manejador de eventos
            newCheckbox.addEventListener('change', () => {
                if (newCheckbox.checked) {
                    this.applyDarkTheme();
                    localStorage.setItem('theme', 'dark');
                    this.showMessage(true);
                } else {
                    this.applyLightTheme();
                    localStorage.setItem('theme', 'light');
                    this.showMessage(false);
                }
            });
        }
    },
    
    // Aplicar tema oscuro
    applyDarkTheme() {
        document.body.classList.add('dark-mode');
        document.body.setAttribute('data-theme', 'dark');
        
        // Aplicar CSS especial para elementos que necesitan atención
        this.fixSpecialElements(true);
    },
    
    // Aplicar tema claro
    applyLightTheme() {
        document.body.classList.remove('dark-mode');
        document.body.removeAttribute('data-theme');
        
        // Restaurar elementos especiales
        this.fixSpecialElements(false);
    },
    
    // Corregir elementos que necesitan atención especial
    fixSpecialElements(isDark) {
        // Dropdown de idiomas
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (isDark) {
                dropdown.style.backgroundColor = '#2d2d2d';
                dropdown.style.borderColor = '#444';
                
                // Items dentro del dropdown
                dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                    item.style.color = '#e4e4e4';
                });
            } else {
                dropdown.style.backgroundColor = '';
                dropdown.style.borderColor = '';
                
                dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                    item.style.color = '';
                });
            }
        });
        
        // Otros elementos problemáticos (formularios, etc)
        if (isDark) {
            document.querySelectorAll('.form-control').forEach(el => {
                el.style.backgroundColor = '#2d2d2d';
                el.style.borderColor = '#444';
                el.style.color = '#e4e4e4';
            });
            
            document.querySelectorAll('.form-floating label').forEach(el => {
                el.style.color = '#adb5bd';
            });
        } else {
            document.querySelectorAll('.form-control').forEach(el => {
                el.style.backgroundColor = '';
                el.style.borderColor = '';
                el.style.color = '';
            });
            
            document.querySelectorAll('.form-floating label').forEach(el => {
                el.style.color = '';
            });
        }
        
        // Estilizar el quiz y sus elementos
        if (isDark) {
            // Estilos para el contenedor del quiz
            document.querySelectorAll('#quizContainer, .quiz-container').forEach(el => {
                el.style.backgroundColor = '#343a40';
                el.style.color = '#e4e4e4';
                el.style.maxWidth = '900px';
                el.style.margin = '0 auto';
                el.style.padding = '20px';
                el.style.borderColor = '#495057';
            });
            
            // Estilos para la tarjeta de pregunta
            document.querySelectorAll('.question-card').forEach(el => {
                el.style.backgroundColor = '#2d2d2d';
                el.style.color = '#e4e4e4';
                el.style.borderColor = '#444';
                el.style.maxWidth = '700px';
                el.style.width = '85%';
                el.style.margin = '0 auto';
                el.style.padding = '20px';
                el.style.borderRadius = '12px';
                el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
            
            // Quiz intro y su contenido
            document.querySelectorAll('#quizIntro .card').forEach(el => {
                el.style.backgroundColor = '#2d2d2d';
                el.style.color = '#e4e4e4';
                el.style.borderColor = '#444';
            });
            
            document.querySelectorAll('#quizIntro h2, #quizIntro h4, #quizIntro p, #quizIntro li').forEach(el => {
                el.style.color = '#e4e4e4';
            });
        } else {
            // Restaurar estilos en modo claro pero mantener dimensiones
            document.querySelectorAll('#quizContainer, .quiz-container').forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
                el.style.maxWidth = '900px';
                el.style.margin = '0 auto';
                el.style.padding = '20px';
                el.style.borderColor = '';
            });
            
            document.querySelectorAll('.question-card').forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
                el.style.borderColor = '';
                el.style.maxWidth = '700px';
                el.style.width = '85%';
                el.style.margin = '0 auto';
                el.style.padding = '20px';
                el.style.borderRadius = '12px';
                el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            });
            
            document.querySelectorAll('#quizIntro .card, #quizIntro h2, #quizIntro h4, #quizIntro p, #quizIntro li').forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
                el.style.borderColor = '';
            });
        }
        
        // Arreglar el temporizador
        this.fixTimer(isDark);
        
        // Arreglar los botones de navegación
        this.fixNavigationButtons(isDark);
    },
    
    // Añadir esta nueva función para el temporizador
    fixTimer(isDark) {
        const timerContainer = document.querySelector('.timer-container');
        if (!timerContainer) return;
        
        // Estilos para el contenedor del temporizador
        Object.assign(timerContainer.style, {
            position: 'fixed',
            top: '90px',
            left: '0',
            right: '0',
            margin: '0 auto',
            width: '160px',
            zIndex: '999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 15px',
            background: isDark ? 'rgba(35, 35, 35, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(4px)',
            border: `2px solid ${isDark ? '#0d6efd' : '#007bff'}`,
            transition: 'all 0.3s ease',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            pointerEvents: 'none',
            textAlign: 'center',
            color: isDark ? '#e4e4e4' : '#212529'
        });
        
        // Estilos para el icono del temporizador
        const timerIcon = timerContainer.querySelector('.timer-icon');
        if (timerIcon) {
            Object.assign(timerIcon.style, {
                marginRight: '8px',
                color: isDark ? '#0d6efd' : '#007bff',
                animation: 'timerIconPulse 2s infinite'
            });
        }
        
        // Crear animación si no existe
        if (!document.getElementById('timer-animation-style')) {
            const animStyle = document.createElement('style');
            animStyle.id = 'timer-animation-style';
            animStyle.textContent = `
                @keyframes timerIconPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(animStyle);
        }
    },
    
    // Mostrar mensaje de cambio de tema
    showMessage(isDark) {
        const message = isDark ? 'Modo oscuro activado' : 'Modo claro activado';
        
        // Eliminar mensajes anteriores
        document.querySelectorAll('.theme-message').forEach(el => el.remove());
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = 'theme-message';
        messageDiv.textContent = message;
        
        // Estilos
        Object.assign(messageDiv.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            backgroundColor: isDark ? '#333' : '#fff',
            color: isDark ? '#fff' : '#333',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: '9999',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(messageDiv);
        
        // Desaparecer después de un tiempo
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(messageDiv)) {
                    document.body.removeChild(messageDiv);
                }
            }, 500);
        }, 2000);
    },
    
    // Añadir esta función para arreglar los botones de navegación
    fixNavigationButtons(isDark) {
        const submitContainer = document.getElementById('submitContainer');
        if (!submitContainer) return;
        
        // Estilos para el contenedor de botones
        Object.assign(submitContainer.style, {
            maxWidth: '700px',
            margin: '20px auto',
            width: '85%'
        });
        
        // Buscar la fila que contiene los botones
        const buttonRow = submitContainer.querySelector('.row');
        if (buttonRow) {
            Object.assign(buttonRow.style, {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            });
        }
        
        // Estilos para el botón de retroceso
        const backButton = document.getElementById('back-button');
        if (backButton) {
            Object.assign(backButton.style, {
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            });
            
            // Estilos específicos para modo oscuro
            if (isDark) {
                Object.assign(backButton.style, {
                    backgroundColor: 'transparent',
                    borderColor: '#adb5bd',
                    color: '#adb5bd'
                });
            } else {
                Object.assign(backButton.style, {
                    backgroundColor: '',
                    borderColor: '',
                    color: ''
                });
            }
        }
        
        // Estilos para el botón de siguiente/enviar
        const submitButton = document.getElementById('submit');
        if (submitButton) {
            Object.assign(submitButton.style, {
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            });
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
});

// También inicializar ahora si el DOM ya está cargado
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    themeManager.init();
}

// Agregar al final del archivo
console.log("🔍 Verificando posibles conflictos de tema...");

// Inspeccionar si otros scripts están modificando elementos clave
setInterval(() => {
    const checkbox = document.getElementById('checkbox');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Verificar si el checkbox y el body están sincronizados
    if (checkbox && ((checkbox.checked && !isDarkMode) || (!checkbox.checked && isDarkMode))) {
        console.warn("⚠️ Detectado desajuste entre checkbox y body.dark-mode");
        
        // Sincronizar
        if (checkbox.checked) {
            themeManager.applyDarkTheme();
        } else {
            themeManager.applyLightTheme();
        }
    }
    
    // Verificar elementos clave del quiz
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer && isDarkMode && getComputedStyle(quizContainer).backgroundColor === 'rgb(255, 255, 255)') {
        console.warn("⚠️ Quiz container no tiene estilo oscuro aplicado");
        themeManager.fixSpecialElements(true);
    }
}, 1000);

// Verificación periódica para asegurar que los estilos se mantienen
setInterval(() => {
    if (document.body.classList.contains('dark-mode') || document.body.getAttribute('data-theme') === 'dark') {
        const quizContainer = document.getElementById('quizContainer');
        const timerContainer = document.querySelector('.timer-container');
        
        // Si el quiz está visible pero no tiene estilo oscuro, replicar estilos
        if (quizContainer && window.getComputedStyle(quizContainer).display !== 'none' && 
            window.getComputedStyle(quizContainer).backgroundColor !== 'rgb(52, 58, 64)') {
            themeManager.fixSpecialElements(true);
        }
        
        // Si el temporizador está visible pero no tiene estilo, arreglarlo
        if (timerContainer && window.getComputedStyle(timerContainer).backgroundColor !== 'rgba(35, 35, 35, 0.9)') {
            themeManager.fixTimer(true);
        }
        
        // Si los botones están visibles pero no tienen estilo adecuado
        const submitContainer = document.getElementById('submitContainer');
        if (submitContainer && window.getComputedStyle(submitContainer).display !== 'none') {
            themeManager.fixNavigationButtons(true);
        }
    }
}, 1000); 