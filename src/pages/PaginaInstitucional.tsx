import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, BookOpen, Globe2, Cpu, Heart, ChevronRight, ChevronLeft, Clock, Users, Star, Bell, Share2, ThumbsUp, MessageSquare, Award, GraduationCap, Megaphone, Image as ImageIcon, Target, Eye, Music, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import heroPortada from '@/assets/hero-portada.jpg';
import logoInstitucional from '@/assets/logo-institucional.png';
import carruselPlantones1 from '@/assets/carrusel-plantones-1.jpg';
import carruselPlantones2 from '@/assets/carrusel-plantones-2.jpg';
import carruselDesfile from '@/assets/carrusel-desfile.jpg';

/* ─── Banner Slider Data ─── */
const bannerSlides = [
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    titleEs: 'Día del Logro y Feria de Ciencias',
    titleQu: 'Atipay Punchaw chaymanta Hamutay Rantikuy',
    subtitleEs: 'Celebramos los logros de nuestros estudiantes con orgullo y alegría.',
    subtitleQu: 'Yachakuqkunapa atipayninkunata kusikuywan yupaychayku.',
    tagEs: '🏆 Evento Próximo',
    tagQu: '🏆 Hamuq Raymi',
  },
  {
    id: 4,
    image: carruselPlantones1,
    titleEs: 'Sembrando vida: Campaña de Reforestación',
    titleQu: 'Kawsayta Tarpuspa: Sachakunata Tarpuy',
    subtitleEs: 'Nuestros estudiantes participan activamente en el cuidado del medio ambiente.',
    subtitleQu: 'Yachakuqninchikkuna pachamamata waqaychaypi yanapanku.',
    tagEs: '🌱 Conciencia Ambiental',
    tagQu: '🌱 Pachamama Yachay',
  },
  {
    id: 5,
    image: carruselPlantones2,
    titleEs: 'Educación con Valores y Responsabilidad Ecológica',
    titleQu: 'Chaninchaywan Pachamamapaq Yachachiy',
    subtitleEs: 'Formamos ciudadanos comprometidos con su comunidad y la naturaleza.',
    subtitleQu: 'Ayllunwan pachamamawanpas tinkisqa runakunata wiñachiyku.',
    tagEs: '🌳 Acción Verde',
    tagQu: '🌳 Qumir Ruray',
  },
  {
    id: 6,
    image: carruselDesfile,
    titleEs: 'Orgullo Cívico en las Calles de Puquio',
    titleQu: 'Puquio Llaqtapi Llaqtanchikpa Kusikuynin',
    subtitleEs: 'Desfilamos con honor llevando en alto el nombre de nuestra institución.',
    subtitleQu: 'Yachay wasinchikpa sutinta hatunchaspa puriyku.',
    tagEs: '🇵🇪 Identidad Nacional',
    tagQu: '🇵🇪 Llaqtanchikpa Kayninchik',
  },
];

/* ─── News Data ─── */
const newsItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
    dateEs: '05 Abr 2026', dateQu: '05 Abr 2026',
    categoryEs: 'Académico', categoryQu: 'Yachay',
    titleEs: 'Estudiantes destacan en Olimpiada de Matemáticas Regional',
    titleQu: 'Yachakuqkuna Yupay Atipanakuypi ñawpaqman lluqsinku',
    descEs: 'Tres alumnos del 6to grado obtuvieron medallas en la competencia regional celebrada en Ayacucho.',
    descQu: 'Kimsa yachakuq suqta ñiqimanta Ayacucho llaqtapi atipanakuypi medalla chaskirqanku.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    dateEs: '28 Mar 2026', dateQu: '28 Mar 2026',
    categoryEs: 'Institucional', categoryQu: 'Yachay Wasi',
    titleEs: 'Inauguración del nuevo laboratorio de cómputo',
    titleQu: 'Musuq Antachana Wasipa Kichariynin',
    descEs: 'Se inauguró el laboratorio equipado con 20 computadoras para fortalecer las competencias digitales.',
    descQu: 'Iskay chunka antachanakunayuq wasita kicharirqanku musuq yachaykunapaq.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    dateEs: '15 Mar 2026', dateQu: '15 Mar 2026',
    categoryEs: 'Cultural', categoryQu: 'Kawsay',
    titleEs: 'Festival de Danzas Típicas de Lucanas',
    titleQu: 'Lucanas Tusuy Raymi',
    descEs: 'Los estudiantes celebraron las tradiciones con danzas como el Huaylarsh y el Carnaval Puquiano.',
    descQu: 'Yachakuqkuna ñawpa tusuykunata ruwaspa kawsayninchikta yupaychanku.',
  },
];

/* ─── Posts Data ─── */
const postsData = [
  {
    id: 1,
    authorEs: 'Prof. María López', authorQu: 'Yachachiq María López',
    roleEs: 'Directora', roleQu: 'Umalliq',
    avatar: '👩‍🏫',
    timeEs: 'Hace 2 horas', timeQu: '2 hora ñaqha',
    contentEs: '¡Felicitamos a nuestros campeones de la Olimpiada de Matemáticas! Su esfuerzo y dedicación nos llena de orgullo. 🏆📐',
    contentQu: 'Yupay Atipanakuypi atipaqninchikkunata yupaychayku! Kallpankuwan kusikuyniyku huntasqa. 🏆📐',
    likes: 45, comments: 12,
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    authorEs: 'I.E. 24009', authorQu: 'I.E. 24009',
    roleEs: 'Comunicado Oficial', roleQu: 'Kamachiy Willakuy',
    avatar: '🏫',
    timeEs: 'Hace 5 horas', timeQu: '5 hora ñaqha',
    contentEs: '📋 RECORDATORIO: Reunión de padres de familia este viernes 10 de abril a las 3:00 PM en el auditorio. Agenda: avances del primer bimestre y actividades del Día del Logro.',
    contentQu: '📋 YUYARICHIY: Tayta-mamakunapa huñunakuynin kay viernes 10 abril punchawpi 3:00 PM auditorio ukupi.',
    likes: 32, comments: 8,
  },
  {
    id: 3,
    authorEs: 'Prof. Carlos Quispe', authorQu: 'Yachachiq Carlos Quispe',
    roleEs: 'Docente de Ciencias', roleQu: 'Hamutay Yachachiq',
    avatar: '👨‍🔬',
    timeEs: 'Ayer', timeQu: 'Qayna punchaw',
    contentEs: '🔬 Los alumnos del 5to grado completaron su proyecto de huerto escolar. ¡Las lechugas ya están creciendo! Una experiencia maravillosa de aprendizaje práctico. 🌱',
    contentQu: '🔬 Pisqa ñiqi yachakuqkuna yachay chakra llamkayninku tukurqanku. ¡Lichugakuna wiñachkanña! 🌱',
    likes: 67, comments: 23,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
  },
];

/* ─── Events Data ─── */
const eventsData = [
  { dayEs: '10', dayQu: '10', monthEs: 'ABR', monthQu: 'ABR', titleEs: 'Reunión de Padres', titleQu: 'Tayta-Mama Huñunakuy', timeEs: '3:00 PM', timeQu: '3:00 PM', color: 'bg-primary' },
  { dayEs: '15', dayQu: '15', monthEs: 'ABR', monthQu: 'ABR', titleEs: 'Feria de Ciencias', titleQu: 'Hamutay Rantikuy', timeEs: '9:00 AM', timeQu: '9:00 AM', color: 'bg-accent' },
  { dayEs: '22', dayQu: '22', monthEs: 'ABR', monthQu: 'ABR', titleEs: 'Día del Idioma', titleQu: 'Simi Punchaw', timeEs: 'Todo el día', timeQu: 'Tukuy punchaw', color: 'bg-destructive' },
  { dayEs: '28', dayQu: '28', monthEs: 'ABR', monthQu: 'ABR', titleEs: 'Día del Logro', titleQu: 'Atipay Punchaw', timeEs: '10:00 AM', timeQu: '10:00 AM', color: 'bg-primary' },
];

/* ─── Quick Access Items ─── */
const getQuickItems = (lang: 'es' | 'qu') => [
  { icon: BookOpen, titleEs: 'Biblioteca Escolar', titleQu: 'Ñawinchana Wasi', descEs: 'Libros digitales y recursos', descQu: 'Dijital qillqakuna', to: '/biblioteca', color: 'bg-primary', iconBg: 'bg-primary/10' },
  { icon: Globe2, titleEs: 'Rincón Cívico', titleQu: 'Llaqta Taki', descEs: 'Himnos y marchas', descQu: 'Takikuna marchakuna', to: '/rincon-civico', color: 'bg-destructive', iconBg: 'bg-destructive/10' },
  { icon: Calendar, titleEs: 'Calendario', titleQu: 'Yachay Pacha', descEs: 'Eventos y fechas clave', descQu: 'Raymikuna punchawkuna', color: 'bg-accent', iconBg: 'bg-accent/10' },
  { icon: GraduationCap, titleEs: 'Aula Virtual', titleQu: 'Yachay Llika', descEs: 'Plataforma académica', descQu: 'Yachay plataforma', color: 'bg-primary', iconBg: 'bg-primary/10' },
  { icon: Award, titleEs: 'Evaluaciones', titleQu: 'Ñiqinchay', descEs: 'Notas y reportes', descQu: 'Yupay willakuykuna', color: 'bg-destructive', iconBg: 'bg-destructive/10' },
  { icon: Users, titleEs: 'Portal Padres', titleQu: 'Tayta-Mama', descEs: 'Información para familias', descQu: 'Ayllukunapaq willakuy', color: 'bg-accent', iconBg: 'bg-accent/10' },
];

/* ─── Component ─── */
const PaginaInstitucional = () => {
  const { lang } = useLang();
  const t = locales[lang];
  const l = (es: string, qu: string) => lang === 'es' ? es : qu;

  /* Banner slider */
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = useCallback(() => setCurrentSlide(p => (p + 1) % bannerSlides.length), []);
  const prevSlide = useCallback(() => setCurrentSlide(p => (p - 1 + bannerSlides.length) % bannerSlides.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  /* Hymn audio */
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  /* Post likes */
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const quickItems = getQuickItems(lang);
  const slide = bannerSlides[currentSlide];

  return (
    <div className="bg-background">

      {/* ═══════ BANNER SLIDER ═══════ */}
      <section className="relative w-full h-[70vh] min-h-[420px] max-h-[600px] overflow-hidden">
        {bannerSlides.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block w-fit bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-4 animate-pulse">
            {lang === 'es' ? slide.tagEs : slide.tagQu}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl mb-4 drop-shadow-lg">
            {lang === 'es' ? slide.titleEs : slide.titleQu}
          </h1>
          <p className="text-sm sm:text-lg text-white/90 max-w-2xl mb-6 drop-shadow leading-relaxed">
            {lang === 'es' ? slide.subtitleEs : slide.subtitleQu}
          </p>
          <div className="flex gap-3">
            <a href="#comunidad" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg">
              {l('Nuestra Comunidad', 'Ayllu Yachayninchik')}
            </a>
            <Link to="/biblioteca" className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/30 transition-colors border border-white/30">
              {l('Biblioteca', 'Ñawinchana Wasi')}
            </Link>
          </div>
        </div>

        {/* Slider controls */}
        <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur transition-colors" aria-label="Anterior">
          <ChevronLeft size={22} />
        </button>
        <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur transition-colors" aria-label="Siguiente">
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* ═══════ MARQUEE ─ FRASES CÉLEBRES TÚPAC AMARU II ═══════ */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-sm font-semibold">
          <span className="inline-flex items-center gap-2"><Star size={14} /> {l('✊ "Campesino, el patrón ya no comerá más de tu pobreza" — Túpac Amaru II', '✊ "Llaqta runa, patronqa manaña wakcha kayniykimanta mikhunqachu" — Túpac Amaru II')}</span>
          <span className="opacity-60">•</span>
          <span className="inline-flex items-center gap-2"><BookOpen size={14} /> {l('📚 "El saber libera al pueblo: estudiar es también rebelarse"', '📚 "Yachayqa llaqtata kacharin: yachayqa hatariypas kanmi"')}</span>
          <span className="opacity-60">•</span>
          <span className="inline-flex items-center gap-2"><Megaphone size={14} /> {l('🔥 "Volveré y seré millones" — La educación nos hace inmortales', '🔥 "Kutimusaqmi waranqa waranqa kanaypaq" — Yachayqa wiñay kawsaytam quwanchik')}</span>
          <span className="opacity-60">•</span>
          <span className="inline-flex items-center gap-2"><Award size={14} /> {l('🦅 4 de noviembre 1780: rebelión de Sangarará — semilla de libertad y dignidad', '🦅 4 noviembre 1780: Sangarará hatariy — qispiy chaymanta chaninchakuypa muhun')}</span>
          <span className="opacity-60">•</span>
          <span className="inline-flex items-center gap-2"><GraduationCap size={14} /> {l('✨ Estudiantes de Ccollana: como Túpac Amaru, forjamos libertad con conocimiento', '✨ Ccollana yachakuqkuna: Túpac Amaru hina, yachaywan qispiyta paqarichinchik')}</span>
          <span className="opacity-60">•</span>
          {/* duplicate for seamless loop */}
          <span className="inline-flex items-center gap-2"><Star size={14} /> {l('✊ "Campesino, el patrón ya no comerá más de tu pobreza" — Túpac Amaru II', '✊ "Llaqta runa, patronqa manaña wakcha kayniykimanta mikhunqachu" — Túpac Amaru II')}</span>
          <span className="opacity-60">•</span>
          <span className="inline-flex items-center gap-2"><BookOpen size={14} /> {l('📚 "El saber libera al pueblo: estudiar es también rebelarse"', '📚 "Yachayqa llaqtata kacharin: yachayqa hatariypas kanmi"')}</span>
        </div>
      </div>

      {/* ═══════ QUICK ACCESS ═══════ */}
      <section className="py-10 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
            <span className="w-1.5 h-7 bg-primary rounded-full" />
            {l('Accesos Rápidos', 'Utqaylla Yaykuykuna')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickItems.map((item, idx) => {
              const content = (
                <div key={idx} className="group bg-card border border-border rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className={`w-12 h-12 mx-auto mb-3 ${item.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className="text-foreground" size={24} />
                  </div>
                  <p className="font-bold text-sm text-foreground leading-tight">{lang === 'es' ? item.titleEs : item.titleQu}</p>
                  <p className="text-xs text-muted-foreground mt-1">{lang === 'es' ? item.descEs : item.descQu}</p>
                </div>
              );
              return item.to ? <Link key={idx} to={item.to}>{content}</Link> : <div key={idx}>{content}</div>;
            })}
          </div>
        </div>
      </section>

      {/* ═══════ COMUNIDAD STATS ═══════ */}
      <section id="comunidad" className="py-10 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 shadow-lg">
            <h3 className="font-extrabold text-xl sm:text-2xl mb-6 text-center">{l('Nuestra Comunidad', 'Ayllu Yachayninchik')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { num: '230+', labelEs: 'Estudiantes', labelQu: 'Yachakuqkuna' },
                { num: '15', labelEs: 'Docentes', labelQu: 'Yachachiqkuna' },
                { num: '6', labelEs: 'Grados', labelQu: 'Ñiqikuna' },
                { num: '91', labelEs: 'Años de creación', labelQu: 'Paqarisqan watakuna' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl sm:text-4xl font-black">{stat.num}</p>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">{lang === 'es' ? stat.labelEs : stat.labelQu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ═══════ MISIÓN · HIMNO · VISIÓN ═══════ */}
      <section className="py-14 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {l('Identidad Institucional', 'Yachay Wasi Kikinchakuy')}
            </h2>
            <div className="w-20 h-1 bg-destructive rounded-full mx-auto mt-3" />
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* MISIÓN — izquierda */}
            <article className="lg:col-span-3 group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <Target className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-black text-foreground mb-2">{l('Misión', 'Llamkayninchik')}</h3>
              <div className="w-10 h-1 bg-primary rounded-full mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {l(
                  'Brindar una educación integral, inclusiva y de calidad, formando estudiantes críticos, creativos y solidarios, con sólidos valores éticos y cívicos, capaces de enfrentar los retos de la sociedad actual desde nuestra identidad cultural andina.',
                  'Hunt\'asqa, llapanpaq, allin yachayta quykuy, yachakuqkunata yuyaysapa, musuq ruwaqkunata, sumaq chaninchaywan, kawsay sasachakuykunaman atipanankupaq, ñawpa kawsayninchikmanta.'
                )}
              </p>
            </article>

            {/* HIMNO — centro */}
            <article className="lg:col-span-6 relative bg-gradient-to-br from-destructive via-destructive to-primary text-destructive-foreground rounded-2xl p-8 shadow-2xl overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-8 border-white" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border-8 border-white" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                      <Music size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">{l('Himno Institucional', 'Yachay Wasi Taki')}</p>
                      <h3 className="text-xl sm:text-2xl font-black leading-tight">
                        {l('Himno a la Escuela', 'Yachay Wasi Taki')}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={toggleAudio}
                    aria-label={isPlaying ? 'Pausar himno' : 'Reproducir himno'}
                    className="shrink-0 w-12 h-12 rounded-full bg-white text-destructive flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>
                </div>

                <audio ref={audioRef} onEnded={() => setIsPlaying(false)} preload="none">
                  {/* Reemplazar con la URL real del audio del himno */}
                  <source src="/himno.mp3" type="audio/mpeg" />
                </audio>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 font-serif text-[15px] leading-relaxed">
                  {[
                    ['I', 'Estudiantes de Ccollana\nHoy cantemos con honor\nNuestro himno que es reflejo\nDe estudio y de unión.'],
                    ['II', '4 de noviembre fecha gloriosa\nPara todo el Perú\nRecordemos Sangarará\nTúpac Amaru, hijo del sol.'],
                    ['III', 'Con bravura y valentía\nRecordamos con honor\nLas hazañas triunfadoras\nQue iniciaron rebelión.'],
                    ['IV', 'Túpac Amaru, cóndor de fuego\nQuema tu sangre, arde tu voz\nIlumina nuestra mente\nPara forjar la libertad.'],
                  ].map(([roman, verse]) => (
                    <div key={roman} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 hover:bg-white/15 transition-colors">
                      <span className="inline-block text-2xl font-black opacity-80 mb-1">{roman}</span>
                      <p className="whitespace-pre-line italic">{verse}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* VISIÓN — derecha */}
            <article className="lg:col-span-3 group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                <Eye className="text-accent" size={28} />
              </div>
              <h3 className="text-xl font-black text-foreground mb-2">{l('Visión', 'Qhawariy')}</h3>
              <div className="w-10 h-1 bg-accent rounded-full mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {l(
                  'Ser al 2030 una institución educativa líder en Puquio, reconocida por su excelencia académica, innovación pedagógica y formación de ciudadanos comprometidos con el desarrollo sostenible, la interculturalidad y el legado de Túpac Amaru II.',
                  '2030 watapi, Puquio llaqtapi ñawpaq yachay wasi kanaykupaq, allin yachaymanta, musuq pusariykunamanta, Túpac Amaru II kawsayninta qatispa.'
                )}
              </p>
            </article>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PaginaInstitucional;
