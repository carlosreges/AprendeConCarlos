// Objeto con todas las traducciones
const translations = {
    es: {
        // Navegación
        "nav.home": "Inicio",
        "nav.about": "Sobre mí",
        "nav.blog": "Blog",
        "nav.languages": "Idiomas",
        "nav.join": "Únete ahora",
        "nav.exam": "Autoevaluación",
        "nav.contact": "Contacto",
        
        // Carrusel
        "carousel.title1": "Aprende español con un profesor nativo",
        "carousel.heading": "Tu aventura al Español comienza aquí",
        "carousel.text": "Clases personalizadas con un profesor nativo. Mejora tus habilidades lingüísticas con actividades atractivas y ejercicios interactivos.",
        "carousel.highlight": "¡Aprende español con un profesor experto desde cualquier lugar del mundo!",
        "carousel.button1": "Más info",
        "carousel.button2": "Únete ahora",
        "carousel.title2": "Conversaciones en vivo con un profesor nativo",
        "carousel.heading2": "Aprende Español ahora",
        "carousel.text2": "Explora el fascinante mundo del idioma español. Desde principiantes hasta avanzados, ofrecemos lecciones diseñadas para ti. Sumérgete en la cultura latinoamericana y desata tu potencial lingüístico.",
        
        // Servicios
        "services.title": "Servicios",
        "services.heading": "Lo que ofrezco",
        "services.reading.title": "Material exclusivo",
        "services.reading.text": "Material de lectura y ejercicios adaptados a tus necesidades y nivel de español.",
        "services.online.title": "Clases Online",
        "services.online.text": "Aprende desde cualquier lugar del mundo a través de plataformas como Zoom o Google Meet.",
        "services.culture.title": "Cultura latinoamericana",
        "services.culture.text": "Aprende no solo el idioma, sino también la cultura, costumbres y tradiciones de Latinoamérica.",
        "services.music.title": "Actividades con música",
        "services.music.text": "Aprende español a través de canciones y otros recursos audiovisuales interactivos.",
        
        // Sobre mí
        "about.title": "Sobre mí",
        "about.question": "¿Por qué elegirme como tu profesor?",
        "about.text1": "Soy Carlos Reges, profesor nativo de español con más de 15 años de experiencia enseñando a estudiantes de todo el mundo. Mi enfoque único combina gramática estructurada con inmersión cultural para un aprendizaje efectivo.",
        "about.skill1": "Profesor nativo venezolano",
        "about.skill2": "Experiencia internacional",
        "about.skill3": "Corrector ortográfico",
        "about.skill4": "Excelente cocinero",
        "about.skill5": "Innovador y empírico",
        "about.skill6": "Dispuesto a ayudarte",
        "about.button": "Conóceme más",
        "about.subtitle": "Mi Historia",
        "about.greeting": "¡Hola! Soy Carlos",
        "about.description": "Como docente apasionado de Lengua y Literatura, llevo más de 15 años dedicándome a compartir la riqueza del idioma español. Mi experiencia abarca desde la enseñanza de los fundamentos gramaticales hasta las complejidades de la redacción creativa y profesional.",
        "about.methodology": "Mi metodología se basa en tres pilares fundamentales:",
        "about.approach": "Me apasiona innovar en la enseñanza, implementando constantemente nuevas estrategias didácticas que garanticen un aprendizaje efectivo y duradero. Creo firmemente en adaptar las metodologías a cada estudiante, asegurando que el conocimiento se afiance de manera natural y permanente.",
        "about.pillar1": "Dominio gramatical sólido",
        "about.pillar2": "Excelencia en ortografía",
        "about.pillar3": "Habilidades avanzadas de redacción",
        "about.biography": "Nacido en Venezuela y actualmente residiendo en Córdoba, Argentina, descubrí mi pasión por la enseñanza mientras estudiaba Letras en la universidad. Con más de 15 años de experiencia como profesor de Lengua y dominio del inglés, he desarrollado un método ameno y didáctico para enseñar español.",
        "about.experience": "Mi enfoque se caracteriza por la constante búsqueda de formas innovadoras para enseñar el español latinoamericano a estudiantes no hispanohablantes. Creo firmemente que el aprendizaje de un idioma debe ser una experiencia enriquecedora y culturalmente inmersiva, no solo un ejercicio académico.",
        "about.methods_title": "Mi Estilo de Enseñanza",
        "about.method1": "Material audiovisual ameno: canciones, videos cortos y mi podcast de español",
        "about.method2": "Inmersión cultural latinoamericana: tradiciones, expresiones y contextos cotidianos",
        "about.method3": "Enseñanza gramatical concisa y didáctica, sin complicaciones innecesarias",
        "about.method4": "Desarrollo de fluidez y confianza en la conversación desde la primera clase",
        
        // Categorías
        "categories.title": "Categorías",
        "categories.heading": "Explora nuestras categorías principales",
        "categories.item1": "Gramática",
        "categories.item2": "Conversaciones en vivo",
        "categories.item3": "Ejercicios interactivos",
        "categories.item4": "Videos tutoriales",
        
        // Cursos
        "courses.title": "Mis cursos",
        "courses.heading": "Cursos populares",
        "courses.beginner": "Español para principiantes",
        "courses.intermediate": "Español intermedio",
        "courses.advanced": "Español avanzado",
        "courses.more": "Ver más",
        "courses.join": "Inscríbete",
        "courses.students": "estudiantes",
        
        // Social
        "social.title": "Sígueme",
        "social.heading": "Conectemos en redes sociales",
        "social.description": "Sigue mis redes sociales para obtener consejos diarios, ejercicios gratuitos y estar al día con las novedades.",
        
        // Contacto
        "contact.title": "Contacto",
        "contact.heading": "Contáctame para más información",
        "contact.location": "Ubicación",
        "contact.phone": "Teléfono",
        "contact.name": "Tu nombre",
        "contact.email": "Tu e-mail",
        "contact.subject": "Tema",
        "contact.message": "Mensaje",
        "contact.send": "Enviar",
        "contact.subtitle": "Contacto",
        "contact.getintouch": "Ponte en contacto",
        "contact.description": "¿Tienes dudas sobre las clases? ¿Quieres saber más sobre los cursos? Completa el formulario y me pondré en contacto contigo lo antes posible.",
        "contact.submit": "Enviar",
        
        // Footer
        "footer.links": "Enlaces importantes",
        "footer.contact": "Contacto",
        "footer.rights": "Todos los derechos reservados",
        "footer.designed": "Diseñado por",
        "footer.cookies": "Cookies",
        "footer.help": "Ayuda",
        "footer.faqs": "Preguntas frecuentes",
        "footer.contact.text": "Para consultas, por favor utiliza el formulario de contacto arriba.",
        "footer.inquiry": "Para consultas, por favor utiliza el formulario de contacto arriba."
    },
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.about": "About me",
        "nav.blog": "Blog",
        "nav.languages": "Languages",
        "nav.join": "Join now",
        "nav.exam": "Self-assessment",
        "nav.contact": "Contact",
        
        // Carousel
        "carousel.title1": "Learn Spanish with a native teacher",
        "carousel.heading": "Your Spanish Adventure starts here",
        "carousel.text": "Personalized classes with a native teacher. Improve your language skills with engaging activities and interactive exercises.",
        "carousel.highlight": "Learn Spanish with an expert teacher from anywhere in the world!",
        "carousel.button1": "More info",
        "carousel.button2": "Join now",
        "carousel.title2": "Live conversations with a native teacher",
        "carousel.heading2": "Learn Spanish now",
        "carousel.text2": "Explore the fascinating world of Spanish language. From beginners to advanced, we offer lessons designed for you. Immerse yourself in Latin American culture and unleash your linguistic potential.",
        
        // Services
        "services.title": "Services",
        "services.heading": "What I Offer",
        "services.reading.title": "Exclusive material",
        "services.reading.text": "Reading material and exercises adapted to your needs and Spanish level.",
        "services.online.title": "Online Classes",
        "services.online.text": "Learn from anywhere in the world through platforms like Zoom or Google Meet.",
        "services.culture.title": "Latin American culture",
        "services.culture.text": "Learn not only the language, but also the culture, customs and traditions of Latin America.",
        "services.music.title": "Activities with music",
        "services.music.text": "Learn Spanish through songs and other interactive audiovisual resources.",
        
        // About
        "about.title": "About me",
        "about.question": "Why choose me as your teacher?",
        "about.text1": "I'm Carlos Reges, a native Spanish teacher with over 15 years of experience teaching students from around the world. My unique approach combines structured grammar with cultural immersion for effective learning.",
        "about.skill1": "Native Venezuelan teacher",
        "about.skill2": "International experience",
        "about.skill3": "Proofreader",
        "about.skill4": "Excellent Cook",
        "about.skill5": "Innovative and Empirical",
        "about.skill6": "Ready to Help You",
        "about.button": "Learn more about me",
        "about.subtitle": "My Story",
        "about.greeting": "Hi! I'm Carlos",
        "about.description": "As a passionate Language and Literature teacher, I have spent over 15 years sharing the richness of the Spanish language. My experience ranges from teaching grammatical foundations to the complexities of creative and professional writing.",
        "about.methodology": "My methodology is based on three fundamental pillars:",
        "about.approach": "I am passionate about innovating in teaching, constantly implementing new didactic strategies that guarantee effective and lasting learning. I firmly believe in adapting methodologies to each student, ensuring that knowledge is consolidated naturally and permanently.",
        "about.pillar1": "Solid grammatical mastery",
        "about.pillar2": "Excellence in spelling",
        "about.pillar3": "Advanced writing skills",
        "about.biography": "Born in Venezuela and currently residing in Córdoba, Argentina, I discovered my passion for teaching while studying Literature at university. With over 15 years of experience as a Language teacher and fluency in English, I have developed an engaging and didactic method for teaching Spanish.",
        "about.experience": "My approach is characterized by the constant search for innovative ways to teach Latin American Spanish to non-Spanish speakers. I firmly believe that learning a language should be an enriching and culturally immersive experience, not just an academic exercise.",
        "about.methods_title": "My Teaching Style",
        "about.method1": "Engaging audiovisual material: songs, short videos, and my Spanish podcast",
        "about.method2": "Latin American cultural immersion: traditions, expressions, and everyday contexts",
        "about.method3": "Concise and didactic grammar teaching, without unnecessary complications",
        "about.method4": "Development of fluency and confidence in conversation from the first class",
        
        // Categories
        "categories.title": "Categories",
        "categories.heading": "Explore our main categories",
        "categories.item1": "Grammar",
        "categories.item2": "Live conversations",
        "categories.item3": "Interactive exercises",
        "categories.item4": "Tutorial videos",
        
        // Courses
        "courses.title": "My courses",
        "courses.heading": "Popular courses",
        "courses.beginner": "Spanish for beginners",
        "courses.intermediate": "Intermediate Spanish",
        "courses.advanced": "Advanced Spanish",
        "courses.more": "Read more",
        "courses.join": "Join now",
        "courses.students": "students",
        
        // Social
        "social.title": "Follow me",
        "social.heading": "Let's connect on social media",
        "social.description": "Follow my social networks for daily tips, free exercises, and to stay updated with the latest news.",
        
        // Contact
        "contact.title": "Contact",
        "contact.heading": "Contact me for more information",
        "contact.location": "Location",
        "contact.phone": "Phone",
        "contact.name": "Your name",
        "contact.email": "Your email",
        "contact.subject": "Subject",
        "contact.message": "Message",
        "contact.send": "Send Message",
        "contact.subtitle": "Contact",
        "contact.getintouch": "Get in touch",
        "contact.description": "Do you have questions about the classes? Want to know more about the courses? Fill out the form and I'll get back to you as soon as possible.",
        "contact.submit": "Send",
        
        // Footer
        "footer.links": "Important links",
        "footer.contact": "Contact",
        "footer.rights": "All Rights Reserved",
        "footer.designed": "Designed by",
        "footer.cookies": "Cookies",
        "footer.help": "Help",
        "footer.faqs": "FAQs",
        "footer.contact.text": "For inquiries, please use the contact form above.",
        "footer.inquiry": "For inquiries, please use the contact form above."
    },
    pt: {
        // Navegação
        "nav.home": "Início",
        "nav.about": "Sobre mim",
        "nav.blog": "Blog",
        "nav.languages": "Idiomas",
        "nav.join": "Junte-se agora",
        "nav.exam": "Autoavaliação",
        "nav.contact": "Contato",
        
        // Carrossel
        "carousel.title1": "Aprenda espanhol com um professor nativo",
        "carousel.heading": "Sua aventura ao Espanhol começa aqui",
        "carousel.text": "Aulas personalizadas com um professor nativo. Melhore suas habilidades linguísticas com atividades atraentes e exercícios interativos.",
        "carousel.highlight": "Aprenda espanhol com um professor especialista de qualquer lugar do mundo!",
        "carousel.button1": "Mais informações",
        "carousel.button2": "Junte-se agora",
        "carousel.title2": "Conversas ao vivo com um professor nativo",
        "carousel.heading2": "Aprenda Espanhol agora",
        "carousel.text2": "Explore o fascinante mundo da língua espanhola. De iniciantes a avançados, oferecemos aulas feitas para você. Mergulhe na cultura latino-americana e liberte seu potencial linguístico.",
        
        // Serviços
        "services.title": "Serviços",
        "services.heading": "O que ofereço",
        "services.reading.title": "Material exclusivo",
        "services.reading.text": "Material de leitura e exercícios adaptados às suas necessidades e nível de espanhol.",
        "services.online.title": "Aulas Online",
        "services.online.text": "Aprenda de qualquer lugar do mundo através de plataformas como Zoom ou Google Meet.",
        "services.culture.title": "Cultura latino-americana",
        "services.culture.text": "Aprenda não apenas o idioma, mas também a cultura, costumes e tradições da América Latina.",
        "services.music.title": "Atividades com música",
        "services.music.text": "Aprenda espanhol através de canções e outros recursos audiovisuais interativos.",
        
        // Sobre
        "about.title": "Sobre mim",
        "about.question": "Por que me escolher como seu professor?",
        "about.text1": "Sou Carlos Reges, professor nativo de espanhol com mais de 15 anos de experiência ensinando alunos de todo o mundo. Minha abordagem única combina gramática estruturada com imersão cultural para um aprendizado eficaz.",
        "about.skill1": "Professor nativo venezuelano",
        "about.skill2": "Experiência internacional",
        "about.skill3": "Corretor ortográfico",
        "about.skill4": "Excelente cozinheiro",
        "about.skill5": "Inovador e empírico",
        "about.skill6": "Disposto a ajudá-lo",
        "about.button": "Saiba mais sobre mim",
        "about.subtitle": "Minha História",
        "about.greeting": "Olá! Sou o Carlos",
        "about.description": "Como professor apaixonado de Língua e Literatura, dedico-me há mais de 15 anos a compartilhar a riqueza do idioma espanhol. Minha experiência abrange desde o ensino dos fundamentos gramaticais até as complexidades da redação criativa e profissional.",
        "about.methodology": "Minha metodologia é baseada em três pilares fundamentais:",
        "about.approach": "Sou apaixonado por inovar no ensino, implementando constantemente novas estratégias didáticas que garantam um aprendizado efetivo e duradouro. Acredito firmemente em adaptar as metodologias a cada aluno, garantindo que o conhecimento se estabeleça de forma natural e permanente.",
        "about.pillar1": "Domínio gramatical sólido",
        "about.pillar2": "Excelência em ortografia",
        "about.pillar3": "Habilidades avançadas de redação",
        "about.biography": "Nascido na Venezuela e atualmente residindo em Córdoba, Argentina, descobri minha paixão pelo ensino enquanto estudava Letras na universidade. Com mais de 15 anos de experiência como professor de Língua e fluência em inglês, desenvolvi um método agradável e didático para ensinar espanhol.",
        "about.experience": "Minha abordagem caracteriza-se pela busca constante de formas inovadoras de ensinar o espanhol latino-americano a estudantes não hispanófonos. Acredito firmemente que aprender um idioma deve ser uma experiência enriquecedora e culturalmente imersiva, não apenas um exercício acadêmico.",
        "about.methods_title": "Meu Estilo de Ensino",
        "about.method1": "Material audiovisual envolvente: músicas, vídeos curtos e meu podcast de espanhol",
        "about.method2": "Imersão cultural latino-americana: tradições, expressões e contextos cotidianos",
        "about.method3": "Ensino gramatical conciso e didático, sem complicações desnecessárias",
        "about.method4": "Desenvolvimento de fluência e confiança na conversação desde a primeira aula",
        
        // Categorias
        "categories.title": "Categorias",
        "categories.heading": "Explore nossas principais categorias",
        "categories.item1": "Gramática",
        "categories.item2": "Conversas ao vivo",
        "categories.item3": "Exercícios interativos",
        "categories.item4": "Vídeos tutoriais",
        
        // Cursos
        "courses.title": "Meus cursos",
        "courses.heading": "Cursos populares",
        "courses.beginner": "Espanhol para iniciantes",
        "courses.intermediate": "Espanhol intermediário",
        "courses.advanced": "Espanhol avançado",
        "courses.more": "Leia mais",
        "courses.join": "Junte-se agora",
        "courses.students": "alunos",
        
        // Social
        "social.title": "Siga-me",
        "social.heading": "Vamos nos conectar nas redes sociais",
        "social.description": "Siga minhas redes sociais para obter dicas diárias, exercícios gratuitos e ficar por dentro das novidades.",
        
        // Contacto
        "contact.title": "Contato",
        "contact.heading": "Entre em contato para mais informações",
        "contact.location": "Localização",
        "contact.phone": "Telefone",
        "contact.name": "Seu nome",
        "contact.email": "Seu email",
        "contact.subject": "Assunto",
        "contact.message": "Mensagem",
        "contact.send": "Enviar",
        "contact.subtitle": "Contato",
        "contact.getintouch": "Entre em contato",
        "contact.description": "Tem dúvidas sobre as aulas? Quer saber mais sobre os cursos? Preencha o formulário e entrarei em contato o mais breve possível.",
        "contact.submit": "Enviar",
        
        // Rodapé
        "footer.links": "Links Importantes",
        "footer.contact": "Contato",
        "footer.rights": "Todos os direitos reservados",
        "footer.designed": "Projetado por",
        "footer.cookies": "Cookies",
        "footer.help": "Ajuda",
        "footer.faqs": "Perguntas Frequentes",
        "footer.contact.text": "Para consultas, use o formulário de contato acima.",
        "footer.inquiry": "Para consultas, por favor use o formulário de contato acima."
    }
};

// Función para aplicar traducciones
function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        } else {
            console.warn(`⚠️ Falta traducción para "${key}" en idioma "${lang}"`);
        }
    });
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    // Guarda el idioma seleccionado en localStorage
    localStorage.setItem('language', lang);
    
    // Aplica las traducciones
    applyTranslations(lang);
    
    // Actualiza visualmente los botones de idioma
    document.querySelectorAll('.language-option').forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Obtén el idioma guardado o usa 'es' como predeterminado
    const currentLang = localStorage.getItem('language') || 'es';
    
    // Aplica las traducciones al cargar la página
    applyTranslations(currentLang);
    
    // Marca el idioma actual en el menú
    document.querySelectorAll('.language-option').forEach(option => {
        if (option.getAttribute('data-lang') === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}); 