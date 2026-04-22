import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, GraduationCap, Clock, Users, Star, PlayCircle, CheckCircle2,
  BookOpen, Languages, Cpu, Brain, ClipboardCheck, Rocket, Award,
  ArrowRight, Search, Filter, TrendingUp, Quote
} from 'lucide-react';
import { useLang } from '@/hooks/useLang';

const l = (lang: 'es' | 'qu', es: string, qu: string) => (lang === 'es' ? es : qu);

/* ─── Curso destacado: IA para Docentes ─── */
const featuredModules = [
  { icon: Sparkles,       es: 'Primeros pasos con la IA',           qu: 'IA-wan qallariy',                desc_es: 'Pierde el miedo: ChatGPT, Gemini y Copilot explicados con ejemplos del aula.', desc_qu: 'Manchakuyta chinkachiy: ChatGPT, Gemini, Copilot yachay wasipi.' },
  { icon: ClipboardCheck, es: 'Planificación en minutos',           qu: 'Pisi pachapi planificay',         desc_es: 'Genera sesiones de aprendizaje alineadas al CNEB en 5 minutos.', desc_qu: 'CNEB-wan tinkisqa yachay sesionkunata pisqa minutopi paqarichiy.' },
  { icon: BookOpen,       es: 'Materiales didácticos automáticos',  qu: 'Yachay materialkuna',             desc_es: 'Fichas, exámenes y rúbricas creadas con IA en segundos.', desc_qu: 'Fichakuna, examen, rubrika IA-wan ruway.' },
  { icon: Languages,      es: 'IA bilingüe: Español–Quechua',       qu: 'IA iskay simipi',                 desc_es: 'Traduce y adapta contenidos a la realidad de Puquio y Lucanas.', desc_qu: 'Puquio Lucanas kawsayman yachayta tikray.' },
  { icon: Brain,          es: 'Evaluación y retroalimentación',     qu: 'Ñiqinchay kutichiypas',           desc_es: 'Corrige tareas y entrega feedback personalizado a cada estudiante.', desc_qu: 'Ruwaykunata allinchay sapa yachakuqman willariy.' },
  { icon: Rocket,         es: 'Proyectos: Robótica + IA',           qu: 'Robótica IA-wan llamkay',         desc_es: 'Lleva la IA al aula con proyectos reales de robótica para primaria.', desc_qu: 'Robótica llamkaykunawan IA yachay wasiman apay.' },
];

/* ─── Catálogo de cursos ─── */
const courses = [
  {
    id: 1,
    titleEs: 'IA para Docentes: Enseña Mejor en la Mitad del Tiempo',
    titleQu: 'Yachachiqkunapaq IA: Pisi Pachapi Allinta Yachachiy',
    categoryEs: 'IA · Innovación', categoryQu: 'IA · Musuq Yachay',
    instructorEs: 'Equipo de Innovación I.E. 24009',
    instructorQu: 'I.E. 24009 Musuq Yachay Pacha',
    duration: '6h',
    lessons: 24,
    students: 87,
    rating: 4.9,
    level_es: 'Principiante', level_qu: 'Qallariq',
    color: 'from-primary to-primary/70',
    icon: Sparkles,
    badge_es: '⭐ Destacado', badge_qu: '⭐ Akllasqa',
    progress: 0,
  },
  {
    id: 2,
    titleEs: 'Pedagogía Activa en el Aula Multigrado',
    titleQu: 'Achka Ñiqi Yachay Wasipi Llamkay',
    categoryEs: 'Pedagogía', categoryQu: 'Yachachiy',
    instructorEs: 'Prof. María López', instructorQu: 'Yachachiq María López',
    duration: '4h', lessons: 16, students: 54, rating: 4.8,
    level_es: 'Intermedio', level_qu: 'Chawpi',
    color: 'from-destructive to-destructive/70',
    icon: GraduationCap,
    progress: 35,
  },
  {
    id: 3,
    titleEs: 'Quechua Chanka en el Aula Digital',
    titleQu: 'Runasimi Chanka Dijital Yachaypi',
    categoryEs: 'Bilingüismo', categoryQu: 'Iskay Simi',
    instructorEs: 'Prof. Carlos Quispe', instructorQu: 'Yachachiq Carlos Quispe',
    duration: '5h', lessons: 20, students: 72, rating: 5.0,
    level_es: 'Todos', level_qu: 'Lliw',
    color: 'from-accent to-accent/70',
    icon: Languages,
    progress: 60,
  },
  {
    id: 4,
    titleEs: 'Robótica Educativa para Primaria',
    titleQu: 'Wamrakunapaq Robótica Yachay',
    categoryEs: 'Tecnología', categoryQu: 'Antakuna',
    instructorEs: 'Equipo STEAM', instructorQu: 'STEAM Pacha',
    duration: '8h', lessons: 30, students: 41, rating: 4.7,
    level_es: 'Intermedio', level_qu: 'Chawpi',
    color: 'from-primary to-destructive',
    icon: Cpu,
    progress: 0,
  },
  {
    id: 5,
    titleEs: 'Evaluación Formativa con Herramientas Digitales',
    titleQu: 'Dijital Antakunawan Ñiqinchay',
    categoryEs: 'Pedagogía', categoryQu: 'Yachachiy',
    instructorEs: 'Prof. Ana Huamán', instructorQu: 'Yachachiq Ana Huamán',
    duration: '3h', lessons: 12, students: 38, rating: 4.6,
    level_es: 'Principiante', level_qu: 'Qallariq',
    color: 'from-accent to-primary',
    icon: ClipboardCheck,
    progress: 0,
  },
  {
    id: 6,
    titleEs: 'Bienestar y Educación Emocional Docente',
    titleQu: 'Yachachiqpa Sunqu Allinkaynin',
    categoryEs: 'Bienestar', categoryQu: 'Allinkay',
    instructorEs: 'Psic. Lucía Ramos', instructorQu: 'Psic. Lucía Ramos',
    duration: '4h', lessons: 14, students: 65, rating: 4.9,
    level_es: 'Todos', level_qu: 'Lliw',
    color: 'from-destructive to-accent',
    icon: Brain,
    progress: 0,
  },
];

const categories_es = ['Todos', 'IA · Innovación', 'Pedagogía', 'Bilingüismo', 'Tecnología', 'Bienestar'];
const categories_qu = ['Lliw', 'IA · Musuq Yachay', 'Yachachiy', 'Iskay Simi', 'Antakuna', 'Allinkay'];

const testimonials = [
  { name: 'Prof. Rosa M.', role_es: 'Docente 3° grado', role_qu: 'Kimsa ñiqi yachachiq', text_es: 'Con la IA preparo mis sesiones en 10 minutos. ¡Recuperé mi tiempo en familia!', text_qu: 'IA-wan sesionniyta chunka minutopi ruwani. Ayllu pachayta kutichiniña.', avatar: '👩‍🏫' },
  { name: 'Prof. Julio C.',  role_es: 'Coordinador TIC',  role_qu: 'TIC tinkichiq',         text_es: 'El curso de robótica abrió un mundo nuevo a mis estudiantes de Puquio.', text_qu: 'Robótica yachayqa Puquio yachakuqniykunaman musuq pachata kicharin.', avatar: '👨‍🔬' },
  { name: 'Prof. Elena Q.',  role_es: 'Docente bilingüe', role_qu: 'Iskay simi yachachiq',  text_es: 'Por fin encuentro recursos en quechua hechos para nuestra realidad.', text_qu: 'Tukupayña runasimipi kawsayninchikpaq materialkunata tariniña.', avatar: '👩‍💼' },
];

const AulaVirtual = () => {
  const { lang } = useLang();
  const [activeCat, setActiveCat] = useState(0);
  const [search, setSearch] = useState('');

  const cats = lang === 'es' ? categories_es : categories_qu;

  const filtered = courses.filter(c => {
    const title = lang === 'es' ? c.titleEs : c.titleQu;
    const cat = lang === 'es' ? c.categoryEs : c.categoryQu;
    const matchCat = activeCat === 0 || cat === cats[activeCat];
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = courses[0];

  return (
    <div className="bg-background min-h-screen">
      {/* ═══════ HERO ═══════ */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                <Sparkles size={14} /> {l(lang, 'Nuevo · Curso destacado', 'Musuq · Akllasqa Yachay')}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 drop-shadow">
                {l(lang, 'Aula Virtual Docente', 'Yachachiqpa Yachay Llika')}
              </h1>
              <p className="text-base sm:text-lg text-primary-foreground/90 mb-6 max-w-xl leading-relaxed">
                {l(lang,
                  'Capacitación continua para los docentes de la I.E. 24009. Aprende a integrar la Inteligencia Artificial en tus clases y enseña mejor en la mitad del tiempo.',
                  'I.E. 24009 yachachiqkunapaq wiñay yachachiy. Inteligencia Artificial-ta yachachiyniykipi tinkichiy chayna pisi pachapi allinta yachachinaykipaq.'
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#destacado" className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg inline-flex items-center gap-2">
                  <PlayCircle size={18} /> {l(lang, 'Empezar curso de IA', 'IA Yachayta Qallariy')}
                </a>
                <a href="#catalogo" className="bg-white/15 backdrop-blur border border-white/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/25 transition-colors inline-flex items-center gap-2">
                  <BookOpen size={18} /> {l(lang, 'Ver catálogo', 'Lliw Yachaykunata Qaway')}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2"><Users size={18} /> <strong>87+</strong> {l(lang, 'docentes', 'yachachiqkuna')}</div>
                <div className="flex items-center gap-2"><GraduationCap size={18} /> <strong>6</strong> {l(lang, 'cursos activos', 'kawsaq yachaykuna')}</div>
                <div className="flex items-center gap-2"><Star size={18} fill="currentColor" /> <strong>4.9</strong> {l(lang, 'valoración', 'chaninchay')}</div>
              </div>
            </div>

            {/* Featured course card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/30 rounded-3xl blur-2xl" />
              <div className="relative bg-card text-card-foreground rounded-3xl p-6 shadow-2xl border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-destructive flex items-center justify-center shrink-0">
                    <Sparkles className="text-white" size={28} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-destructive">{l(lang, '⭐ CURSO DESTACADO', '⭐ AKLLASQA YACHAY')}</span>
                    <h3 className="font-black text-lg leading-tight mt-1">
                      {l(lang, 'IA para Docentes: Enseña Mejor en la Mitad del Tiempo', 'Yachachiqkunapaq IA: Pisi Pachapi Allinta Yachachiy')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-4 text-xs">
                  <div className="bg-muted/50 rounded-lg py-2"><Clock size={14} className="mx-auto mb-1 text-primary" /><strong>6h</strong></div>
                  <div className="bg-muted/50 rounded-lg py-2"><BookOpen size={14} className="mx-auto mb-1 text-primary" /><strong>24</strong> {l(lang, 'lecciones', 'yachay')}</div>
                  <div className="bg-muted/50 rounded-lg py-2"><Award size={14} className="mx-auto mb-1 text-primary" /><strong>{l(lang, 'Certificado', 'Sertifikado')}</strong></div>
                </div>

                <ul className="space-y-2 mb-5">
                  {[
                    { es: 'Sin conocimientos previos requeridos', qu: 'Mana ñawpa yachay munanchu' },
                    { es: 'Ejemplos reales del aula primaria', qu: 'Wamra yachay wasimanta kawsay' },
                    { es: 'Bilingüe: Español y Quechua', qu: 'Iskay simi: Español Runasimi' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{l(lang, item.es, item.qu)}</span>
                    </li>
                  ))}
                </ul>

                <a href="#destacado" className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
                  {l(lang, 'Ver módulos del curso', 'Yachay módulokuna qaway')} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MÓDULOS DEL CURSO DESTACADO ═══════ */}
      <section id="destacado" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-3">
              {l(lang, '🚀 CURSO DESTACADO · 6 MÓDULOS', '🚀 AKLLASQA YACHAY · 6 MÓDULO')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {l(lang, '¿Qué aprenderás?', '¿Imatam yachanki?')}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {l(lang,
                'Un recorrido práctico para que la IA sea tu mejor aliada en el aula.',
                'Practika ñan IA yachachiyniykipi sumaq yanapaq kananpaq.'
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredModules.map((m, i) => (
              <article key={i} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
                      <m.icon className="text-primary-foreground" size={22} />
                    </div>
                    <span className="text-xs font-black text-muted-foreground">
                      {l(lang, 'MÓDULO', 'MÓDULO')} {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-foreground mb-2 leading-tight">
                    {l(lang, m.es, m.qu)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {l(lang, m.desc_es, m.desc_qu)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg inline-flex items-center gap-2">
              <PlayCircle size={20} /> {l(lang, 'Inscribirme gratis', 'Mana qullqiyuq qillqakuy')}
            </button>
            <p className="text-xs text-muted-foreground mt-3">
              {l(lang, '✓ Acceso inmediato · ✓ Certificado al finalizar · ✓ Soporte continuo', '✓ Kunan yaykuy · ✓ Tukuypi sertifikado · ✓ Wiñay yanapay')}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ CATÁLOGO ═══════ */}
      <section id="catalogo" className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-3">
                <span className="w-1.5 h-8 bg-destructive rounded-full" />
                {l(lang, 'Catálogo de Cursos', 'Lliw Yachaykuna')}
              </h2>
              <p className="text-muted-foreground mt-2">
                {l(lang, 'Capacitación continua para nuestros docentes', 'Yachachiqkunapaq wiñay yachachiy')}
              </p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={l(lang, 'Buscar curso...', 'Yachayta maskay...')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCat(i)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCat === i
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-card text-muted-foreground border border-border hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Filter size={40} className="mx-auto mb-3 opacity-40" />
              {l(lang, 'No encontramos cursos con esos filtros.', 'Manam yachaykuna tarikunchu.')}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => (
                <article key={course.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  {/* Cover */}
                  <div className={`relative h-32 bg-gradient-to-br ${course.color} flex items-center justify-center overflow-hidden`}>
                    <course.icon className="text-white/90 group-hover:scale-125 transition-transform duration-500" size={56} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {course.badge_es && (
                      <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-black px-3 py-1 rounded-full shadow-lg">
                        {l(lang, course.badge_es, course.badge_qu!)}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                      {l(lang, course.level_es, course.level_qu)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-bold text-primary mb-2">
                      {l(lang, course.categoryEs, course.categoryQu)}
                    </span>
                    <h3 className="font-black text-base text-foreground mb-2 leading-tight line-clamp-2">
                      {l(lang, course.titleEs, course.titleQu)}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      👤 {l(lang, course.instructorEs, course.instructorQu)}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="inline-flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                      <span className="inline-flex items-center gap-1"><BookOpen size={12} /> {course.lessons}</span>
                      <span className="inline-flex items-center gap-1"><Users size={12} /> {course.students}</span>
                      <span className="inline-flex items-center gap-1 ml-auto text-accent-foreground bg-accent/20 px-2 py-0.5 rounded-full font-bold">
                        <Star size={12} fill="currentColor" /> {course.rating}
                      </span>
                    </div>

                    {/* Progress */}
                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{l(lang, 'Progreso', 'Ñawpaqman')}</span>
                          <span className="font-bold text-primary">{course.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                    )}

                    <button className="mt-auto w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground py-2.5 rounded-xl font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 group/btn">
                      {course.progress > 0
                        ? l(lang, 'Continuar', 'Qatipay')
                        : l(lang, 'Empezar curso', 'Yachayta qallariy')}
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ TESTIMONIOS ═══════ */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-3">
              <TrendingUp size={14} /> {l(lang, 'Docentes que ya están usando IA', 'IA-ta llamkachiq yachachiqkuna')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {l(lang, 'Lo que dicen nuestros maestros', 'Yachachiqninchikkuna nin')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all relative">
                <Quote className="absolute top-4 right-4 text-primary/10" size={48} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-destructive/20 flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-black text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{l(lang, t.role_es, t.role_qu)}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "{l(lang, t.text_es, t.text_qu)}"
                </p>
                <div className="flex gap-0.5 mt-3 text-accent">
                  {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="currentColor" />)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="py-14 bg-gradient-to-br from-destructive via-destructive to-destructive/80 text-destructive-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            {l(lang, '¿Listo para enseñar con Inteligencia Artificial?', '¿Inteligencia Artificial-wan yachachiyta munankichu?')}
          </h2>
          <p className="text-destructive-foreground/90 mb-6 max-w-2xl mx-auto">
            {l(lang,
              'Únete al curso destacado y descubre cómo recuperar horas de tu semana mientras enseñas mejor.',
              'Akllasqa yachayman yaykumuy chaynapi semanaykipi achka horakunata kutichiy allinta yachachispa.'
            )}
          </p>
          <a href="#destacado" className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-3.5 rounded-xl font-black hover:scale-105 transition-transform shadow-2xl">
            <PlayCircle size={20} /> {l(lang, 'Empezar ahora · Es gratis', 'Kunan qallariy · Mana qullqiyuq')}
          </a>
          <div className="mt-6 flex justify-center">
            <Link to="/" className="text-sm underline opacity-90 hover:opacity-100">
              ← {l(lang, 'Volver al inicio', 'Qallariyman kutiy')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AulaVirtual;
