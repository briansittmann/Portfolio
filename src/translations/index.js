const translations = {
  en: {
    nav: {
      about:    'About',
      projects: 'Projects',
      contact:  'Contact',
    },
    hero: {
      badge:    'Available for new opportunities',
      title:    'Junior Full Stack',
      highlight:'Developer',
      subtitle: 'Java Spring Boot | React Native. Crafting fluid digital experiences with architectural precision.',
      cv:       'Download CV',
      github:   'GitHub',
      linkedin: 'LinkedIn',
    },
    about: {
      title:     'My',
      highlight: 'Background',
      p1: 'With a strong foundation in Multi-platform Application Development (DAM), I approach coding as a blend of logic and aesthetics. My journey started with a fascination for how data flows through systems, leading me to specialise in robust backend architectures.',
      p2: 'I focus on creating scalable Java Spring Boot services that serve as the reliable backbone for intuitive, fluid mobile and web interfaces. My philosophy: clean code is the bridge between complexity and great user experience.',
      location:          'Valencia',
      locationLabel:     'Base Location',
      availability:      'Remote',
      availabilityLabel: 'Availability',
      cards: [
        { title: 'Backend Focus',  desc: 'Developing resilient APIs and efficient database schemas.' },
        { title: 'Mobile First',   desc: 'Building cross-platform apps with React Native.' },
        { title: 'Clean Code',     desc: 'Adhering to SOLID principles and patterns.' },
        { title: 'Continuous',     desc: 'Passionate about DevOps and automation CI/CD.' },
      ],
    },
    projects: {
      title:     'Selected',
      highlight: 'Works',
      subtitle:  'A showcase of full-stack engineering, from complex data models to polished interfaces.',
      count:     '03 Featured Projects',
      items: [
        {
          tags:  ['React Native', 'Spring Boot', 'MongoDB'],
          title: 'CalorIA',
          desc:  'AI-powered nutrition mobile app that tracks daily calories and macros, logs foods via a local catalog or an OpenAI assistant, and generates personalized recipes based on remaining nutrients, preferences and allergies.',
          label: 'View App',
          details: [
            { icon: 'robot_2',    title: 'AI Integration', desc: 'Two custom OpenAI assistants analyze foods in real time and generate personalized recipes based on remaining macros, dietary preferences and allergies.' },
            { icon: 'lock',       title: 'JWT Security',   desc: 'Stateless auth with Spring Security. Token stored locally via AsyncStorage and auto-injected in every request through an Axios interceptor.' },
          ],
        },
        {
          tags:  ['React Native', 'Firebase'],
          title: 'FitTrack Mobile',
          desc:  'Cross-platform mobile application for personalized workout tracking with real-time data sync.',
          label: 'View App',
        },
        {
          tags:  ['Unity', 'C#'],
          title: 'Frog Ninja',
          desc:  'A 2D platformer built in Unity to explore C# game development and level design. Guide a ninja frog through hand-crafted stages full of obstacles and enemies.',
          label: 'View Game',
        },
      ],
    },
    skills: {
      ecosystemTitle:     'Technical',
      ecosystemHighlight: 'Ecosystem',
      methodologyTitle:   'Methodology',
      methodology: [
        { icon: 'groups',       title: 'Agile Mindset',       desc: 'Iterative delivery with high focus on stakeholder feedback and rapid prototyping.' },
        { icon: 'commit',       title: 'Git Workflow',         desc: 'Strict feature branching and thorough code reviews to maintain repository health.' },
        { icon: 'architecture', title: 'Clean Architecture',   desc: 'Decoupling business logic from frameworks to ensure long-term maintainability.' },
      ],
    },
    contact: {
      title:     "Let's",
      highlight: 'Collaborate',
      subtitle:  'Currently based in Valencia, Spain. Open to remote roles and interesting local projects.',
      location:  'Valencia, Spain',
      cta:       'Start a Conversation',
    },
    footer: {
      copyright: '© 2025 Brian Sittmann. All rights reserved.',
      links: ['Projects', 'Experience', 'Contact', 'Github', 'LinkedIn'],
    },
  },

  es: {
    nav: {
      about:    'Sobre mí',
      projects: 'Proyectos',
      contact:  'Contacto',
    },
    hero: {
      badge:    'Disponible para nuevas oportunidades',
      title:    'Desarrollador Full Stack',
      highlight:'Junior',
      subtitle: 'Java Spring Boot | React Native. Creando experiencias digitales fluidas con precisión arquitectónica.',
      cv:       'Descargar CV',
      github:   'GitHub',
      linkedin: 'LinkedIn',
    },
    about: {
      title:     'Mi',
      highlight: 'Trayectoria',
      p1: 'Con una sólida base en Desarrollo de Aplicaciones Multiplataforma (DAM), enfoco el código como una mezcla entre lógica y estética. Mi camino comenzó con la fascinación por cómo fluyen los datos en los sistemas, lo que me llevó a especializarme en arquitecturas backend robustas.',
      p2: 'Me enfoco en crear servicios escalables con Java Spring Boot que sirvan como base sólida para interfaces móviles y web intuitivas y fluidas. Mi filosofía: el código limpio es el puente entre la complejidad y una gran experiencia de usuario.',
      location:          'Valencia',
      locationLabel:     'Ubicación',
      availability:      'Remoto',
      availabilityLabel: 'Disponibilidad',
      cards: [
        { title: 'Enfoque Backend',  desc: 'Desarrollo de APIs resilientes y esquemas de base de datos eficientes.' },
        { title: 'Mobile First',     desc: 'Construcción de apps multiplataforma con React Native.' },
        { title: 'Código Limpio',    desc: 'Aplicación de principios SOLID y patrones de diseño.' },
        { title: 'Mejora Continua',  desc: 'Apasionado por DevOps y la automatización CI/CD.' },
      ],
    },
    projects: {
      title:     'Trabajos',
      highlight: 'Destacados',
      subtitle:  'Una muestra de ingeniería full-stack, desde modelos de datos complejos hasta interfaces pulidas.',
      count:     '03 Proyectos Destacados',
      items: [
        {
          tags:  ['React Native', 'Spring Boot', 'MongoDB'],
          title: 'CalorIA',
          desc:  'App móvil de nutrición impulsada por IA que registra calorías y macros, registra alimentos mediante un catálogo local o un asistente OpenAI, y genera recetas personalizadas según los nutrientes restantes, preferencias y alergias.',
          label: 'Ver App',
          details: [
            { icon: 'robot_2', title: 'Integración IA',   desc: 'Dos asistentes OpenAI personalizados analizan alimentos en tiempo real y generan recetas basadas en los macros restantes, preferencias dietéticas y alergias.' },
            { icon: 'lock',    title: 'Seguridad JWT',    desc: 'Autenticación sin estado con Spring Security. Token almacenado localmente con AsyncStorage e inyectado automáticamente en cada petición mediante un interceptor Axios.' },
          ],
        },
        {
          tags:  ['React Native', 'Firebase'],
          title: 'FitTrack Mobile',
          desc:  'Aplicación móvil multiplataforma para seguimiento personalizado de entrenamientos con sincronización en tiempo real.',
          label: 'Ver App',
        },
        {
          tags:  ['Unity', 'C#'],
          title: 'Frog Ninja',
          desc:  'Plataformer 2D desarrollado en Unity para explorar C# y el diseño de niveles. Guía a un ninja rana por fases llenas de obstáculos y enemigos.',
          label: 'Ver Juego',
        },
      ],
    },
    skills: {
      ecosystemTitle:     'Ecosistema',
      ecosystemHighlight: 'Técnico',
      methodologyTitle:   'Metodología',
      methodology: [
        { icon: 'groups',       title: 'Mentalidad Ágil',        desc: 'Entrega iterativa con alto foco en el feedback de stakeholders y prototipado rápido.' },
        { icon: 'commit',       title: 'Flujo con Git',          desc: 'Ramificación estricta por feature y revisiones de código para mantener la salud del repositorio.' },
        { icon: 'architecture', title: 'Arquitectura Limpia',    desc: 'Desacoplamiento de la lógica de negocio de los frameworks para asegurar mantenibilidad a largo plazo.' },
      ],
    },
    contact: {
      title:     'Trabajemos',
      highlight: 'Juntos',
      subtitle:  'Actualmente en Valencia, España. Disponible para roles remotos y proyectos locales interesantes.',
      location:  'Valencia, España',
      cta:       'Iniciar Conversación',
    },
    footer: {
      copyright: '© 2025 Brian Sittmann. Todos los derechos reservados.',
      links: ['Proyectos', 'Experiencia', 'Contacto', 'Github', 'LinkedIn'],
    },
  },
}

export default translations
