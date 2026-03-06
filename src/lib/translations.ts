export type Lang = 'es' | 'qu';

export const locales = {
  es: {
    nav: { home: "Inicio", essence: "Esencia", methodology: "Metodología", admissions: "Admisiones", library: "Biblioteca", civic: "Rincón Cívico", tools: "Herramientas IA" },
    hero: {
      title1: "Formando a los líderes del mañana con ",
      titleHighlight: "amor e innovación",
      desc: "Un entorno seguro y bilingüe donde cada estudiante de Puquio descubre su potencial a través de una metodología activa y centrada en el ser humano.",
      btnPrimary: "Agenda una Visita",
      btnSecondary: "Portal para Padres",
      badgeTitle: "Admisiones Abiertas",
      badgeDesc: "Ciclo Escolar 2026"
    },
    quick: {
      calTitle: "Calendario", calDesc: "Escolar",
      menuTitle: "Menú", menuDesc: "Comedor",
      platTitle: "Plataforma", platDesc: "Académica",
      circTitle: "Circulares", circDesc: "y Avisos"
    },
    essence: {
      tag: "Por qué elegirnos",
      title: "Nuestra Esencia Educativa",
      desc: "Preparamos a nuestros estudiantes no solo para los exámenes, sino para los retos de la vida real.",
      card1Title: "Bilingüismo Real",
      card1Desc: "Enseñamos Quechua Chanka y Español, logrando que los estudiantes valoren sus raíces y se comuniquen con seguridad.",
      card2Title: "Innovación y Robótica",
      card2Desc: "Aulas equipadas con tecnología. Fomentamos el pensamiento lógico a través de la computación básica y robótica.",
      card3Title: "Educación Emocional",
      card3Desc: "Priorizamos el bienestar mental. Enseñamos empatía y respeto para formar ciudadanos íntegros."
    },
    methodology: {
      title: "Aprender haciendo, descubrir jugando.",
      desc1: "Nuestra propuesta educativa se basa en aprender haciendo. Dejamos atrás la memorización tradicional para dar paso a la curiosidad.",
      desc2: "Los alumnos son los protagonistas. Investigan, colaboran y aplican sus conocimientos en situaciones reales.",
      point1: "Grupos reducidos para atención personalizada.",
      point2: "Espacios creativos y biblioteca actualizada.",
      point3: "Acompañamiento psicopedagógico constante.",
      btn: "Conoce nuestra metodología"
    },
    admissions: {
      title: "Únete a nuestra familia",
      desc: "El proceso de admisión es simple y transparente. Estamos listos para recibirte en nuestra sede en Puquio.",
      step1Title: "Completa el formulario",
      step1Desc: "Déjanos tus datos aquí mismo y un asesor te contactará pronto.",
      step2Title: "Agenda un recorrido",
      step2Desc: "Ven a conocer nuestras instalaciones en Jr. Andamarca.",
      step3Title: "Entrevista",
      step3Desc: "Una charla amena para conocer a la familia y al estudiante.",
      formTitle: "Solicita Información",
      formNameParent: "Nombre del Padre o Tutor",
      formNameStudent: "Nombre del Alumno(a)",
      formGrade: "Grado a ingresar",
      formEmail: "Correo Electrónico",
      formPhone: "Teléfono / Celular",
      formBtn: "Enviar Solicitud",
      formPrivacy: "Tus datos están seguros. Revisa nuestra Política de Privacidad."
    },
    civic: {
      title: "Rincón Cívico Digital",
      subtitle: "Himnos y marchas para nuestras ceremonias oficiales.",
      playing: "Reproduciendo ahora",
      select: "Selecciona una marcha",
      all: "Lista de Reproducción",
      stop: "Detener todo",
      loading: "Cargando audio...",
      repeat: "Repetir",
      tracks: { himno: "Himno Nacional del Perú", marcha: "Marcha de Banderas", desfile: "Marcha Militar (Desfile)", artist: "Versión Oficial" }
    },
    library: {
      welcome: "¡Bienvenidos a vuestra Biblioteca!",
      subtitle: "Explora mundos increíbles con los colores de nuestra escuela.",
      searchPlace: "Escribe el nombre de un libro...",
      all: "🌟 Todos",
      tales: "🦄 Cuentos",
      science: "🚀 Ciencia",
      history: "🏰 Historia",
      values: "❤️ Valores",
      readBtn: "📖 Leer ahora",
      noResults: "🔍 No encontramos resultados.",
      todos: "🌟 Todos",
      cuentos: "🦄 Cuentos",
      ciencia: "🚀 Ciencia",
      historia: "🏰 Historia",
      valores: "❤️ Valores",
    },
    footer: {
      desc: "Educación primaria de excelencia enfocada en el desarrollo integral y tecnológico en Puquio, Lucanas.",
      linksTitle: "Enlaces Rápidos",
      contactTitle: "Contacto",
      address: "JR. Andamarca S/N, Puquio - Lucanas, Ayacucho.",
      whatsappTitle: "¿Dudas Rápidas?",
      whatsappDesc: "Escríbenos directamente por WhatsApp.",
      whatsappBtn: "Chat en WhatsApp",
      rights: "Todos los derechos reservados."
    },
    back: "Volver"
  },
  qu: {
    nav: { home: "Qallariy", essence: "Yachayninchik", methodology: "Yachachiy Ñan", admissions: "Qillqakuy", library: "Ñawinchana Wasi", civic: "Llaqta Taki", tools: "IA Llamkanakuna" },
    hero: {
      title1: "Paqarin pusaqkunata wiñachispa ",
      titleHighlight: "munakuywan musuq yachaywanpas",
      desc: "Sumaq yachay wasi Puquio llaqtapi, iskay simipi yachachiq, sapa wamrata chaninchaq chaynapi sunqunpa munayninta tarinanpaq.",
      btnPrimary: "Watukamuwayku",
      btnSecondary: "Tayta-Mamakunapaq",
      badgeTitle: "Admisiones Abiertas",
      badgeDesc: "Ciclo Escolar 2026"
    },
    quick: {
      calTitle: "Yachay Pacha", calDesc: "Kalandaryu",
      menuTitle: "Mikhuna Wasi", menuDesc: "Mikhuy",
      platTitle: "Yachay Llika", platDesc: "Plataforma",
      circTitle: "Willakuykuna", circDesc: "Willakuy"
    },
    essence: {
      tag: "Imamanta akllawankiku",
      title: "Sumaq Yachayninchik",
      desc: "Yachakuqninchiktaqa kawsaypi sasachakuykunata atipananpaqmi yachachiyku.",
      card1Title: "Iskay Simipi Yachay",
      card1Desc: "Runasimi chaymanta Español simipipas wamrakunata yachachiyku.",
      card2Title: "Musuq Yachay (Robótica)",
      card2Desc: "Musuq antakunakunawan yachachiyku yuyayninta kicharinanpaq.",
      card3Title: "Sunqu Yachay",
      card3Desc: "Wamrakunapa sunquntam kallpanchayku sumaqta kawsanankupaq."
    },
    methodology: {
      title: "Pukllaspa yachay, ruwaspa yachay.",
      desc1: "Yachachiyninchikqa ruwaspa yachaymi. Manam umallapichu waqaychanku.",
      desc2: "Yachakuqkunaqa kikinmi yachayninta maskanku yanapanakuspa.",
      point1: "Pisilla wamrakuna yachay wasi ukupi.",
      point2: "Musuq imakuna ruwanapaq wasikuna.",
      point3: "Yachaqkuna wamrakunata yanapan.",
      btn: "Yachachiy ñanninchikta riqsiy"
    },
    admissions: {
      title: "Ayllunchikman yaykumuy",
      desc: "Qillqakuyqa manam sasachu. Suyachkaykikum Jr. Andamarca ñanpi.",
      step1Title: "Rapita huntachiy",
      step1Desc: "Kaypi sutikita saqiy, huk llankakuqmi qayamusunki.",
      step2Title: "Watukamuwayku",
      step2Desc: "Yachay wasinchikta riqsimuy Jr. Andamarca ñanpi.",
      step3Title: "Tapukuykuna",
      step3Desc: "Aylluta riqsinapaq rimananchik.",
      formTitle: "Willakuyta Mañakuy",
      formNameParent: "Tayta/Mamapa Sutin",
      formNameStudent: "Yachakuqpa Sutin",
      formGrade: "Mayqan ñiqiman",
      formEmail: "Chaski (Correo)",
      formPhone: "Karu Rimay (Teléfono)",
      formBtn: "Apachiy",
      formPrivacy: "Tus datos están seguros. Revisa nuestra Política de Privacidad."
    },
    civic: {
      title: "Llaqta Taki Ukhu",
      subtitle: "Llaqtanchikpa takinkuna yuyaychanapaq.",
      playing: "Kunan takichkan",
      select: "Huk takita akllay",
      all: "Takiqkuna",
      stop: "Sayachiy",
      loading: "Uyariykunata cargachkan...",
      repeat: "Kutipay",
      tracks: { himno: "Perú Llaqta Taki", marcha: "Wiphala Takiy", desfile: "Sipas Wayna Marcha", artist: "Sumaq takiy" }
    },
    library: {
      welcome: "¡Hamuyku Ñawinchana Wasiman!",
      subtitle: "Sumaq qillqakunata ñawinchaspa yachayniykita mastariy.",
      searchPlace: "Qillqapa sutinta qillqay...",
      all: "🌟 Lliw",
      tales: "🦄 Willakuykuna",
      science: "🚀 Hamutay",
      history: "🏰 Ñawpa Kawsay",
      values: "❤️ Sumaq Kawsay",
      readBtn: "📖 Ñawinchay",
      noResults: "🔍 Manam tarikunchu.",
      todos: "🌟 Lliw",
      cuentos: "🦄 Willakuykuna",
      ciencia: "🚀 Hamutay",
      historia: "🏰 Ñawpa Kawsay",
      valores: "❤️ Sumaq Kawsay",
    },
    footer: {
      desc: "Sumaq yachay, musuq antakunakunawan paqarin pusaqkunata wiñachinapaq Puquio llaqtapi.",
      linksTitle: "Utqaylla Llikakuna",
      contactTitle: "Rimakuy",
      address: "JR. Andamarca S/N, Puquio - Lucanas, Ayacucho.",
      whatsappTitle: "¿Tapukuykuna?",
      whatsappDesc: "WhatsApp nisqanpi qillqamuwayku.",
      whatsappBtn: "WhatsApp Rimay",
      rights: "Lliw hayñikuna waqaychasqa."
    },
    back: "Kutiy"
  }
};
