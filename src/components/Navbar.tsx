import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, toggleLang } = useLang();
  const t = locales[lang];
  const location = useLocation();

  const isHome = location.pathname === '/';

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/biblioteca', label: t.nav.library },
    { to: '/rincon-civico', label: t.nav.civic },
    { to: '/#admisiones', label: t.nav.admissions },
  ];

  const handleNavClick = (to: string) => {
    setIsMenuOpen(false);
    if (to.startsWith('/#')) {
      const id = to.replace('/#', '');
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b-4 border-destructive shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            <span className="font-extrabold text-foreground text-sm sm:text-base">
              I.E. 24009 <span className="text-destructive">"Túpac Amaru II"</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to.startsWith('/#') && isHome ? '/' : link.to}
                onClick={() => handleNavClick(link.to)}
                className="px-3 py-2 rounded-lg text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="ml-2 text-2xl bg-muted p-2 rounded-xl hover:scale-110 transition-transform"
              title={lang === 'es' ? 'Cambiar a Quechua' : 'Españolman tikray'}
            >
              {lang === 'es' ? '🇵🇪' : '🏔️'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-2xl bg-muted p-2 rounded-xl"
            >
              {lang === 'es' ? '🇵🇪' : '🏔️'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground bg-muted p-2 rounded-lg"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to.startsWith('/#') && isHome ? '/' : link.to}
                onClick={() => handleNavClick(link.to)}
                className="block px-4 py-3 rounded-xl text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
