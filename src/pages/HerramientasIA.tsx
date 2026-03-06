import { useState, useMemo } from 'react';
import { Search, ExternalLink, X } from 'lucide-react';
import { useLang } from '@/hooks/useLang';

interface AppTool {
  name: string;
  symbol: string;
  cat: string;
  url: string;
  desc: string;
  atomicNumber?: number;
}

const categories: Record<string, { name: string; full: string; color: string }> = {
  ai_gen: { name: "IA Gen.", full: "IA Generativa y Chat", color: "bg-fuchsia-500" },
  creation: { name: "Creación", full: "Diseño y Creación", color: "bg-blue-500" },
  programming: { name: "Código", full: "Programación", color: "bg-lime-500" },
  organization: { name: "Org.", full: "Organización", color: "bg-amber-400" },
  communication: { name: "Comun.", full: "Comunicación", color: "bg-cyan-500" },
  content_mgmt: { name: "Gestión", full: "LMS / Gestión Docente", color: "bg-pink-500" },
  evaluation: { name: "Eval.", full: "Evaluación", color: "bg-emerald-500" },
  edu_content: { name: "Contenido", full: "Contenido Educativo", color: "bg-orange-500" },
  resources: { name: "Recursos", full: "Recursos Extra", color: "bg-violet-500" },
};

const categoryBgLight: Record<string, string> = {
  ai_gen: "bg-fuchsia-50 border-fuchsia-200",
  creation: "bg-blue-50 border-blue-200",
  programming: "bg-lime-50 border-lime-200",
  organization: "bg-amber-50 border-amber-200",
  communication: "bg-cyan-50 border-cyan-200",
  content_mgmt: "bg-pink-50 border-pink-200",
  evaluation: "bg-emerald-50 border-emerald-200",
  edu_content: "bg-orange-50 border-orange-200",
  resources: "bg-violet-50 border-violet-200",
};

const allApps: AppTool[] = [
  { name: "Gamma", symbol: "Gm", cat: "creation", url: "https://gamma.app", desc: "IA que crea presentaciones, documentos y páginas web en segundos." },
  { name: "Califica", symbol: "Cf", cat: "evaluation", url: "https://califica.ai", desc: "Plataforma que optimiza la carga administrativa y calificación docente." },
  { name: "ChatGPT", symbol: "Gpt", cat: "ai_gen", url: "https://chat.openai.com", desc: "El modelo de lenguaje líder para planificación, ideas y redacción." },
  { name: "Gemini", symbol: "Ge", cat: "ai_gen", url: "https://gemini.google.com", desc: "La IA multimodal de Google conectada con sus herramientas." },
  { name: "Copilot", symbol: "Co", cat: "ai_gen", url: "https://copilot.microsoft.com", desc: "Asistente IA de Microsoft integrado en Edge y Office." },
  { name: "MagicSchool", symbol: "Ms", cat: "content_mgmt", url: "https://www.magicschool.ai", desc: "Suite completa de herramientas IA diseñadas específicamente para profesores." },
  { name: "Diffit", symbol: "Df", cat: "resources", url: "https://web.diffit.me", desc: "Genera recursos diferenciados y adaptados para cualquier nivel de lectura." },
  { name: "Curipod", symbol: "Cu", cat: "creation", url: "https://curipod.com", desc: "Crea lecciones interactivas con encuestas y dibujos generados por IA." },
  { name: "Eduaide", symbol: "Ea", cat: "content_mgmt", url: "https://www.eduaide.ai", desc: "Asistente para planificar lecciones y generar recursos educativos." },
  { name: "QuestionW.", symbol: "Qw", cat: "evaluation", url: "https://www.questionwell.org", desc: "Genera bancos de preguntas y cuestionarios a partir de textos o videos." },
  { name: "Brisk", symbol: "Br", cat: "evaluation", url: "https://www.briskteaching.com", desc: "Extensión de Chrome para dar feedback rápido y detectar IA." },
  { name: "Perplexity", symbol: "Px", cat: "ai_gen", url: "https://www.perplexity.ai", desc: "Buscador conversacional que cita fuentes reales en tiempo real." },
  { name: "Claude", symbol: "Cl", cat: "ai_gen", url: "https://claude.ai", desc: "IA de Anthropic, excelente para análisis de textos largos y naturales." },
  { name: "Quillbot", symbol: "Qb", cat: "resources", url: "https://quillbot.com", desc: "Herramienta de parafraseo y mejora de escritura con IA." },
  { name: "Suno", symbol: "Su", cat: "creation", url: "https://suno.com", desc: "Generación de canciones y música completa mediante IA." },
  { name: "HeyGen", symbol: "Hg", cat: "creation", url: "https://www.heygen.com", desc: "Crea videos con avatares hablantes realistas multilingües." },
  { name: "Otter.ai", symbol: "Ot", cat: "resources", url: "https://otter.ai", desc: "Transcribe reuniones y clases automáticamente con notas inteligentes." },
  { name: "M.Journey", symbol: "Mj", cat: "creation", url: "https://www.midjourney.com", desc: "Generador de imágenes artísticas de alta calidad por IA (Discord)." },
  { name: "Genially", symbol: "Gn", cat: "creation", url: "https://genial.ly", desc: "Crea contenidos interactivos espectaculares." },
  { name: "Canva", symbol: "Ca", cat: "creation", url: "https://www.canva.com", desc: "Diseño gráfico e IA con su Estudio Mágico." },
  { name: "Nearpod", symbol: "Np", cat: "creation", url: "https://nearpod.com", desc: "Lecciones interactivas VR y evaluación." },
  { name: "Scratch", symbol: "Sc", cat: "programming", url: "https://scratch.mit.edu", desc: "Programación por bloques." },
  { name: "Miro", symbol: "Mr", cat: "organization", url: "https://miro.com", desc: "Pizarra infinita colaborativa." },
  { name: "Padlet", symbol: "Pa", cat: "organization", url: "https://padlet.com", desc: "Muros digitales colaborativos." },
  { name: "Notion", symbol: "No", cat: "content_mgmt", url: "https://www.notion.so", desc: "Espacio de trabajo todo en uno con IA integrada." },
  { name: "Kahoot!", symbol: "K!", cat: "evaluation", url: "https://kahoot.com", desc: "Aprendizaje basado en juegos." },
  { name: "Quizizz", symbol: "Qz", cat: "evaluation", url: "https://quizizz.com", desc: "Cuestionarios gamificados con funciones IA." },
  { name: "Edpuzzle", symbol: "Ed", cat: "evaluation", url: "https://edpuzzle.com", desc: "Video-lecciones interactivas (ahora con teacher assist)." },
  { name: "Classroom", symbol: "Cr", cat: "content_mgmt", url: "https://edu.google.com/products/classroom/", desc: "Gestión de clases de Google." },
  { name: "Moodle", symbol: "Mo", cat: "content_mgmt", url: "https://moodle.org", desc: "LMS de código abierto líder." },
  { name: "Khan", symbol: "Ka", cat: "edu_content", url: "https://www.khanacademy.org", desc: "Tutoría personalizada con Khanmigo (IA)." },
  { name: "Duolingo", symbol: "Du", cat: "edu_content", url: "https://www.duolingo.com", desc: "Idiomas gamificados." },
  { name: "YouTube", symbol: "Yt", cat: "edu_content", url: "https://www.youtube.com", desc: "Plataforma de video educativa." },
  { name: "Slideshare", symbol: "Ss", cat: "edu_content", url: "https://www.slideshare.net", desc: "Repositorio de presentaciones." },
  { name: "TED", symbol: "Td", cat: "edu_content", url: "https://www.ted.com", desc: "Charlas inspiradoras." },
  { name: "Prezi", symbol: "Pr", cat: "creation", url: "https://prezi.com", desc: "Presentaciones dinámicas." },
  { name: "Flip", symbol: "Fp", cat: "creation", url: "https://flip.tools/", desc: "Video debates (Microsoft)." },
  { name: "PowToon", symbol: "Pw", cat: "creation", url: "https://www.powtoon.com", desc: "Videos animados." },
  { name: "Pixton", symbol: "Px2", cat: "creation", url: "https://www.pixton.com", desc: "Cómics educativos." },
  { name: "Jamboard", symbol: "Jb", cat: "organization", url: "https://jamboard.google.com", desc: "Pizarra de Google." },
  { name: "Trello", symbol: "Tr", cat: "organization", url: "https://trello.com", desc: "Gestión de proyectos Kanban." },
  { name: "Slack", symbol: "Sl", cat: "communication", url: "https://slack.com", desc: "Comunicación de equipos." },
  { name: "Discord", symbol: "Ds", cat: "communication", url: "https://discord.com", desc: "Comunidades de voz y texto." },
  { name: "Teams", symbol: "Tm", cat: "communication", url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software", desc: "Hub de trabajo Microsoft." },
  { name: "ClassDojo", symbol: "Cd", cat: "communication", url: "https://www.classdojo.com", desc: "Comunidad de aula." },
  { name: "Socrative", symbol: "So", cat: "evaluation", url: "https://www.socrative.com", desc: "Evaluación en tiempo real." },
  { name: "Wordwall", symbol: "Ww", cat: "evaluation", url: "https://wordwall.net", desc: "Actividades interactivas." },
  { name: "Google", symbol: "G", cat: "edu_content", url: "https://www.google.com", desc: "Búsqueda." },
  { name: "Scholar", symbol: "Gs", cat: "edu_content", url: "https://scholar.google.com", desc: "Búsqueda académica." },
  { name: "Pinterest", symbol: "Pi", cat: "edu_content", url: "https://www.pinterest.com", desc: "Inspiración visual." },
  { name: "Office", symbol: "Of", cat: "resources", url: "https://www.office.com", desc: "Suite Microsoft 365." },
  { name: "Workspace", symbol: "Ws", cat: "resources", url: "https://workspace.google.com", desc: "Google Workspace." },
  { name: "H5P", symbol: "H5", cat: "resources", url: "https://h5p.org", desc: "Contenido interactivo HTML5." },
  { name: "PDF Tools", symbol: "Pd", cat: "resources", url: "https://www.ilovepdf.com", desc: "Herramientas PDF." },
  { name: "Unsplash", symbol: "Un", cat: "resources", url: "https://unsplash.com", desc: "Fotos gratuitas." },
  { name: "Undraw", symbol: "Ud", cat: "resources", url: "https://undraw.co", desc: "Ilustraciones open-source." },
  { name: "Wakelet", symbol: "Wa", cat: "content_mgmt", url: "https://wakelet.com", desc: "Curación de contenidos." },
  { name: "Plickers", symbol: "Pl", cat: "evaluation", url: "https://get.plickers.com", desc: "Evaluación con tarjetas QR." },
  { name: "Mentimeter", symbol: "Mm", cat: "evaluation", url: "https://www.mentimeter.com", desc: "Encuestas interactivas." },
  { name: "AppInv", symbol: "Ai", cat: "programming", url: "https://appinventor.mit.edu", desc: "Creación de Apps Android." },
  { name: "HourCode", symbol: "Hc", cat: "programming", url: "https://hourofcode.com", desc: "Iniciación a la programación." },
  { name: "Deepstash", symbol: "Dp", cat: "edu_content", url: "https://deepstash.com", desc: "Ideas y conocimiento." },
  { name: "Symbaloo", symbol: "Sy", cat: "organization", url: "https://www.symbaloo.com", desc: "Organización de enlaces." },
  { name: "Exelearn", symbol: "Ex", cat: "content_mgmt", url: "https://exelearning.net", desc: "Recursos educativos abiertos." },
  { name: "Blogger", symbol: "Bg", cat: "content_mgmt", url: "https://www.blogger.com", desc: "Blogs de Google." },
  { name: "Telegram", symbol: "Tg", cat: "communication", url: "https://telegram.org", desc: "Mensajería segura." },
  { name: "MindMeis", symbol: "Mn", cat: "organization", url: "https://www.mindmeister.com", desc: "Mapas mentales." },
  { name: "PearDeck", symbol: "Pk", cat: "evaluation", url: "https://www.peardeck.com", desc: "Slides interactivas." },
  { name: "Forms", symbol: "Gf", cat: "evaluation", url: "https://www.google.com/forms", desc: "Encuestas Google." },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-2">
            {lang === 'es' ? 'TABLA DE IAs' : 'IA TABLA'}
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            {lang === 'es' ? '+ Herramientas Docentes' : '+ Yachachiq Llamkanakuna'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Elaborado por: Martín Herick Cahuana Mendoza
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'es' ? 'Buscar herramienta (ej. Gamma)...' : 'Llamkanata maskay...'}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Category Legend / Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              !activeFilter ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {lang === 'es' ? 'Todas' : 'Lliw'}
          </button>
          {categoryOrder.map(key => (
            <button
              key={key}
              onClick={() => setActiveFilter(activeFilter === key ? null : key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === key ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${categories[key].color}`} />
              {categories[key].name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
          {filteredApps.map((app) => {
            const cat = categories[app.cat];
            const logoUrl = `https://www.google.com/s2/favicons?domain=${app.url}&sz=128`;
            return (
              <a
                key={app.symbol + app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative aspect-square border rounded-lg p-1.5 flex flex-col items-center justify-between transition-all hover:scale-[1.3] hover:z-50 hover:shadow-xl hover:border-primary cursor-pointer ${categoryBgLight[app.cat]} bg-card`}
                onMouseEnter={() => setSelectedApp(app)}
                onMouseLeave={() => setSelectedApp(null)}
                onClick={(e) => {
                  // On mobile, first tap shows info
                  if (window.innerWidth < 768 && selectedApp?.name !== app.name) {
                    e.preventDefault();
                    setSelectedApp(app);
                  }
                }}
              >
                {/* Category color bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${cat.color}`} />

                {/* Atomic number */}
                <span className="self-start text-[8px] font-mono font-bold text-muted-foreground mt-1">
                  {app.atomicNumber}
                </span>

                {/* Logo */}
                <div className="flex-1 flex items-center justify-center w-full">
                  <img
                    src={logoUrl}
                    alt={app.name}
                    className="w-[55%] h-[55%] object-contain drop-shadow-sm group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="hidden text-lg font-black text-muted-foreground">{app.symbol}</span>
                </div>

                {/* Name */}
                <span className="text-[8px] font-bold uppercase text-muted-foreground truncate w-full text-center leading-tight pb-0.5">
                  {app.name}
                </span>
              </a>
            );
          })}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-bold">
              {lang === 'es' ? 'No se encontraron herramientas.' : 'Manam llamkana tarikunchu.'}
            </p>
          </div>
        )}

        {/* Info panel (floating) */}
        {selectedApp && (
          <div className="hidden md:block fixed bottom-6 right-6 z-[100] w-80 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center p-2 shrink-0">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${selectedApp.url}&sz=128`}
                  alt={selectedApp.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">{selectedApp.name}</h3>
                <span className={`text-xs font-bold uppercase tracking-wider text-primary`}>
                  {categories[selectedApp.cat].full}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedApp.desc}</p>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>#{selectedApp.atomicNumber}</span>
              <span className="flex items-center gap-1">
                {lang === 'es' ? 'Ver web' : 'Llikaman riy'} <ExternalLink size={10} />
              </span>
            </div>
          </div>
        )}

        {/* Mobile detail modal */}
        {selectedApp && (
          <div className="md:hidden fixed inset-0 z-[100] flex items-end" onClick={() => setSelectedApp(null)}>
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
            <div className="relative w-full bg-card rounded-t-3xl p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-muted-foreground">
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center p-2">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${selectedApp.url}&sz=128`}
                    alt={selectedApp.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">{selectedApp.name}</h3>
                  <span className="text-xs font-bold uppercase text-primary">
                    {categories[selectedApp.cat].full}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{selectedApp.desc}</p>
              <a
                href={selectedApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-3 rounded-xl"
              >
                {lang === 'es' ? 'Visitar sitio web' : 'Llikaman riy'} →
              </a>
            </div>
          </div>
        )}

        {/* Footer credit */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          Derechos de Autor Reservados © 2026
        </p>
      </div>
    </div>
  );
};

export default HerramientasIA;
