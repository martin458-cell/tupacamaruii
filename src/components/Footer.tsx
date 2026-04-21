import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import logoInstitucional from '@/assets/logo-institucional.png';

const Footer = () => {
  const { lang } = useLang();
  const t = locales[lang];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoInstitucional}
                alt='Escudo IEPM N° 24009 Túpac Amaru II'
                className="h-14 w-14 object-contain bg-white/5 rounded-lg p-1"
              />
              <span className="font-extrabold text-lg leading-tight">IEPM N° 24009 <span className="text-destructive">"Túpac Amaru II"</span></span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{t.footer.desc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-lg mb-4">{t.footer.linksTitle}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t.nav.home}</Link></li>
              <li><Link to="/biblioteca" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t.nav.library}</Link></li>
              <li><Link to="/rincon-civico" className="text-sm opacity-80 hover:opacity-100 transition-opacity">{t.nav.civic}</Link></li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold text-lg mb-4">{t.footer.contactTitle}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span className="text-sm opacity-80">{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm opacity-80">+51 999 999 999</span>
              </div>
            </div>

            <div className="mt-6 bg-primary-foreground/10 rounded-2xl p-4">
              <h4 className="font-bold text-sm mb-1">{t.footer.whatsappTitle}</h4>
              <p className="text-xs opacity-70 mb-3">{t.footer.whatsappDesc}</p>
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
              >
                <MessageCircle size={16} />
                {t.footer.whatsappBtn}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm opacity-60">© 2026 IEPM N° 24009 "Túpac Amaru II". {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
