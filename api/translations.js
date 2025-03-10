export default function handler(req, res) {
  const translations = {
    es: {
      nav: {
        home: "Home",
        about: "Sobre mí",
        blog: "Blog",
        languages: "Idiomas",
        join: "Únete ahora"
      },
      hero: {
        subtitle: "Conversaciones en vivo con un profesor nativo",
        title: "Aprende español ahora",
        description: "Explora el fascinante mundo del idioma español! Desde principiantes hasta avanzados, ofrecemos lecciones diseñadas para ti. Sumérgete en la cultura latinoamericana y desata tu potencial lingüístico.",
        cta: "Habla, lee y escucha de una manera divertida y efectiva hoy!",
        more_info: "Más información",
        join_now: "Únete ahora"
      },
      services: {
        title: "¿Cómo aprenderás español?",
        reading: "Lectura interesante",
        reading_desc: "Historias interesantes y cortas de todo Latinoamérica para practicar tu lectura.",
        online: "Clases en línea",
        online_desc: "Clases en línea para que puedas conectarte desde la comodidad de tu hogar y aprender a tu propio ritmo."
      }
    },
    en: {
      nav: {
        home: "Home",
        about: "About me",
        blog: "Blog",
        languages: "Languages",
        join: "Join now"
      },
      hero: {
        subtitle: "Live conversations with a native teacher",
        title: "Learn Spanish now",
        description: "Explore the fascinating world of Spanish! From beginners to advanced, we offer lessons designed for you. Immerse yourself in Latin American culture and unleash your linguistic potential.",
        cta: "Speak, read and listen in a fun and effective way today!",
        more_info: "More info",
        join_now: "Join now"
      },
      services: {
        title: "How will you learn Spanish?",
        reading: "Interesting Reading",
        reading_desc: "Interesting short stories from all over Latin America to practice your reading.",
        online: "Online Classes",
        online_desc: "Online classes so you can connect from the comfort of your home and learn at your own pace."
      }
    },
    pt: {
      nav: {
        home: "Home",
        about: "Sobre mim",
        blog: "Blog",
        languages: "Idiomas",
        join: "Junte-se agora"
      },
      hero: {
        subtitle: "Conversas ao vivo com um professor nativo",
        title: "Aprenda espanhol agora",
        description: "Explore o fascinante mundo do espanhol! De iniciantes a avançados, oferecemos aulas projetadas para você. Mergulhe na cultura latino-americana e liberte seu potencial linguístico.",
        cta: "Fale, leia e escute de forma divertida e eficaz hoje!",
        more_info: "Mais informações",
        join_now: "Junte-se agora"
      },
      services: {
        title: "Como você vai aprender espanhol?",
        reading: "Leitura Interessante",
        reading_desc: "Histórias interessantes e curtas de toda a América Latina para praticar sua leitura.",
        online: "Aulas Online",
        online_desc: "Aulas online para você se conectar do conforto da sua casa e aprender no seu próprio ritmo."
      }
    }
  };

  res.status(200).json(translations);
}
