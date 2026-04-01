import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, BookOpen, ArrowLeft, ZoomIn, ZoomOut, Maximize, Minimize, Star, Clock, Filter, X, ChevronRight, FileText } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  grade: string;
  area: string;
  difficulty: string;
  image: string;
  desc: string;
  pages: string[];
  pdfUrl?: string;
  rating: number;
  readTime: string;
};

const BOOKS_DATA: Book[] = [
  {
    id: 1, title: "El Principito", author: "Antoine de Saint-Exupéry",
    category: "Cuentos", grade: "3° - 4°", area: "Comunicación", difficulty: "Intermedio",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    desc: "Un piloto perdido en el desierto del Sahara conoce a un pequeño príncipe que viene de un asteroide muy lejano. Juntos descubrirán el verdadero significado de la amistad, el amor y las cosas importantes de la vida.",
    pages: [
      "Capítulo I\n\nCuando yo tenía seis años vi una vez una lámina magnífica en un libro sobre la selva virgen que se llamaba «Historias vividas». Representaba una serpiente boa que se tragaba a una fiera.\n\nEn el libro se afirmaba: «La serpiente boa se traga su presa entera, sin masticarla. Luego ya no puede moverse y duerme durante los seis meses que dura su digestión».\n\nReflexioné mucho entonces sobre las aventuras de la jungla y a mi vez logré trazar con un lápiz de colores mi primer dibujo.",
      "Capítulo II\n\nViví así, solo, nadie con quien poder hablar verdaderamente, hasta cuando tuve una avería en el desierto del Sahara, hace seis años. Algo se había estropeado en el motor.\n\nComo no llevaba conmigo ni mecánico ni pasajero alguno, me dispuse a realizar, solo, una reparación difícil. Era para mí una cuestión de vida o muerte, pues apenas tenía agua de beber para ocho días.\n\nLa primera noche me dormí sobre la arena, a unas mil millas de distancia del lugar habitado más próximo.",
      "Capítulo III\n\n—¿Qué es esa cosa?\n—No es una cosa. Vuela. Es un avión. Mi avión.\n\nMe sentí orgulloso haciéndole saber que volaba. Entonces exclamó:\n—¡Cómo! ¿Has caído del cielo?\n—Sí —dije modestamente.\n—¡Ah, qué gracioso!\n\nY el principito soltó una encantadora carcajada que me irritó mucho. Me gusta que mis desgracias se tomen en serio."
    ],
    rating: 5, readTime: "45 min"
  },
  {
    id: 2, title: "Secretos del Espacio", author: "Celia Espacio",
    category: "Ciencia", grade: "5° - 6°", area: "Ciencia y Tecnología", difficulty: "Avanzado",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    desc: "Descubre los misterios del universo: desde las estrellas más brillantes hasta los agujeros negros más profundos. Un viaje fascinante por el cosmos diseñado para jóvenes exploradores.",
    pages: [
      "Capítulo 1: Nuestro Sistema Solar\n\nEl Sol es una estrella enorme que está en el centro de nuestro sistema solar. Es tan grande que podrían caber más de un millón de Tierras dentro de él.\n\nAlrededor del Sol giran ocho planetas: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Cada uno es diferente y especial.\n\nLa Tierra es el tercer planeta desde el Sol. Es el único lugar conocido donde existe vida. ¿No es increíble?",
      "Capítulo 2: Las Estrellas\n\nCuando miras el cielo por la noche, puedes ver miles de puntitos brillantes. ¡Son estrellas! Cada estrella es un sol lejano, algunos más grandes y otros más pequeños que el nuestro.\n\nLas estrellas nacen en nubes gigantes de gas y polvo llamadas nebulosas. Con el tiempo, el gas se comprime tanto que comienza a brillar. Una estrella ha nacido.\n\nLas constelaciones son grupos de estrellas que forman figuras en el cielo. Los antiguos las usaban para orientarse.",
      "Capítulo 3: La Luna\n\nLa Luna es el satélite natural de la Tierra. Gira a nuestro alrededor completando una vuelta cada 28 días aproximadamente.\n\nLa Luna no tiene luz propia. La vemos brillar porque refleja la luz del Sol, como un espejo gigante en el cielo.\n\nEn 1969, los astronautas Neil Armstrong y Buzz Aldrin fueron los primeros seres humanos en caminar sobre la Luna. Armstrong dijo: «Es un pequeño paso para el hombre, un gran salto para la humanidad»."
    ],
    rating: 4, readTime: "30 min"
  },
  {
    id: 3, title: "Héroes de la Historia", author: "Alejandro Dumas",
    category: "Historia", grade: "5° - 6°", area: "Personal Social", difficulty: "Intermedio",
    image: "https://images.unsplash.com/photo-1461360226052-72361dab9179?auto=format&fit=crop&w=400&q=80",
    desc: "Conoce a las personas valientes que cambiaron el mundo con sus ideas y acciones. Desde Túpac Amaru II hasta los grandes inventores, descubre historias que inspiran.",
    pages: [
      "Capítulo 1: Túpac Amaru II\n\nJosé Gabriel Condorcanqui, conocido como Túpac Amaru II, nació en Surimana, Cusco, en 1738. Fue un líder indígena que luchó por la libertad de los pueblos originarios del Perú.\n\nTúpac Amaru II fue cacique de Tungasuca, Pampamarca y Surimana. Conocía bien los sufrimientos de su pueblo bajo el dominio español.\n\nEn 1780, lideró la más grande rebelión indígena en la historia de América del Sur. Su valentía inspiró a muchos a luchar por la justicia.",
      "Capítulo 2: Miguel Grau\n\nMiguel Grau Seminario nació en Piura en 1834. Es conocido como el «Caballero de los Mares» por su nobleza y valentía.\n\nFue comandante del monitor Huáscar durante la Guerra del Pacífico. Con un barco más pequeño y antiguo que los del enemigo, logró hazañas increíbles.\n\nGrau es recordado por su humanidad: devolvía las pertenencias de los marinos caídos a sus familias, incluso si eran enemigos. Es un ejemplo de honor y respeto.",
      "Capítulo 3: María Elena Moyano\n\nMaría Elena Moyano fue una líder social peruana que dedicó su vida a mejorar las condiciones de vida en Villa El Salvador, Lima.\n\nOrganizó comedores populares y programas de ayuda para las familias más necesitadas. Su valentía la convirtió en un símbolo de lucha pacífica.\n\nSu historia nos enseña que una persona decidida puede cambiar la vida de toda una comunidad."
    ],
    rating: 5, readTime: "35 min"
  },
  {
    id: 4, title: "Amigos de Verdad", author: "Ana Bondad",
    category: "Valores", grade: "1° - 2°", area: "Tutoría", difficulty: "Básico",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
    desc: "Historias cortas que enseñan sobre la amistad, el respeto, la honestidad y la solidaridad. Perfectas para los más pequeños de la escuela.",
    pages: [
      "La historia de Lucía y Tomás\n\nLucía era nueva en la escuela. El primer día se sentía muy nerviosa. No conocía a nadie y todo le parecía diferente.\n\nEn el recreo, se sentó sola en una banca del patio. Miraba cómo los otros niños jugaban y reían juntos.\n\nEntonces, un niño llamado Tomás se acercó con una sonrisa: «¡Hola! ¿Quieres jugar con nosotros?» Lucía sonrió por primera vez ese día.",
      "El tesoro compartido\n\nUn día, Tomás encontró una moneda brillante en el patio de la escuela. «¡Mira lo que encontré!» le dijo a Lucía emocionado.\n\n«¿Y si la usamos para comprar algo rico?» propuso Lucía.\n\nPero entonces vieron a Carlitos buscando algo en el suelo con cara triste. «Perdí mi moneda de la suerte», decía.\n\nTomás miró la moneda, miró a Lucía, y ambos supieron qué hacer. «¡Carlitos, aquí está tu moneda!» La sonrisa de Carlitos fue el mejor tesoro.",
      "Juntos somos más fuertes\n\nUn día de lluvia, el techo del salón comenzó a gotear. La maestra puso un balde, pero el agua seguía cayendo.\n\n«¡Yo traigo más baldes!» dijo Tomás. «¡Yo ayudo a mover las carpetas!» dijo Lucía. «¡Yo seco el piso!» dijo Carlitos.\n\nTodos trabajaron juntos y en poco tiempo el salón estaba seco y ordenado. La maestra los abrazó: «¿Ven? Cuando trabajamos juntos, todo se resuelve mejor».\n\nDesde ese día, los tres amigos supieron que juntos podían con cualquier desafío."
    ],
    rating: 5, readTime: "20 min"
  },
  {
    id: 5, title: "Aventuras Matemáticas", author: "Pedro Números",
    category: "Ciencia", grade: "3° - 4°", area: "Matemática", difficulty: "Intermedio",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=400&q=80",
    desc: "Las matemáticas nunca fueron tan divertidas. Resuelve acertijos, descubre patrones y aprende jugando con números y figuras geométricas.",
    pages: [
      "Capítulo 1: El misterio de los números\n\n¿Sabías que los números están en todas partes? En tu edad, en tu dirección, en la hora del recreo, ¡hasta en las estrellas!\n\nHoy vamos a jugar con los números del 1 al 100. Mira esta tabla:\n\n1  2  3  4  5  6  7  8  9  10\n11 12 13 14 15 16 17 18 19 20\n\n¿Puedes encontrar un patrón? Los números que terminan en 0 forman una columna. Los que terminan en 5 también. ¡Los patrones están en todos lados!",
      "Capítulo 2: Figuras mágicas\n\nMira a tu alrededor. ¿Cuántas figuras geométricas puedes encontrar?\n\nLa pizarra es un rectángulo. El reloj es un círculo. La ventana tiene forma de cuadrado.\n\n¿Y sabes qué es increíble? Con solo tres formas básicas — el triángulo, el cuadrado y el círculo — puedes dibujar casi cualquier cosa: una casa, un árbol, un robot, ¡hasta un cohete espacial!",
      "Capítulo 3: Acertijos divertidos\n\nAcertijo 1: Si tienes 3 manzanas y tu amigo te da 2 más, ¿cuántas manzanas tienes? ¡Fácil! 3 + 2 = 5 manzanas.\n\nAcertijo 2: En el salón hay 4 filas de carpetas con 5 carpetas en cada fila. ¿Cuántas carpetas hay en total? 4 × 5 = 20 carpetas.\n\nAcertijo 3: Tienes 12 colores y quieres repartirlos entre 3 amigos por igual. ¿Cuántos le tocan a cada uno? 12 ÷ 3 = 4 colores cada uno. ¡Justo y parejo!"
    ],
    rating: 4, readTime: "25 min"
  },
  {
    id: 6, title: "Cuentos de Puquio", author: "Tradición Oral",
    category: "Cuentos", grade: "1° - 2°", area: "Comunicación", difficulty: "Básico",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    desc: "Relatos mágicos de nuestra tierra puquiana. Leyendas del cóndor, la laguna y los apus que nuestros abuelos contaban junto al fogón.",
    pages: [
      "El Cóndor y la Pastora\n\nEn las alturas de Puquio, donde las nubes tocan los cerros, vivía una joven pastora llamada Wayra. Cada mañana llevaba sus llamas a pastar cerca de la laguna sagrada.\n\nUn día, un hermoso joven apareció entre las rocas. Tenía una capa negra con bordes blancos y ojos brillantes como el sol.\n\n«¿Quién eres?» preguntó Wayra.\n«Soy el hijo del Apu Qarawasu» respondió el joven con voz suave como el viento.",
      "El joven visitó a Wayra cada día. Le traía flores silvestres y le cantaba canciones antiguas. Wayra se sentía feliz.\n\nPero una tarde, cuando el sol se ocultaba tras los cerros, el joven extendió los brazos y... ¡se convirtió en un majestuoso cóndor!\n\nSus alas enormes cubrieron el cielo. Wayra no tuvo miedo. «Ahora entiendo», dijo ella, «por eso conoces todos los secretos del cielo».\n\nEl cóndor la miró con ternura y voló en círculos sobre ella, protegiéndola como un guardián.",
      "Desde aquel día, cada vez que los niños de Puquio ven un cóndor volando sobre las montañas, recuerdan la historia de Wayra.\n\n«Miren», dicen los abuelos señalando el cielo, «el cóndor cuida de nuestra tierra. Nos recuerda que debemos respetar la naturaleza y amar nuestras tradiciones».\n\nY así, entre montañas y cielos azules, las historias de Puquio siguen vivas en el corazón de cada niño que las escucha.\n\n— Fin —\n\n¿Te gustó esta historia? Pídele a tus abuelos que te cuenten más leyendas de nuestra tierra."
    ],
    rating: 5, readTime: "15 min"
  }
];

const CATEGORIES = ['Todos', 'Cuentos', 'Ciencia', 'Historia', 'Valores'];
const GRADES = ['Todos', '1° - 2°', '3° - 4°', '5° - 6°'];
const DIFFICULTIES = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

const BibliotecaVirtual = () => {
  const { lang } = useLang();
  const t = locales[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todos');
  const [grade, setGrade] = useState('Todos');
  const [difficulty, setDifficulty] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  const filteredBooks = BOOKS_DATA.filter(book =>
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (category === 'Todos' || book.category === category) &&
    (grade === 'Todos' || book.grade === grade) &&
    (difficulty === 'Todos' || book.difficulty === difficulty)
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && readerRef.current) {
      readerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const openBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBook = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setSelectedBook(null);
    setIsFullscreen(false);
  };

  const categoryEmoji: Record<string, string> = {
    'Cuentos': '📖', 'Ciencia': '🔬', 'Historia': '🏛️', 'Valores': '💛'
  };

  const difficultyColor: Record<string, string> = {
    'Básico': 'bg-green-100 text-green-700',
    'Intermedio': 'bg-amber-100 text-amber-700',
    'Avanzado': 'bg-red-100 text-red-700',
  };

  // ─── READER VIEW ───
  if (selectedBook) {
    const book = selectedBook;
    const totalPages = book.pages.length;

    return (
      <div ref={readerRef} className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-amber-50' : 'bg-gradient-to-b from-amber-50 to-background'}`}>
        {/* Reader toolbar */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between gap-2">
          <button onClick={closeBook} className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">{t.back}</span>
          </button>

          <h2 className="font-extrabold text-foreground text-sm sm:text-base truncate text-center flex-1 mx-2">{book.title}</h2>

          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => setFontSize(s => Math.max(14, s - 2))} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Reducir texto">
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-bold text-muted-foreground w-8 text-center">{fontSize}</span>
            <button onClick={() => setFontSize(s => Math.min(28, s + 2))} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Aumentar texto">
              <ZoomIn size={16} />
            </button>
            <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-muted transition-colors ml-1" title="Pantalla completa">
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div
            className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-10 min-h-[60vh] whitespace-pre-line leading-relaxed text-foreground"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
          >
            {book.pages[currentPage]}
          </div>
        </div>

        {/* Page navigation */}
        <div className="sticky bottom-0 bg-card/95 backdrop-blur border-t border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-30 transition-all hover:shadow-md disabled:hover:shadow-none"
          >
            ← Anterior
          </button>

          <div className="flex items-center gap-2">
            {book.pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === currentPage ? 'bg-primary scale-125' : 'bg-border hover:bg-muted-foreground/40'}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-30 transition-all hover:shadow-md disabled:hover:shadow-none"
          >
            Siguiente →
          </button>
        </div>
      </div>
    );
  }

  // ─── LIBRARY VIEW ───
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
            <BookOpen size={18} />
            <span>Biblioteca Escolar Digital</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground mb-3">
            📚 {t.library.welcome}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">{t.library.subtitle}</p>
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen size={16} className="text-primary" />
              <span className="font-bold">{BOOKS_DATA.length} libros</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Star size={16} className="text-accent" />
              <span className="font-bold">{CATEGORIES.length - 1} categorías</span>
            </div>
          </div>
        </div>

        {/* Search + filter toggle */}
        <div className="max-w-2xl mx-auto mb-6 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder={t.library.searchPlace}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none shadow-sm text-base"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-4 rounded-2xl border font-bold text-sm flex items-center gap-2 transition-all ${showFilters ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:border-primary'}`}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="max-w-2xl mx-auto mb-8 bg-card rounded-2xl border border-border p-5 shadow-sm animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 block">Grado</label>
                <div className="flex flex-wrap gap-2">
                  {GRADES.map(g => (
                    <button key={g} onClick={() => setGrade(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${grade === g ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                    >{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 block">Dificultad</label>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map(d => (
                    <button key={d} onClick={() => setDifficulty(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${difficulty === d ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                    >{d}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 block">Categoría</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                    >{c}</button>
                  ))}
                </div>
              </div>
            </div>
            {(grade !== 'Todos' || difficulty !== 'Todos' || category !== 'Todos') && (
              <button onClick={() => { setGrade('Todos'); setDifficulty('Todos'); setCategory('Todos'); }}
                className="mt-4 text-xs font-bold text-destructive hover:underline"
              >✕ Limpiar filtros</button>
            )}
          </div>
        )}

        {/* Category pills (quick) */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                category === cat
                  ? 'bg-primary text-primary-foreground scale-105 shadow-md'
                  : 'bg-card text-foreground border border-border hover:border-primary hover:shadow-md'
              }`}
            >
              {cat !== 'Todos' && <span className="mr-1">{categoryEmoji[cat]}</span>}
              {cat === 'Todos' ? '🌟 Todos' : cat}
            </button>
          ))}
        </div>

        {/* Books grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <div
                key={book.id}
                className="bg-card rounded-3xl overflow-hidden shadow-md border border-border hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                onClick={() => openBook(book)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={book.image} alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                      {categoryEmoji[book.category]} {book.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${difficultyColor[book.difficulty]}`}>
                      {book.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {book.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      {'⭐'.repeat(Math.min(book.rating, 5))}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{book.grade}</span>
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{book.area}</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-foreground mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{book.desc}</p>
                  <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                    <BookOpen size={16} /> Leer ahora <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-xl font-bold text-muted-foreground">{t.library.noResults}</p>
            <button onClick={() => { setSearchTerm(''); setCategory('Todos'); setGrade('Todos'); setDifficulty('Todos'); }}
              className="mt-4 text-primary font-bold hover:underline"
            >Ver todos los libros</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaVirtual;
