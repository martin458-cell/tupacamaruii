import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ExternalLink, X, Sparkles, ArrowUpRight, Zap, Star } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

interface AppTool {
  name: string;
  symbol: string;
  cat: string;
  url: string;
  desc: string;
  atomicNumber?: number;
  featured?: boolean;
}

const categories: Record<string, { name: string; full: string; color: string; textColor: string; bgLight: string; emoji: string }> = {
  ai_gen: { name: "IA Gen.", full: "IA Generativa y Chat", color: "bg-fuchsia-500", textColor: "text-fuchsia-600", bgLight: "bg-fuchsia-50 dark:bg-fuchsia-950/30", emoji: "🤖" },
  creation: { name: "Creación", full: "Diseño y Creación", color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50 dark:bg-blue-950/30", emoji: "🎨" },
  programming: { name: "Código", full: "Programación", color: "bg-lime-600", textColor: "text-lime-700 dark:text-lime-400", bgLight: "bg-lime-50 dark:bg-lime-950/30", emoji: "💻" },
  organization: { name: "Org.", full: "Organización", color: "bg-amber-500", textColor: "text-amber-600", bgLight: "bg-amber-50 dark:bg-amber-950/30", emoji: "📋" },
  communication: { name: "Comun.", full: "Comunicación", color: "bg-cyan-500", textColor: "text-cyan-600", bgLight: "bg-cyan-50 dark:bg-cyan-950/30", emoji: "💬" },
  content_mgmt: { name: "Gestión", full: "LMS / Gestión Docente", color: "bg-pink-500", textColor: "text-pink-600", bgLight: "bg-pink-50 dark:bg-pink-950/30", emoji: "📚" },
  evaluation: { name: "Eval.", full: "Evaluación", color: "bg-emerald-500", textColor: "text-emerald-600", bgLight: "bg-emerald-50 dark:bg-emerald-950/30", emoji: "✅" },
  edu_content: { name: "Contenido", full: "Contenido Educativo", color: "bg-orange-500", textColor: "text-orange-600", bgLight: "bg-orange-50 dark:bg-orange-950/30", emoji: "📖" },
  resources: { name: "Recursos", full: "Recursos Extra", color: "bg-violet-500", textColor: "text-violet-600", bgLight: "bg-violet-50 dark:bg-violet-950/30", emoji: "🧰" },
};

const categoryGradient: Record<string, string> = {
  ai_gen: "from-fuchsia-500/10 to-fuchsia-500/5",
  creation: "from-blue-500/10 to-blue-500/5",
  programming: "from-lime-500/10 to-lime-500/5",
  organization: "from-amber-500/10 to-amber-500/5",
  communication: "from-cyan-500/10 to-cyan-500/5",
  content_mgmt: "from-pink-500/10 to-pink-500/5",
  evaluation: "from-emerald-500/10 to-emerald-500/5",
  edu_content: "from-orange-500/10 to-orange-500/5",
  resources: "from-violet-500/10 to-violet-500/5",
};

const categoryHoverBorder: Record<string, string> = {
  ai_gen: "hover:border-fuchsia-400 hover:shadow-fuchsia-200/50 dark:hover:shadow-fuchsia-900/30",
  creation: "hover:border-blue-400 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30",
  programming: "hover:border-lime-400 hover:shadow-lime-200/50 dark:hover:shadow-lime-900/30",
  organization: "hover:border-amber-400 hover:shadow-amber-200/50 dark:hover:shadow-amber-900/30",
  communication: "hover:border-cyan-400 hover:shadow-cyan-200/50 dark:hover:shadow-cyan-900/30",
  content_mgmt: "hover:border-pink-400 hover:shadow-pink-200/50 dark:hover:shadow-pink-900/30",
  evaluation: "hover:border-emerald-400 hover:shadow-emerald-200/50 dark:hover:shadow-emerald-900/30",
  edu_content: "hover:border-orange-400 hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30",
  resources: "hover:border-violet-400 hover:shadow-violet-200/50 dark:hover:shadow-violet-900/30",
};

const allApps: AppTool[] = [
  { name: "ChatGPT", symbol: "Gpt", cat: "ai_gen", url: "https://chatgpt.com/", desc: "El modelo de lenguaje líder para planificación, ideas y redacción.", featured: true },
  { name: "Gemini", symbol: "Ge", cat: "ai_gen", url: "https://gemini.google.com/app?hl=es", desc: "La IA multimodal de Google conectada con sus herramientas.", featured: true },
  { name: "Copilot", symbol: "Co", cat: "ai_gen", url: "https://copilot.microsoft.com/", desc: "Asistente IA de Microsoft integrado en Edge y Office.", featured: true },
  { name: "Perplexity", symbol: "Px", cat: "ai_gen", url: "https://www.perplexity.ai", desc: "Buscador conversacional que cita fuentes reales en tiempo real." },
  { name: "Claude", symbol: "Cl", cat: "ai_gen", url: "https://claude.com/", desc: "IA de Anthropic, excelente para análisis de textos largos y naturales.", featured: true },
  { name: "Gamma", symbol: "Gm", cat: "creation", url: "https://gamma.app", desc: "IA que crea presentaciones, documentos y páginas web en segundos.", featured: true },
  { name: "Curipod", symbol: "Cu", cat: "creation", url: "https://curipod.com", desc: "Crea lecciones interactivas con encuestas y dibujos generados por IA." },
  { name: "Suno", symbol: "Su", cat: "creation", url: "https://suno.com", desc: "Generación de canciones y música completa mediante IA." },
  { name: "HeyGen", symbol: "Hg", cat: "creation", url: "https://www.heygen.com", desc: "Crea videos con avatares hablantes realistas multilingües." },
  { name: "M.Journey", symbol: "Mj", cat: "creation", url: "https://www.midjourney.com", desc: "Generador de imágenes artísticas de alta calidad por IA (Discord)." },
  { name: "Genially", symbol: "Gn", cat: "creation", url: "https://genial.ly", desc: "Crea contenidos interactivos espectaculares." },
  { name: "Canva", symbol: "Ca", cat: "creation", url: "https://www.canva.com", desc: "Diseño gráfico e IA con su Estudio Mágico.", featured: true },
  { name: "Nearpod", symbol: "Np", cat: "creation", url: "https://nearpod.com", desc: "Lecciones interactivas VR y evaluación." },
  { name: "Prezi", symbol: "Pr", cat: "creation", url: "https://prezi.com", desc: "Presentaciones dinámicas." },
  { name: "Flip", symbol: "Fp", cat: "creation", url: "https://flip.tools/", desc: "Video debates (Microsoft)." },
  { name: "PowToon", symbol: "Pw", cat: "creation", url: "https://www.powtoon.com", desc: "Videos animados." },
  { name: "Pixton", symbol: "Px2", cat: "creation", url: "https://www.pixton.com", desc: "Cómics educativos." },
  { name: "Scratch", symbol: "Sc", cat: "programming", url: "https://scratch.mit.edu", desc: "Programación por bloques." },
  { name: "AppInv", symbol: "Ai", cat: "programming", url: "https://appinventor.mit.edu", desc: "Creación de Apps Android." },
  { name: "HourCode", symbol: "Hc", cat: "programming", url: "https://hourofcode.com", desc: "Iniciación a la programación." },
  { name: "Miro", symbol: "Mr", cat: "organization", url: "https://miro.com", desc: "Pizarra infinita colaborativa." },
  { name: "Padlet", symbol: "Pa", cat: "organization", url: "https://padlet.com", desc: "Muros digitales colaborativos.", featured: true },
  { name: "Jamboard", symbol: "Jb", cat: "organization", url: "https://jamboard.google.com", desc: "Pizarra de Google." },
  { name: "Trello", symbol: "Tr", cat: "organization", url: "https://trello.com", desc: "Gestión de proyectos Kanban." },
  { name: "Symbaloo", symbol: "Sy", cat: "organization", url: "https://www.symbaloo.com", desc: "Organización de enlaces." },
  { name: "MindMeis", symbol: "Mn", cat: "organization", url: "https://www.mindmeister.com", desc: "Mapas mentales." },
  { name: "Slack", symbol: "Sl", cat: "communication", url: "https://slack.com", desc: "Comunicación de equipos." },
  { name: "Discord", symbol: "Ds", cat: "communication", url: "https://discord.com", desc: "Comunidades de voz y texto." },
  { name: "Teams", symbol: "Tm", cat: "communication", url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software", desc: "Hub de trabajo Microsoft." },
  { name: "ClassDojo", symbol: "Cd", cat: "communication", url: "https://www.classdojo.com", desc: "Comunidad de aula." },
  { name: "Telegram", symbol: "Tg", cat: "communication", url: "https://telegram.org", desc: "Mensajería segura." },
  { name: "MagicSchool", symbol: "Ms", cat: "content_mgmt", url: "https://www.magicschool.ai", desc: "Suite completa de herramientas IA diseñadas específicamente para profesores.", featured: true },
  { name: "Eduaide", symbol: "Ea", cat: "content_mgmt", url: "https://www.eduaide.ai", desc: "Asistente para planificar lecciones y generar recursos educativos." },
  { name: "Notion", symbol: "No", cat: "content_mgmt", url: "https://www.notion.so", desc: "Espacio de trabajo todo en uno con IA integrada." },
  { name: "Classroom", symbol: "Cr", cat: "content_mgmt", url: "https://edu.google.com/products/classroom/", desc: "Gestión de clases de Google." },
  { name: "Moodle", symbol: "Mo", cat: "content_mgmt", url: "https://moodle.org", desc: "LMS de código abierto líder." },
  { name: "Wakelet", symbol: "Wa", cat: "content_mgmt", url: "https://wakelet.com", desc: "Curación de contenidos." },
  { name: "Exelearn", symbol: "Ex", cat: "content_mgmt", url: "https://exelearning.net", desc: "Recursos educativos abiertos." },
  { name: "Blogger", symbol: "Bg", cat: "content_mgmt", url: "https://www.blogger.com", desc: "Blogs de Google." },
  { name: "Califica", symbol: "Cf", cat: "evaluation", url: "https://califica.ai", desc: "Plataforma que optimiza la carga administrativa y calificación docente." },
  { name: "QuestionW.", symbol: "Qw", cat: "evaluation", url: "https://www.questionwell.org", desc: "Genera bancos de preguntas y cuestionarios a partir de textos o videos." },
  { name: "Brisk", symbol: "Br", cat: "evaluation", url: "https://www.briskteaching.com", desc: "Extensión de Chrome para dar feedback rápido y detectar IA." },
  { name: "Kahoot!", symbol: "K!", cat: "evaluation", url: "https://kahoot.com", desc: "Aprendizaje basado en juegos.", featured: true },
  { name: "Quizizz", symbol: "Qz", cat: "evaluation", url: "https://quizizz.com", desc: "Cuestionarios gamificados con funciones IA." },
  { name: "Edpuzzle", symbol: "Ed", cat: "evaluation", url: "https://edpuzzle.com", desc: "Video-lecciones interactivas (ahora con teacher assist)." },
  { name: "Socrative", symbol: "So", cat: "evaluation", url: "https://www.socrative.com", desc: "Evaluación en tiempo real." },
  { name: "Wordwall", symbol: "Ww", cat: "evaluation", url: "https://wordwall.net", desc: "Actividades interactivas." },
  { name: "Plickers", symbol: "Pl", cat: "evaluation", url: "https://get.plickers.com", desc: "Evaluación con tarjetas QR." },
  { name: "Mentimeter", symbol: "Mm", cat: "evaluation", url: "https://www.mentimeter.com", desc: "Encuestas interactivas." },
  { name: "PearDeck", symbol: "Pk", cat: "evaluation", url: "https://www.peardeck.com", desc: "Slides interactivas." },
  { name: "Forms", symbol: "Gf", cat: "evaluation", url: "https://www.google.com/forms", desc: "Encuestas Google." },
  { name: "Khan", symbol: "Ka", cat: "edu_content", url: "https://www.khanacademy.org", desc: "Tutoría personalizada con Khanmigo (IA).", featured: true },
  { name: "Duolingo", symbol: "Du", cat: "edu_content", url: "https://www.duolingo.com", desc: "Idiomas gamificados." },
  { name: "YouTube", symbol: "Yt", cat: "edu_content", url: "https://www.youtube.com", desc: "Plataforma de video educativa." },
  { name: "Slideshare", symbol: "Ss", cat: "edu_content", url: "https://www.slideshare.net", desc: "Repositorio de presentaciones." },
  { name: "TED", symbol: "Td", cat: "edu_content", url: "https://www.ted.com", desc: "Charlas inspiradoras." },
  { name: "Google", symbol: "G", cat: "edu_content", url: "https://www.google.com", desc: "Búsqueda." },
  { name: "Scholar", symbol: "Gs", cat: "edu_content", url: "https://scholar.google.com", desc: "Búsqueda académica." },
  { name: "Pinterest", symbol: "Pi", cat: "edu_content", url: "https://www.pinterest.com", desc: "Inspiración visual." },
  { name: "Deepstash", symbol: "Dp", cat: "edu_content", url: "https://deepstash.com", desc: "Ideas y conocimiento." },
  { name: "Diffit", symbol: "Df", cat: "resources", url: "https://web.diffit.me", desc: "Genera recursos diferenciados y adaptados para cualquier nivel de lectura." },
  { name: "Quillbot", symbol: "Qb", cat: "resources", url: "https://quillbot.com", desc: "Herramienta de parafraseo y mejora de escritura con IA." },
  { name: "Otter.ai", symbol: "Ot", cat: "resources", url: "https://otter.ai", desc: "Transcribe reuniones y clases automáticamente con notas inteligentes." },
  { name: "Office", symbol: "Of", cat: "resources", url: "https://www.office.com", desc: "Suite Microsoft 365." },
  { name: "Workspace", symbol: "Ws", cat: "resources", url: "https://workspace.google.com", desc: "Google Workspace." },
  { name: "H5P", symbol: "H5", cat: "resources", url: "https://h5p.org", desc: "Contenido interactivo HTML5." },
  { name: "PDF Tools", symbol: "Pd", cat: "resources", url: "https://www.ilovepdf.com", desc: "Herramientas PDF." },
  { name: "Unsplash", symbol: "Un", cat: "resources", url: "https://unsplash.com", desc: "Fotos gratuitas." },
  { name: "Undraw", symbol: "Ud", cat: "resources", url: "https://undraw.co", desc: "Ilustraciones open-source." },
];

const categoryOrder = ['ai_gen', 'creation', 'programming', 'organization', 'communication', 'content_mgmt', 'evaluation', 'edu_content', 'resources'];

// Floating particle component
const FloatingParticle = ({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) => (
  <div
    className="absolute rounded-full bg-primary-foreground/20 animate-pulse"
    style={{
      width: size,
      height: size,
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: '3s',
    }}
  />
);

const ToolCard = ({
  app,
  cat,
  onSelect,
  isSelected,
}: {
  app: AppTool;
  cat: { name: string; full: string; color: string; textColor: string; bgLight: string };
  onSelect: (app: AppTool | null) => void;
  isSelected: boolean;
}) => {
  const logoUrl = `https://www.google.com/s2/favicons?domain=${app.url}&sz=128`;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => onSelect(app)}
      onMouseLeave={() => onSelect(null)}
    >
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex flex-col items-center gap-1 p-3 sm:p-4 rounded-2xl border bg-card border-border transition-all duration-300 cursor-pointer
          hover:scale-105 hover:z-30 hover:shadow-xl ${categoryHoverBorder[app.cat]}
          ${isSelected ? 'scale-105 z-30 shadow-xl border-primary/40' : ''}
          ${app.featured ? 'ring-1 ring-primary/10' : ''}
        `}
      >
        {/* Featured star */}
        {app.featured && (
          <div className="absolute -top-1.5 -right-1.5 z-10">
            <Star size={14} className="text-amber-400 fill-amber-400 drop-shadow" />
          </div>
        )}

        {/* Category color bar */}
        <div className={`absolute top-0 left-3 right-3 h-[3px] rounded-b-full ${cat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

        {/* Atomic number */}
        <span className="self-start text-[8px] font-mono font-bold text-muted-foreground/50">
          {app.atomicNumber}
        </span>

        {/* Logo */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
          <img
            src={logoUrl}
            alt={app.name}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden text-lg font-black text-muted-foreground">{app.symbol}</span>
        </div>

        {/* Name */}
        <span className="text-[10px] sm:text-xs font-extrabold text-muted-foreground group-hover:text-foreground truncate w-full text-center leading-tight transition-colors">
          {app.name}
        </span>

        {/* Hover arrow indicator */}
        <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={10} className="text-primary" />
        </div>
      </a>

      {/* Desktop tooltip */}
      {isSelected && (
        <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[100] w-64 animate-scale-in">
          <div className="bg-card border border-border rounded-xl p-4 shadow-2xl">
            <div className="flex items-start gap-3 mb-2">
              <img
                src={logoUrl}
                alt={app.name}
                className="w-8 h-8 object-contain shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-black text-sm text-foreground truncate">{app.name}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${cat.textColor}`}>
                  {cat.full}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
            <div className="mt-2 pt-2 border-t border-border flex items-center gap-1 text-[10px] text-primary font-bold">
              <ExternalLink size={10} /> Clic para visitar
            </div>
          </div>
          {/* Tooltip arrow */}
          <div className="w-3 h-3 bg-card border-r border-b border-border rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

const HerramientasIA = () => {
  const { lang } = useLang();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppTool | null>(null);
  const [mobileDetailApp, setMobileDetailApp] = useState<AppTool | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const sortedApps = useMemo(() => {
    const sorted = [...allApps].sort((a, b) => categoryOrder.indexOf(a.cat) - categoryOrder.indexOf(b.cat));
    sorted.forEach((app, i) => { app.atomicNumber = i + 1; });
    return sorted;
  }, []);

  const filteredApps = useMemo(() => {
    return sortedApps.filter(app => {
      const matchSearch = !search || app.name.toLowerCase().includes(search.toLowerCase()) || app.desc.toLowerCase().includes(search.toLowerCase());
      const matchCat = !activeFilter || app.cat === activeFilter;
      return matchSearch && matchCat;
    });
  }, [sortedApps, search, activeFilter]);

  const groupedApps = useMemo(() => {
    const groups: { cat: string; apps: AppTool[] }[] = [];
    let currentCat = '';
    filteredApps.forEach(app => {
      if (app.cat !== currentCat) {
        currentCat = app.cat;
        groups.push({ cat: currentCat, apps: [] });
      }
      groups[groups.length - 1].apps.push(app);
    });
    return groups;
  }, [filteredApps]);

  // Intersection observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [groupedApps]);

  // Handle mobile tap
  const handleMobileTap = (app: AppTool) => {
    if (window.innerWidth < 768) {
      setMobileDetailApp(app);
    }
  };

  const featuredApps = useMemo(() => sortedApps.filter(a => a.featured).slice(0, 6), [sortedApps]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-destructive/70 py-16 md:py-20 px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingParticle delay={0} size={6} left="10%" top="20%" />
          <FloatingParticle delay={0.5} size={4} left="25%" top="60%" />
          <FloatingParticle delay={1} size={8} left="70%" top="15%" />
          <FloatingParticle delay={1.5} size={5} left="85%" top="50%" />
          <FloatingParticle delay={2} size={7} left="50%" top="75%" />
          <FloatingParticle delay={0.8} size={3} left="40%" top="30%" />
          <FloatingParticle delay={1.2} size={6} left="60%" top="85%" />
          <FloatingParticle delay={0.3} size={4} left="15%" top="80%" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm px-5 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles size={14} className="text-primary-foreground animate-pulse" />
            <span className="text-xs font-bold text-primary-foreground uppercase tracking-widest">
              {lang === 'es' ? 'Para docentes innovadores' : 'Musuq yachachiqkunapaq'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground tracking-tight mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            HERRAMIENTAS IA
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {lang === 'es'
              ? 'Explora las mejores aplicaciones y herramientas de inteligencia artificial para potenciar tu enseñanza.'
              : 'Yachachiyniykita kallpanchanapaq aswan sumaq IA llamkanakunata maskay.'}
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Zap size={14} className="text-amber-300" />
              <span className="text-sm font-bold text-primary-foreground">{allApps.length} herramientas</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Star size={14} className="text-amber-300" />
              <span className="text-sm font-bold text-primary-foreground">{categoryOrder.length} categorías</span>
            </div>
          </div>

          <p className="text-primary-foreground/40 text-xs mt-6 font-medium">
            Elaborado por: Martín Herick Cahuana Mendoza
          </p>
        </div>
      </div>

      {/* Featured Tools Strip */}
      {!search && !activeFilter && (
        <div className="bg-muted/50 border-b border-border py-5 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                {lang === 'es' ? 'Destacadas' : "Riqsisqa"}
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {featuredApps.map(app => (
                <a
                  key={`feat-${app.name}`}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shrink-0 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group hover:scale-[1.02]"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${app.url}&sz=128`}
                    alt={app.name}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-black text-foreground">{app.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate max-w-[150px]">{app.desc}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1 max-w-lg group">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'es' ? 'Buscar herramienta (ej. Gamma, ChatGPT)...' : 'Llamkanata maskay...'}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-card text-sm font-medium focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none shadow-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-bold self-center whitespace-nowrap">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black">
                {filteredApps.length}
              </span>
              {lang === 'es' ? 'herramientas' : 'llamkanakuna'}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                !activeFilter
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-[1.02]'
              }`}
            >
              {lang === 'es' ? '🌟 Todas' : '🌟 Lliw'}
            </button>
            {categoryOrder.map(key => (
              <button
                key={key}
                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeFilter === key
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105'
                    : 'bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <span className="text-sm">{categories[key].emoji}</span>
                {categories[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Grid */}
        {groupedApps.map(group => {
          const cat = categories[group.cat];
          const sectionId = `section-${group.cat}`;
          const isVisible = visibleSections.has(sectionId);
          return (
            <div
              key={group.cat}
              id={sectionId}
              ref={el => { sectionRefs.current[sectionId] = el; }}
              className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {/* Section Header */}
              <div className={`flex items-center gap-3 mb-5 p-3 rounded-xl bg-gradient-to-r ${categoryGradient[group.cat]}`}>
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <h2 className={`text-base sm:text-lg font-black uppercase tracking-wide ${cat.textColor}`}>
                    {cat.full}
                  </h2>
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {group.apps.length} {lang === 'es' ? 'herramientas' : 'llamkanakuna'}
                  </span>
                </div>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3">
                {group.apps.map((app) => (
                  <div key={app.symbol + app.name} onClick={() => handleMobileTap(app)}>
                    <ToolCard
                      app={app}
                      cat={cat}
                      onSelect={setSelectedApp}
                      isSelected={selectedApp?.name === app.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredApps.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-lg font-black text-foreground mb-2">
              {lang === 'es' ? 'No se encontraron herramientas' : 'Manam llamkana tarikunchu'}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {lang === 'es' ? 'Prueba con otro término de búsqueda.' : 'Huk rimaywanmi maskay.'}
            </p>
            <button
              onClick={() => { setSearch(''); setActiveFilter(null); }}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              {lang === 'es' ? 'Ver todas las herramientas' : 'Lliw llamkanakunata qaway'}
            </button>
          </div>
        )}

        {/* Mobile detail bottom sheet */}
        {mobileDetailApp && (
          <div className="md:hidden fixed inset-0 z-[100] flex items-end" onClick={() => setMobileDetailApp(null)}>
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" />
            <div
              className="relative w-full bg-card rounded-t-3xl p-6 shadow-2xl animate-slide-in-right"
              style={{ animation: 'slideUp 0.3s ease-out' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-border rounded-full mx-auto mb-5" />
              <button
                onClick={() => setMobileDetailApp(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-3 border border-border ${categories[mobileDetailApp.cat].bgLight}`}>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${mobileDetailApp.url}&sz=128`}
                    alt={mobileDetailApp.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">{mobileDetailApp.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${categories[mobileDetailApp.cat].color}`} />
                    <span className={`text-xs font-bold uppercase ${categories[mobileDetailApp.cat].textColor}`}>
                      {categories[mobileDetailApp.cat].full}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{mobileDetailApp.desc}</p>

              <a
                href={mobileDetailApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-transform text-base"
              >
                {lang === 'es' ? 'Visitar sitio web' : 'Llikaman riy'}
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p className="font-bold">Derechos de Autor Reservados © 2026</p>
      </div>

      {/* CSS for mobile sheet animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HerramientasIA;
