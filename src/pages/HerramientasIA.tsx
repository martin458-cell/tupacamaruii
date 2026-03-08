import { useState, useMemo } from 'react';
import { Search, ExternalLink, X, Sparkles } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

interface AppTool {
  name: string;
  symbol: string;
  cat: string;
  url: string;
  desc: string;
  atomicNumber?: number;
}

const categories: Record<string, { name: string; full: string; color: string; textColor: string }> = {
  ai_gen: { name: "IA Gen.", full: "IA Generativa y Chat", color: "bg-fuchsia-500", textColor: "text-fuchsia-600" },
  creation: { name: "Creación", full: "Diseño y Creación", color: "bg-blue-500", textColor: "text-blue-600" },
  programming: { name: "Código", full: "Programación", color: "bg-lime-600", textColor: "text-lime-700" },
  organization: { name: "Org.", full: "Organización", color: "bg-amber-500", textColor: "text-amber-600" },
  communication: { name: "Comun.", full: "Comunicación", color: "bg-cyan-500", textColor: "text-cyan-600" },
  content_mgmt: { name: "Gestión", full: "LMS / Gestión Docente", color: "bg-pink-500", textColor: "text-pink-600" },
  evaluation: { name: "Eval.", full: "Evaluación", color: "bg-emerald-500", textColor: "text-emerald-600" },
  edu_content: { name: "Contenido", full: "Contenido Educativo", color: "bg-orange-500", textColor: "text-orange-600" },
  resources: { name: "Recursos", full: "Recursos Extra", color: "bg-violet-500", textColor: "text-violet-600" },
};

const categoryHoverBorder: Record<string, string> = {
  ai_gen: "hover:border-fuchsia-400 hover:shadow-fuchsia-100",
  creation: "hover:border-blue-400 hover:shadow-blue-100",
  programming: "hover:border-lime-400 hover:shadow-lime-100",
  organization: "hover:border-amber-400 hover:shadow-amber-100",
  communication: "hover:border-cyan-400 hover:shadow-cyan-100",
  content_mgmt: "hover:border-pink-400 hover:shadow-pink-100",
  evaluation: "hover:border-emerald-400 hover:shadow-emerald-100",
  edu_content: "hover:border-orange-400 hover:shadow-orange-100",
  resources: "hover:border-violet-400 hover:shadow-violet-100",
};

const allApps: AppTool[] = [
  { name: "ChatGPT", symbol: "Gpt", cat: "ai_gen", url: "https://chat.openai.com", desc: "El modelo de lenguaje líder para planificación, ideas y redacción." },
  { name: "Gemini", symbol: "Ge", cat: "ai_gen", url: "https://gemini.google.com", desc: "La IA multimodal de Google conectada con sus herramientas." },
  { name: "Copilot", symbol: "Co", cat: "ai_gen", url: "https://copilot.microsoft.com", desc: "Asistente IA de Microsoft integrado en Edge y Office." },
  { name: "Perplexity", symbol: "Px", cat: "ai_gen", url: "https://www.perplexity.ai", desc: "Buscador conversacional que cita fuentes reales en tiempo real." },
  { name: "Claude", symbol: "Cl", cat: "ai_gen", url: "https://claude.ai", desc: "IA de Anthropic, excelente para análisis de textos largos y naturales." },
  { name: "Gamma", symbol: "Gm", cat: "creation", url: "https://gamma.app", desc: "IA que crea presentaciones, documentos y páginas web en segundos." },
  { name: "Curipod", symbol: "Cu", cat: "creation", url: "https://curipod.com", desc: "Crea lecciones interactivas con encuestas y dibujos generados por IA." },
  { name: "Suno", symbol: "Su", cat: "creation", url: "https://suno.com", desc: "Generación de canciones y música completa mediante IA." },
  { name: "HeyGen", symbol: "Hg", cat: "creation", url: "https://www.heygen.com", desc: "Crea videos con avatares hablantes realistas multilingües." },
  { name: "M.Journey", symbol: "Mj", cat: "creation", url: "https://www.midjourney.com", desc: "Generador de imágenes artísticas de alta calidad por IA (Discord)." },
  { name: "Genially", symbol: "Gn", cat: "creation", url: "https://genial.ly", desc: "Crea contenidos interactivos espectaculares." },
  { name: "Canva", symbol: "Ca", cat: "creation", url: "https://www.canva.com", desc: "Diseño gráfico e IA con su Estudio Mágico." },
  { name: "Nearpod", symbol: "Np", cat: "creation", url: "https://nearpod.com", desc: "Lecciones interactivas VR y evaluación." },
  { name: "Prezi", symbol: "Pr", cat: "creation", url: "https://prezi.com", desc: "Presentaciones dinámicas." },
  { name: "Flip", symbol: "Fp", cat: "creation", url: "https://flip.tools/", desc: "Video debates (Microsoft)." },
  { name: "PowToon", symbol: "Pw", cat: "creation", url: "https://www.powtoon.com", desc: "Videos animados." },
  { name: "Pixton", symbol: "Px2", cat: "creation", url: "https://www.pixton.com", desc: "Cómics educativos." },
  { name: "Scratch", symbol: "Sc", cat: "programming", url: "https://scratch.mit.edu", desc: "Programación por bloques." },
  { name: "AppInv", symbol: "Ai", cat: "programming", url: "https://appinventor.mit.edu", desc: "Creación de Apps Android." },
  { name: "HourCode", symbol: "Hc", cat: "programming", url: "https://hourofcode.com", desc: "Iniciación a la programación." },
  { name: "Miro", symbol: "Mr", cat: "organization", url: "https://miro.com", desc: "Pizarra infinita colaborativa." },
  { name: "Padlet", symbol: "Pa", cat: "organization", url: "https://padlet.com", desc: "Muros digitales colaborativos." },
  { name: "Jamboard", symbol: "Jb", cat: "organization", url: "https://jamboard.google.com", desc: "Pizarra de Google." },
  { name: "Trello", symbol: "Tr", cat: "organization", url: "https://trello.com", desc: "Gestión de proyectos Kanban." },
  { name: "Symbaloo", symbol: "Sy", cat: "organization", url: "https://www.symbaloo.com", desc: "Organización de enlaces." },
  { name: "MindMeis", symbol: "Mn", cat: "organization", url: "https://www.mindmeister.com", desc: "Mapas mentales." },
  { name: "Slack", symbol: "Sl", cat: "communication", url: "https://slack.com", desc: "Comunicación de equipos." },
  { name: "Discord", symbol: "Ds", cat: "communication", url: "https://discord.com", desc: "Comunidades de voz y texto." },
  { name: "Teams", symbol: "Tm", cat: "communication", url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software", desc: "Hub de trabajo Microsoft." },
  { name: "ClassDojo", symbol: "Cd", cat: "communication", url: "https://www.classdojo.com", desc: "Comunidad de aula." },
  { name: "Telegram", symbol: "Tg", cat: "communication", url: "https://telegram.org", desc: "Mensajería segura." },
  { name: "MagicSchool", symbol: "Ms", cat: "content_mgmt", url: "https://www.magicschool.ai", desc: "Suite completa de herramientas IA diseñadas específicamente para profesores." },
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
  { name: "Kahoot!", symbol: "K!", cat: "evaluation", url: "https://kahoot.com", desc: "Aprendizaje basado en juegos." },
  { name: "Quizizz", symbol: "Qz", cat: "evaluation", url: "https://quizizz.com", desc: "Cuestionarios gamificados con funciones IA." },
  { name: "Edpuzzle", symbol: "Ed", cat: "evaluation", url: "https://edpuzzle.com", desc: "Video-lecciones interactivas (ahora con teacher assist)." },
  { name: "Socrative", symbol: "So", cat: "evaluation", url: "https://www.socrative.com", desc: "Evaluación en tiempo real." },
  { name: "Wordwall", symbol: "Ww", cat: "evaluation", url: "https://wordwall.net", desc: "Actividades interactivas." },
  { name: "Plickers", symbol: "Pl", cat: "evaluation", url: "https://get.plickers.com", desc: "Evaluación con tarjetas QR." },
  { name: "Mentimeter", symbol: "Mm", cat: "evaluation", url: "https://www.mentimeter.com", desc: "Encuestas interactivas." },
  { name: "PearDeck", symbol: "Pk", cat: "evaluation", url: "https://www.peardeck.com", desc: "Slides interactivas." },
  { name: "Forms", symbol: "Gf", cat: "evaluation", url: "https://www.google.com/forms", desc: "Encuestas Google." },
  { name: "Khan", symbol: "Ka", cat: "edu_content", url: "https://www.khanacademy.org", desc: "Tutoría personalizada con Khanmigo (IA)." },
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

const HerramientasIA = () => {
  const { lang } = useLang();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppTool | null>(null);

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

  // Group apps by category for section headers
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-destructive/80 py-14 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 left-10 text-8xl">🤖</div>
          <div className="absolute top-12 right-20 text-6xl">🧠</div>
          <div className="absolute bottom-8 left-1/3 text-7xl">💡</div>
          <div className="absolute bottom-4 right-10 text-5xl">⚡</div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5">
            <Sparkles size={14} className="text-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground uppercase tracking-widest">
              {lang === 'es' ? 'Para docentes innovadores' : 'Musuq yachachiqkunapaq'}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary-foreground tracking-tight mb-3">
            HERRAMIENTAS IA
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto font-medium">
            {lang === 'es'
              ? 'Explora las mejores aplicaciones y herramientas de inteligencia artificial para potenciar tu enseñanza.'
              : 'Yachachiyniykita kallpanchanapaq aswan sumaq IA llamkanakunata maskay.'}
          </p>
          <p className="text-primary-foreground/50 text-xs mt-4 font-medium">
            Elaborado por: Martín Herick Cahuana Mendoza
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'es' ? 'Buscar herramienta (ej. Gamma, ChatGPT)...' : 'Llamkanata maskay...'}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-card text-sm font-medium focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none shadow-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="text-sm text-muted-foreground font-bold self-center whitespace-nowrap">
              {filteredApps.length} {lang === 'es' ? 'herramientas' : 'llamkanakuna'}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                !activeFilter
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {lang === 'es' ? '🌟 Todas' : '🌟 Lliw'}
            </button>
            {categoryOrder.map(key => (
              <button
                key={key}
                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === key
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${categories[key].color}`} />
                {categories[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Grid */}
        {groupedApps.map(group => (
          <div key={group.cat} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full ${categories[group.cat].color}`} />
              <h2 className={`text-lg font-black uppercase tracking-wide ${categories[group.cat].textColor}`}>
                {categories[group.cat].full}
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-bold text-muted-foreground">{group.apps.length}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
              {group.apps.map((app) => {
                const cat = categories[app.cat];
                const logoUrl = `https://www.google.com/s2/favicons?domain=${app.url}&sz=128`;
                return (
                  <a
                    key={app.symbol + app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative aspect-square bg-card border border-border rounded-2xl p-2 flex flex-col items-center justify-between transition-all duration-200 hover:scale-110 hover:z-50 hover:shadow-lg cursor-pointer ${categoryHoverBorder[app.cat]}`}
                    onMouseEnter={() => setSelectedApp(app)}
                    onMouseLeave={() => setSelectedApp(null)}
                  >
                    {/* Category color bar */}
                    <div className={`absolute top-0 left-2 right-2 h-[3px] rounded-b-full ${cat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    {/* Atomic number */}
                    <span className="self-start text-[9px] font-mono font-bold text-muted-foreground/60 mt-0.5">
                      {app.atomicNumber}
                    </span>

                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-center w-full">
                      <img
                        src={logoUrl}
                        alt={app.name}
                        className="w-[50%] h-[50%] object-contain drop-shadow group-hover:scale-125 transition-transform duration-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="hidden text-xl font-black text-muted-foreground">{app.symbol}</span>
                    </div>

                    {/* Name */}
                    <span className="text-[9px] font-extrabold uppercase text-muted-foreground group-hover:text-foreground truncate w-full text-center leading-tight pb-0.5 transition-colors">
                      {app.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-lg font-black text-foreground mb-1">
              {lang === 'es' ? 'No se encontraron herramientas' : 'Manam llamkana tarikunchu'}
            </p>
            <p className="text-sm text-muted-foreground">
              {lang === 'es' ? 'Prueba con otro término de búsqueda.' : 'Huk rimaywanmi maskay.'}
            </p>
          </div>
        )}

        {/* Info panel (desktop floating) */}
        {selectedApp && (
          <div className="hidden md:block fixed bottom-6 right-6 z-[100] w-80 bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center p-2 shrink-0 border border-border">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${selectedApp.url}&sz=128`}
                  alt={selectedApp.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-black text-foreground truncate">{selectedApp.name}</h3>
                <span className={`text-xs font-bold uppercase tracking-wider ${categories[selectedApp.cat].textColor}`}>
                  {categories[selectedApp.cat].full}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedApp.desc}</p>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono">#{selectedApp.atomicNumber}</span>
              <span className="flex items-center gap-1 text-primary font-bold">
                {lang === 'es' ? 'Ver web' : 'Llikaman riy'} <ExternalLink size={10} />
              </span>
            </div>
          </div>
        )}

        {/* Mobile detail modal */}
        {selectedApp && (
          <div className="md:hidden fixed inset-0 z-[100] flex items-end" onClick={() => setSelectedApp(null)}>
            <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
            <div className="relative w-full bg-card rounded-t-3xl p-6 shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
              <button onClick={() => setSelectedApp(null)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center p-2 border border-border">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${selectedApp.url}&sz=128`}
                    alt={selectedApp.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">{selectedApp.name}</h3>
                  <span className={`text-xs font-bold uppercase ${categories[selectedApp.cat].textColor}`}>
                    {categories[selectedApp.cat].full}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{selectedApp.desc}</p>
              <a
                href={selectedApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-primary-foreground font-extrabold py-3.5 rounded-2xl shadow-md shadow-primary/20 active:scale-95 transition-transform"
              >
                {lang === 'es' ? 'Visitar sitio web' : 'Llikaman riy'} →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Derechos de Autor Reservados © 2026
      </div>
    </div>
  );
};

export default HerramientasIA;
