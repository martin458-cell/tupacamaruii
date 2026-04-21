import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, BookOpen, Globe2, Cpu, Heart, ChevronRight, ChevronLeft, Clock, Users, Star, Bell, Share2, ThumbsUp, MessageSquare, Award, GraduationCap, Megaphone, Image as ImageIcon, Target, Eye, Music, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import heroPortada from '@/assets/hero-portada.jpg';

/* ─── Banner Slider Data ─── */
const bannerSlides = [
  {
    id: 1,
    image: heroPortada,
    titleEs: 'Bienvenidos a la I.E. 24009 "Túpac Amaru II"',
    titleQu: 'Allinmi Hamunki I.E. 24009 "Túpac Amaru II"',
    subtitleEs: 'Formando líderes con innovación, valores y amor por el aprendizaje en Puquio.',
    subtitleQu: 'Musuq yachaywan, chaninchaywanpas pusaqkunata wiñachispa Puquio llaqtapi.',
    tagEs: '📢 Matrícula Abierta 2026',
    tagQu: '📢 Qillqakuy Kichay 2026',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80',
    titleEs: 'Innovación Educativa con Robótica',
    titleQu: 'Musuq Yachay Robótica nisqawan',
    subtitleEs: 'Nuestros estudiantes aprenden tecnología, pensamiento lógico y trabajo en equipo.',
    subtitleQu: 'Yachakuqninchik musuq antakunawan yuyayninkunata kallpanchanku.',
    tagEs: '🤖 Programa STEAM',
    tagQu: '🤖 STEAM Yachay',
  },
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
            <a href="#noticias" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg">
              {l('Ver Noticias', 'Willakuykunata Qaway')}
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

      {/* ═══════ MARQUEE ═══════ */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-sm font-semibold">
          <span className="inline-flex items-center gap-1"><Bell size={14} /> {l('📋 Matrícula 2026 abierta — ¡Inscríbete ya!', '📋 2026 Qillqakuy kichasqa — ¡Qillqakuy kunanmi!')}</span>
          <span className="inline-flex items-center gap-1"><Star size={14} /> {l('🏆 Ganadores de la Olimpiada Regional de Matemáticas', '🏆 Yupay Atipanakuy Suyupi atipaqkuna')}</span>
          <span className="inline-flex items-center gap-1"><Calendar size={14} /> {l('📅 Reunión de padres: Viernes 10 de abril, 3 PM', '📅 Tayta-mama huñunakuy: Viernes 10 abril, 3 PM')}</span>
          <span className="inline-flex items-center gap-1"><Megaphone size={14} /> {l('🎉 Feria de Ciencias — 15 de abril', '🎉 Hamutay Rantikuy — 15 abril')}</span>
          {/* duplicate for seamless loop */}
          <span className="inline-flex items-center gap-1"><Bell size={14} /> {l('📋 Matrícula 2026 abierta — ¡Inscríbete ya!', '📋 2026 Qillqakuy kichasqa — ¡Qillqakuy kunanmi!')}</span>
          <span className="inline-flex items-center gap-1"><Star size={14} /> {l('🏆 Ganadores de la Olimpiada Regional de Matemáticas', '🏆 Yupay Atipanakuy Suyupi atipaqkuna')}</span>
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

      {/* ═══════ NEWS + SIDEBAR ═══════ */}
      <section id="noticias" className="py-10 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* News column */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                <span className="w-1.5 h-7 bg-destructive rounded-full" />
                {l('Noticias Escolares', 'Yachay Wasi Willakuykuna')}
              </h2>
              <div className="space-y-6">
                {newsItems.map(item => (
                  <article key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="sm:flex">
                      <div className="sm:w-56 shrink-0">
                        <img src={item.image} alt="" className="w-full h-44 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{lang === 'es' ? item.categoryEs : item.categoryQu}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {lang === 'es' ? item.dateEs : item.dateQu}</span>
                          </div>
                          <h3 className="font-extrabold text-foreground text-base mb-2 leading-snug">{lang === 'es' ? item.titleEs : item.titleQu}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{lang === 'es' ? item.descEs : item.descQu}</p>
                        </div>
                        <button className="mt-3 text-primary font-bold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all w-fit">
                          {l('Leer más', 'Astawanña ñawinchay')} <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Events sidebar */}
            <aside>
              <h2 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
                <span className="w-1.5 h-7 bg-accent rounded-full" />
                {l('Próximos Eventos', 'Hamuq Raymikuna')}
              </h2>
              <div className="space-y-3">
                {eventsData.map((ev, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className={`${ev.color} text-primary-foreground rounded-xl w-14 h-14 flex flex-col items-center justify-center shrink-0`}>
                      <span className="text-lg font-black leading-none">{lang === 'es' ? ev.dayEs : ev.dayQu}</span>
                      <span className="text-[10px] font-bold uppercase">{lang === 'es' ? ev.monthEs : ev.monthQu}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{lang === 'es' ? ev.titleEs : ev.titleQu}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={11} /> {lang === 'es' ? ev.timeEs : ev.timeQu}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats card */}
              <div className="mt-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6">
                <h3 className="font-extrabold text-lg mb-4">{l('Nuestra Comunidad', 'Ayllu Yachayninchik')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: '350+', labelEs: 'Estudiantes', labelQu: 'Yachakuqkuna' },
                    { num: '18', labelEs: 'Docentes', labelQu: 'Yachachiqkuna' },
                    { num: '6', labelEs: 'Grados', labelQu: 'Ñiqikuna' },
                    { num: '25+', labelEs: 'Años', labelQu: 'Watakuna' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-black">{stat.num}</p>
                      <p className="text-xs opacity-80">{lang === 'es' ? stat.labelEs : stat.labelQu}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL POSTS ═══════ */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
            <span className="w-1.5 h-7 bg-primary rounded-full" />
            {l('Publicaciones de la Comunidad', 'Ayllu Willakuykuna')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsData.map(post => {
              const liked = likedPosts.has(post.id);
              return (
                <div key={post.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="p-4 flex items-center gap-3">
                    <span className="text-3xl">{post.avatar}</span>
                    <div>
                      <p className="font-bold text-sm text-foreground">{lang === 'es' ? post.authorEs : post.authorQu}</p>
                      <p className="text-xs text-muted-foreground">{lang === 'es' ? post.roleEs : post.roleQu} · {lang === 'es' ? post.timeEs : post.timeQu}</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="px-4 pb-3">
                    <p className="text-sm text-foreground leading-relaxed">{lang === 'es' ? post.contentEs : post.contentQu}</p>
                  </div>
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="" className="w-full h-44 object-cover" loading="lazy" />
                  )}
                  {/* Actions */}
                  <div className="p-4 flex items-center gap-6 border-t border-border">
                    <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${liked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                      <ThumbsUp size={16} className={liked ? 'fill-primary' : ''} /> {post.likes + (liked ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                      <MessageSquare size={16} /> {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors ml-auto">
                      <Share2 size={16} /> {l('Compartir', 'Rakiy')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>




    </div>
  );
};

export default PaginaInstitucional;
