class Quiz {
    constructor(questions, container) {
        console.log('[Quiz Debug]: Starting constructor with questions:', questions);
        if (!questions || !Array.isArray(questions)) {
            throw new Error('Questions must be a valid array');
        }
        this.questions = questions;
        this.quizContainer = document.getElementById(container);
        this.currentQuestion = 0;
        this.userAnswers = new Map();
        this.totalQuestions = questions.length;
        console.log(`[Quiz Debug]: Initialized with ${this.totalQuestions} questions`);
        
        // Elementos del DOM
        this.resultsContainer = document.getElementById('results');
        this.submitButton = document.getElementById('submit');
        this.loadingElement = document.getElementById('quiz-loading');
        this.statusElement = document.getElementById('quiz-status');
        
        this.hideLoadingElements();
        this.debug(`Loaded ${this.questions.length} questions`);
    }

    hideLoadingElements() {
        // Ocultar elementos de carga
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
        if (this.statusElement) {
            this.statusElement.style.display = 'none';
        }
    }

    debug(message) {
        console.log(`[Quiz Debug]: ${message}`);
        const debugOutput = document.getElementById('debug-output');
        if (debugOutput) {
            debugOutput.innerHTML += `${message}\n`;
        }
    }

    init() {
        console.log(`[Quiz Debug]: Loaded ${this.questions.length} questions`);
        this.displayQuestion();
        this.setupEventListeners();
        this.startTimer();
    }

    setupEventListeners() {
        // Limpiar eventos antiguos para evitar duplicados
        const oldSubmitButton = document.getElementById('submit');
        if (oldSubmitButton) {
            const newSubmitButton = oldSubmitButton.cloneNode(true);
            oldSubmitButton.parentNode.replaceChild(newSubmitButton, oldSubmitButton);
        }
        
        // Botón de envío/siguiente
        this.submitButton = document.getElementById('submit');
        
        // Verificar si ya existe el botón de retroceso
        const existingBackButton = document.getElementById('back-button');
        
        // Solo reorganizar si no existe ya el botón de retroceso
        if (!existingBackButton) {
            // Crear y configurar el botón de retroceso
            const submitContainer = document.getElementById('submitContainer');
            if (submitContainer) {
                const buttonRow = submitContainer.querySelector('.row') || document.createElement('div');
                if (!buttonRow.classList.contains('row')) {
                    buttonRow.className = 'row';
                    submitContainer.appendChild(buttonRow);
                }
                
                // Crear columna para el botón de retroceso
                const backCol = document.createElement('div');
                backCol.className = 'col-md-5 text-end';
                backCol.innerHTML = `
                    <button id="back-button" class="btn btn-outline-secondary btn-lg px-4 ${this.currentQuestion === 0 ? 'disabled' : ''}">
                        <i class="fas fa-arrow-left me-2"></i>Pregunta anterior
                    </button>
                `;
                
                // Asegurar que el botón de envío esté en su lugar
                const nextCol = document.createElement('div');
                nextCol.className = 'col-md-7 text-start';
                
                // Crear un nuevo botón si no existe
                if (!this.submitButton) {
                    nextCol.innerHTML = `
                        <button id="submit" class="btn btn-primary btn-lg px-4">
                            Siguiente pregunta
                        </button>
                    `;
                } else {
                    // Usar el botón existente
                    nextCol.appendChild(this.submitButton);
                }
                
                // Limpiar y reconstruir
                buttonRow.innerHTML = '';
                buttonRow.appendChild(backCol);
                buttonRow.appendChild(nextCol);
                
                // Actualizar referencia al botón de envío
                this.submitButton = document.getElementById('submit');
            }
        }
        
        // Asegurarnos de que los eventos estén correctamente asignados
        if (this.submitButton) {
            // Eliminar eventos anteriores clonando el botón
            const newSubmitButton = this.submitButton.cloneNode(true);
            this.submitButton.parentNode.replaceChild(newSubmitButton, this.submitButton);
            this.submitButton = newSubmitButton;
            
            // Agregar nuevo evento
            this.submitButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevenir comportamiento por defecto
                console.log("Botón Siguiente/Finalizar clickeado");
                
                // Verificar si se ha seleccionado una opción
                const selected = document.querySelector(`input[name="question${this.currentQuestion}"]:checked`);
                if (!selected && this.currentQuestion < this.totalQuestions) {
                    // Mostrar advertencia
                    this.showWarning('Por favor, selecciona una opción antes de continuar.');
                    return;
                }
                
                // Si hay una selección o estamos fuera del quiz, guardar y continuar
                this.saveCurrentAnswer();
                
                if (this.currentQuestion < this.totalQuestions - 1) {
                    this.nextQuestion();
                } else {
                    this.checkAnswers();
                }
            });
        }
        
        // Configurar evento para el botón de retroceso
        const backButton = document.getElementById('back-button');
        if (backButton) {
            // Eliminar eventos anteriores
            const newBackButton = backButton.cloneNode(true);
            backButton.parentNode.replaceChild(newBackButton, backButton);
            
            // Agregar nuevo evento
            newBackButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("Botón Atrás clickeado");
                this.previousQuestion();
            });
        }
        
        // Actualizar estado de botones
        this.updateNavButtons();
    }

    loadQuestions() {
        const lang = localStorage.getItem('selectedLanguage') || 'es';
        console.log('Loading questions for language:', lang);
        console.log('Translations:', translations);
        
        if (translations[lang] && translations[lang].exam && translations[lang].exam.questions) {
            this.questions = translations[lang].exam.questions;
            console.log('Questions loaded:', this.questions);
        } else {
            console.error('No questions found in translations');
        }
    }

    createProgressBar() {
        // Calcular el porcentaje de progreso
        const progressPercentage = ((this.currentQuestion + 1) * 100) / this.totalQuestions;
        
        return `
            <div class="progress mb-3" style="height: 10px;">
                <div class="progress-bar" role="progressbar" 
                     style="width: ${progressPercentage}%"
                     aria-valuenow="${this.currentQuestion + 1}"
                     aria-valuemin="0" 
                     aria-valuemax="${this.totalQuestions}"
                     title="Pregunta ${this.currentQuestion + 1} de ${this.totalQuestions}">
                </div>
            </div>
        `;
    }

    createImageContainer(question) {
        // Verificar si hay una imagen definida
        if (!question.image) return '';
        
        // Intentar cargar la imagen primero
        const imgExists = new Promise((resolve) => {
            const testImg = new Image();
            testImg.onload = () => resolve(true);
            testImg.onerror = () => resolve(false);
            testImg.src = question.image;
        });
        
        // Preparar un mensaje para imágenes faltantes
        const imgAlt = question.imageAlt || 'Imagen para la pregunta';
        
        return `
            <div class="image-container mb-4 text-center">
                <img src="${question.image}" 
                     alt="${imgAlt}"
                     class="img-fluid rounded"
                     style="max-height: 300px;"
                     onerror="this.onerror=null; this.src='img/quiz/placeholder.jpg'; this.alt='Imagen no disponible';">
                ${!imgExists ? '<p class="text-warning mt-2">La imagen original no está disponible</p>' : ''}
            </div>
        `;
    }

    createOptionsContainer(question) {
        return `
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <div class="option-item mb-3">
                        <input type="radio" 
                               id="option${index}" 
                               name="question${this.currentQuestion}"
                               value="${index}"
                               class="form-check-input"
                               ${this.userAnswers.get(this.currentQuestion) === index ? 'checked' : ''}>
                        <label for="option${index}" class="form-check-label ms-2">
                            ${option}
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const html = `
            <div class="question-card p-4 border rounded shadow-sm mb-4">
                ${this.createProgressBar()}
                <h4 class="question-text mb-4">${question.question}</h4>
                
                ${question.audio ? `
                    <div class="audio-container mb-4">
                        <audio controls class="w-100">
                            <source src="${question.audio}" type="audio/mpeg">
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                        <button class="btn btn-sm btn-info mt-2" 
                                onclick="this.nextElementSibling.classList.toggle('d-none')">
                            Ver transcripción
                        </button>
                        <div class="transcription-text mt-2 d-none font-italic">
                            ${question.audioText}
                        </div>
                    </div>
                ` : ''}
                
                ${question.image ? this.createImageContainer(question) : ''}
                
                ${this.createOptionsContainer(question)}
            </div>
        `;
        
        this.quizContainer.innerHTML = html;
        this.updateNavButtons();
        
        // Si hay audio, configuramos los controles
        if (question.audio) {
            this.setupAudioControls();
        }
        
        if (window.darkModeManager) {
            setTimeout(() => {
                window.darkModeManager.enforceCardStyles();
            }, 50);
        }
    }

    nextQuestion() {
        this.currentQuestion++;
        console.log(`[Debug] Moving to question ${this.currentQuestion}`);
        this.displayQuestion();
        this.updateNavButtons();
    }

    updateNavButtons() {
        // Actualizar botón de envío/siguiente
        if (this.submitButton) {
            const isLastQuestion = this.currentQuestion === this.totalQuestions - 1;
            this.submitButton.textContent = isLastQuestion ? 'Finalizar quiz' : 'Siguiente pregunta';
            console.log(`[Debug] Button text updated to: ${this.submitButton.textContent}`);
        }
        
        // Actualizar botón de retroceso
        const backButton = document.getElementById('back-button');
        if (backButton) {
            // Habilitar/deshabilitar según la posición actual
            if (this.currentQuestion === 0) {
                backButton.disabled = true;
                backButton.classList.add('disabled');
            } else {
                backButton.disabled = false;
                backButton.classList.remove('disabled');
            }
        }
    }

    saveCurrentAnswer() {
        const selected = document.querySelector(`input[name="question${this.currentQuestion}"]:checked`);
        if (selected) {
            const answerIndex = parseInt(selected.value);
            this.userAnswers.set(this.currentQuestion, answerIndex);
            console.log(`[Debug] Saved answer for question ${this.currentQuestion}: ${answerIndex}`);
        } else {
            console.log(`[Debug] No answer selected for question ${this.currentQuestion}`);
        }
    }

    checkAnswers() {
        let score = 0;
        let results = [];

        console.log('[Debug] Final answers:', Object.fromEntries(this.userAnswers));

        for (let i = 0; i < this.totalQuestions; i++) {
            const userAnswer = this.userAnswers.get(i);
            const correctAnswer = this.questions[i].correct;
            
            console.log(`[Debug] Question ${i}: User answered ${userAnswer}, Correct is ${correctAnswer}`);

            results.push({
                question: this.questions[i].question,
                userAnswer: userAnswer !== undefined ? this.questions[i].options[userAnswer] : 'Sin respuesta',
                correctAnswer: this.questions[i].options[correctAnswer],
                isCorrect: userAnswer === correctAnswer
            });

            if (userAnswer === correctAnswer) {
                score++;
            }
        }

        this.displayResults(score, results);
    }

    displayResults(score, results) {
        // Detener el temporizador
        const totalTimeSeconds = this.stopTimer();
        const totalMinutes = Math.floor(totalTimeSeconds / 60);
        const totalSeconds = totalTimeSeconds % 60;
        const timeDisplay = `${totalMinutes}:${String(totalSeconds).padStart(2, '0')}`;
        
        const percentage = (score / this.questions.length) * 100;
        let resultClass = percentage >= 70 ? 'text-success' : 'text-danger';

        let html = `
            <div class="results-container p-4">
                <h3 class="mb-4">Resultados del Quiz</h3>
                <div class="score-container mb-4">
                    <h4 class="${resultClass}">
                        Puntuación: ${score} de ${this.questions.length} (${percentage.toFixed(1)}%)
                    </h4>
                    <p>Tiempo total: ${timeDisplay}</p>
                </div>
                <div class="answers-review">
                    ${results.map((result, index) => `
                        <div class="answer-item mb-3 p-3 border rounded ${result.isCorrect ? 'bg-light' : 'bg-light-danger'}">
                            <p class="question-text mb-2"><strong>Pregunta ${index + 1}:</strong> ${result.question}</p>
                            <p class="user-answer mb-1">
                                Tu respuesta: 
                                <span class="${result.isCorrect ? 'text-success' : 'text-danger'}">
                                    ${result.userAnswer}
                                </span>
                            </p>
                            ${!result.isCorrect ? `
                                <p class="correct-answer mb-0 text-success">
                                    Respuesta correcta: ${result.correctAnswer}
                                </p>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-primary mt-4" onclick="location.reload()">
                    Intentar de nuevo
                </button>
            </div>
        `;

        this.quizContainer.innerHTML = html;
        
        // Agregar la celebración si el puntaje es bueno
        this.celebrateCompletion(score);
    }

    retakeQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.isSubmitted = false;
        this.resultsContainer.innerHTML = '';
        this.displayQuestion();
    }

    handleFreeResponse(question) {
        return `
            <div class="free-response-container">
                <textarea 
                    class="form-control" 
                    rows="4" 
                    placeholder="Escribe tu respuesta aquí..."
                ></textarea>
                <button class="btn btn-primary mt-2" onclick="quiz.checkFreeResponse(this)">
                    Verificar
                </button>
            </div>
        `;
    }

    calculateLevel(score) {
        const percentage = (score / this.totalQuestions) * 100;
        let level = {
            name: '',
            description: '',
            recommendation: ''
        };

        if (percentage >= 80) {
            level = {
                name: 'B1 Alto',
                description: '¡Excelente! Tienes un nivel B1 consolidado.',
                recommendation: 'Podrías comenzar a prepararte para el B2.'
            };
        } else if (percentage >= 60) {
            level = {
                name: 'B1 Medio',
                description: 'Tienes buen nivel B1, pero hay aspectos por mejorar.',
                recommendation: 'Practica más los puntos donde has tenido errores.'
            };
        } else {
            level = {
                name: 'Pre-B1',
                description: 'Aún necesitas reforzar algunos aspectos del nivel B1.',
                recommendation: 'Te recomendamos repasar los conceptos básicos del nivel.'
            };
        }

        return level;
    }

    analyzePerformance() {
        let categoryAnalysis = {
            uso_preposiciones: { correct: 0, total: 0 },
            tiempos_verbales: { correct: 0, total: 0 },
            expresiones_idiomáticas: { correct: 0, total: 0 },
            comprensión_visual: { correct: 0, total: 0 },
            cortesía_pragmática: { correct: 0, total: 0 },
            gramática_general: { correct: 0, total: 0 }
        };

        this.questions.forEach((question, index) => {
            const category = question.category;
            const userAnswer = this.userAnswers.get(index);
            
            if (categoryAnalysis[category]) {
                categoryAnalysis[category].total++;
                if (userAnswer === question.correct) {
                    categoryAnalysis[category].correct++;
                }
            }
        });

        return categoryAnalysis;
    }

    // Añadimos función para manejar la reproducción de audio
    handleAudioPlayback() {
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            // Permitimos solo dos reproducciones por pregunta
            let playCount = 0;
            audioElement.addEventListener('play', () => {
                playCount++;
                if (playCount > 2) {
                    audioElement.pause();
                    alert('Solo se permite escuchar el audio dos veces.');
                }
            });
        }
    }

    setupAudioControls() {
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            // Contador de reproducciones
            let playCount = 0;
            
            // Botones de control adicionales
            const controlsContainer = document.createElement('div');
            controlsContainer.className = 'audio-controls mt-2 d-flex justify-content-between';
            
            // Contador de reproducciones
            const playCounter = document.createElement('small');
            playCounter.className = 'text-muted';
            playCounter.textContent = 'Reproducciones: 0/2';
            
            // Control de velocidad
            const speedControl = document.createElement('select');
            speedControl.className = 'form-select form-select-sm w-auto';
            speedControl.innerHTML = `
                <option value="0.75">Velocidad: 0.75x</option>
                <option value="1" selected>Velocidad: 1x</option>
                <option value="1.25">Velocidad: 1.25x</option>
            `;
            
            controlsContainer.appendChild(playCounter);
            controlsContainer.appendChild(speedControl);
            
            audioElement.parentNode.insertBefore(controlsContainer, audioElement.nextSibling);
            
            // Eventos
            audioElement.addEventListener('play', () => {
                playCount++;
                playCounter.textContent = `Reproducciones: ${playCount}/2`;
                
                if (playCount > 2) {
                    audioElement.pause();
                    alert('Solo se permite escuchar el audio dos veces para este nivel.');
                }
            });
            
            speedControl.addEventListener('change', (e) => {
                audioElement.playbackRate = parseFloat(e.target.value);
            });
        }
    }

    // Iniciar el temporizador
    startTimer() {
        // Establecer el tiempo inicial
        this.startTime = new Date();
        this.timerInterval = null;
        
        // Crear el elemento para mostrar el tiempo de forma más prominente
        const timerElement = document.createElement('div');
        timerElement.id = 'quiz-timer';
        timerElement.className = 'quiz-timer'; 
        timerElement.innerHTML = `
            <div class="timer-container">
                <i class="fas fa-stopwatch"></i> 
                <span id="timer-display">00:00</span>
            </div>
        `;
        
        // Agregar el temporizador a la parte superior del quiz
        this.quizContainer.parentNode.insertBefore(timerElement, this.quizContainer);
        
        // Actualizar el temporizador cada segundo
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
        
        // Agregar clase para animación después de unos segundos
        setTimeout(() => {
            const timerContainer = document.querySelector('.timer-container');
            if (timerContainer) {
                timerContainer.classList.add('timer-running');
            }
        }, 5000);
    }

    // Actualizar el temporizador
    updateTimer() {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - this.startTime) / 1000); // Tiempo en segundos
        
        // Convertir a formato horas:minutos:segundos si es necesario
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        
        // Formatear con ceros iniciales
        let timeDisplay = '';
        if (hours > 0) {
            timeDisplay = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        
        // Actualizar el elemento
        const timerDisplay = document.getElementById('timer-display');
        if (timerDisplay) {
            timerDisplay.textContent = timeDisplay;
        }
    }

    // Detener el temporizador (al finalizar el quiz)
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            
            // Calcular el tiempo total
            const currentTime = new Date();
            this.totalTime = Math.floor((currentTime - this.startTime) / 1000);
            
            // Guardar en el resultado
            return this.totalTime;
        }
        return 0;
    }

    // Función para manejar el tiempo agotado
    timeOut() {
        alert('¡Se ha agotado el tiempo!');
        // Opcionalmente, finalizar el quiz automáticamente
        this.checkAnswers();
    }

    celebrateCompletion(score) {
        // Solo celebrar si obtuvo un buen puntaje (por ejemplo, más del 70%)
        const percentage = (score / this.questions.length) * 100;
        if (percentage >= 70) {
            this.showConfetti();
        }
    }

    showConfetti() {
        // Crear un canvas para el confeti
        const confettiCanvas = document.createElement('canvas');
        confettiCanvas.id = 'confetti-canvas';
        confettiCanvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;';
        document.body.appendChild(confettiCanvas);
        
        // Usar una biblioteca de confeti (debería agregarse al proyecto)
        // Aquí solo simularemos el efecto
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        // Crear partículas de confeti
        const particles = [];
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 10 + 5,
                speed: Math.random() * 3 + 2
            });
        }
        
        // Animar el confeti
        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            let stillActive = false;
            particles.forEach(p => {
                p.y += p.speed;
                p.x += Math.sin(p.y / 30) * 2;
                
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                
                if (p.y < confettiCanvas.height) {
                    stillActive = true;
                }
            });
            
            if (stillActive) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(confettiCanvas);
            }
        }
        
        animate();
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            console.log(`[Debug] Moving back to question ${this.currentQuestion}`);
            this.displayQuestion();
            this.updateNavButtons(); // Actualizamos ambos botones
        }
    }

    // Actualizar método showWarning
    showWarning(message) {
        console.log("⚠️ Mostrando advertencia:", message);
        
        // Eliminar advertencias anteriores
        const oldWarnings = document.querySelectorAll('.quiz-warning');
        oldWarnings.forEach(w => w.remove());
        
        // Crear elemento de advertencia con estilos inline para asegurar su apariencia
        const warningEl = document.createElement('div');
        warningEl.className = 'quiz-warning';
        
        // Determinar si estamos en modo oscuro
        const isDarkMode = document.body.classList.contains('dark-mode') || 
                           document.body.getAttribute('data-theme') === 'dark';
        
        // Aplicar estilos inline directamente
        warningEl.style.position = 'relative';
        warningEl.style.maxWidth = '800px';
        warningEl.style.margin = '0 auto 15px auto';
        warningEl.style.transform = 'translateY(-20px)';
        warningEl.style.opacity = '0';
        warningEl.style.transition = 'all 0.3s ease';
        warningEl.style.zIndex = '100';
        
        // Crear el contenido con estilos inline
        warningEl.innerHTML = `
            <div class="warning-container" style="
                background-color: ${isDarkMode ? '#3e1c20' : '#f8d7da'} !important;
                color: ${isDarkMode ? '#f8d7da' : '#721c24'} !important;
                padding: 12px 20px !important;
                border-radius: 8px !important;
                border-left: 5px solid #dc3545 !important;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
                font-weight: 500 !important;
                display: flex !important;
                align-items: center !important;
            ">
                <i class="fas fa-exclamation-triangle" style="
                    font-size: 1.2em !important;
                    margin-right: 10px !important;
                    color: #dc3545 !important;
                "></i>
                ${message}
            </div>
        `;
        
        // Agregar al DOM
        const questionCard = document.querySelector('.question-card');
        if (questionCard) {
            questionCard.parentNode.insertBefore(warningEl, questionCard);
            
            // Animar entrada
            setTimeout(() => {
                warningEl.style.transform = 'translateY(0)';
                warningEl.style.opacity = '1';
                
                // Agregar animación de sacudida
                const warningContainer = warningEl.querySelector('.warning-container');
                if (warningContainer) {
                    warningContainer.style.animation = 'shake 0.5s linear';
                }
            }, 10);
            
            // Remover después de un tiempo
            setTimeout(() => {
                warningEl.style.transform = 'translateY(-20px)';
                warningEl.style.opacity = '0';
                setTimeout(() => {
                    if (warningEl.parentNode) {
                        warningEl.parentNode.removeChild(warningEl);
                    }
                }, 300);
            }, 4000);
        }
        
        // Asegurar que la animación shake está definida
        let styleEl = document.getElementById('quiz-custom-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'quiz-custom-styles';
            document.head.appendChild(styleEl);
        }
        
        if (!styleEl.textContent.includes('@keyframes shake')) {
            styleEl.textContent += `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
        }
        
        // Reproducir sonido de advertencia (opcional)
        try {
            const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwMD4+Pj4+PkhISEhISFZWVlZWVmRkZGRkZHJycnJycoKCgoKCgpKSkpKSkqCgoKCgoK6urq6urrKysrKysr6+vr6+vsbGxsbGxtLS0tLS0tra2tra2uLi4uLi4urq6urq6vLy8vLy8vr6+vr6+gAAABRMYXZmNTguMTIuMTAwAAAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
            audio.play();
        } catch(e) {
            console.log("No se pudo reproducir el sonido de advertencia");
        }
    }
}

// Función para inicializar el quiz
function initializeQuiz() {
    console.log('[Quiz Debug]: Checking quiz questions:', window.quizQuestions);
    
    const loadingMessage = document.getElementById('loadingMessage');
    const quizContainer = document.getElementById('quizContainer');

    try {
        if (window.quizQuestions && Array.isArray(window.quizQuestions)) {
            console.log('[Quiz Debug]: Creating new quiz instance');
            const quiz = new Quiz(window.quizQuestions, 'quizContainer');
            quiz.init();

            if (loadingMessage) loadingMessage.style.display = 'none';
            if (quizContainer) quizContainer.style.display = 'block';
        } else {
            console.error('[Quiz Error]: Questions not properly loaded');
        }
    } catch (error) {
        console.error('[Quiz Error]:', error);
        if (loadingMessage) {
            loadingMessage.textContent = 'Error al inicializar el quiz. Por favor, recarga la página.';
        }
    }
}

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('[Quiz Debug]: DOM loaded');
    
    // Manejamos el botón de inicio
    const startQuizBtn = document.getElementById('startQuizBtn');
    if (startQuizBtn) {
        // Ocultar siempre el contenedor de envío al principio
        const submitContainer = document.getElementById('submitContainer');
        if (submitContainer) {
            submitContainer.style.display = 'none';
        }

        // Al hacer clic en "Comenzar evaluación"
        startQuizBtn.addEventListener('click', () => {
            console.log('[Quiz Debug]: Start button clicked');
            
            // Ocultamos la introducción
            const quizIntro = document.getElementById('quizIntro');
            if (quizIntro) {
                quizIntro.style.display = 'none';
            }
            
            // Mostramos el quiz
            const quizContainer = document.getElementById('quizContainer');
            if (quizContainer) {
                quizContainer.style.display = 'block';
                
                // Inicializamos el quiz directamente
                if (window.quizQuestions && Array.isArray(window.quizQuestions)) {
                    console.log('[Quiz Debug]: Initializing quiz with', window.quizQuestions.length, 'questions');
                    window.quiz = new Quiz(window.quizQuestions, 'quizContainer');
                    window.quiz.init();
                    
                    // AHORA mostramos el botón de envío, después de inicializar el quiz
                    const submitContainer = document.getElementById('submitContainer');
                    if (submitContainer) {
                        submitContainer.style.display = 'block';
                    }
                } else {
                    console.error('[Quiz Error]: Questions not properly loaded');
                    quizContainer.innerHTML = '<div class="alert alert-danger">Error al cargar las preguntas. Por favor, recarga la página.</div>';
                }
            }
        });
    } else {
        console.warn('[Quiz Debug]: Start button not found');
    }
}); 