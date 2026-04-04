import { Calendar, BookOpen, Bell, Globe2, Cpu, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import { useState } from 'react';
import { toast } from 'sonner';
import heroPortada from '@/assets/hero-portada.jpg';

const quickCardColors = [
  { bg: 'bg-primary/10', hover: 'hover:bg-primary/20', icon: 'text-primary', ring: 'ring-primary/30' },
  { bg: 'bg-accent/15', hover: 'hover:bg-accent/25', icon: 'text-accent-foreground', ring: 'ring-accent/30' },
  { bg: 'bg-destructive/10', hover: 'hover:bg-destructive/20', icon: 'text-destructive', ring: 'ring-destructive/30' },
];

const QuickAccessCard = ({ icon: Icon, title, desc, colorIdx, to }: {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  colorIdx: number;
  to?: string;
}) => {
  const c = quickCardColors[colorIdx % quickCardColors.length];
  const content = (
    <div className={`group ${c.bg} ${c.hover} rounded-3xl p-6 shadow-md border border-border hover:shadow-xl hover:-translate-y-2 hover:ring-2 ${c.ring} transition-all duration-300 cursor-pointer text-center`}>
      <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-card shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <Icon className={c.icon} size={28} />
      </div>
      <p className="font-extrabold text-base text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
          {to ? 'Explorar' : 'Ver más'} <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};

const PaginaInstitucional = () => {
  const { lang } = useLang();
  const t = locales[lang];

  const quickItems = [
    { icon: Calendar, title: t.quick.calTitle, desc: t.quick.calDesc, colorIdx: 0 },
    { icon: BookOpen, title: t.quick.platTitle, desc: t.quick.platDesc, colorIdx: 1, to: '/biblioteca' },
    { icon: Globe2, title: lang === 'es' ? 'Rincón' : 'Llaqta', desc: lang === 'es' ? 'Cívico' : 'Taki', colorIdx: 2, to: '/rincon-civico' },
  ];

  return (
    <div>
      {/* Hero Portada */}
      <section className="relative w-full h-[calc(100vh-64px)] min-h-[500px] overflow-hidden">
        <img
          src={heroPortada}
          alt="Estudiantes de la I.E. 24009 Túpac Amaru II aprendiendo con tecnología y robótica"
          width={1920}
          height={768}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white mb-4 max-w-3xl drop-shadow-lg">
            {t.hero.title1}
            <span className="text-amber-300">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-2xl drop-shadow">
            {t.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#esencia" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105">
              {t.hero.btnPrimary}
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-8 -mt-6 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-5">
            {quickItems.map((item, idx) => (
              <QuickAccessCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Essence */}
      <section id="esencia" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-4">{t.essence.tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">{t.essence.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.essence.desc}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: t.essence.card2Title, desc: t.essence.card2Desc, gradient: 'from-accent/20 to-accent/5' },
              { icon: Heart, title: t.essence.card3Title, desc: t.essence.card3Desc, gradient: 'from-destructive/10 to-destructive/5' },
            ].map((card, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 border border-border hover:shadow-lg transition-all`}>
                <card.icon className="text-primary mb-4" size={36} />
                <h3 className="font-extrabold text-xl text-foreground mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="metodologia" className="py-16 sm:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                alt="Estudiantes aprendiendo"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-6">{t.methodology.title}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{t.methodology.desc1}</p>
              <p className="text-muted-foreground mb-6 leading-relaxed">{t.methodology.desc2}</p>
              <ul className="space-y-3 mb-8">
                {[t.methodology.point1, t.methodology.point2, t.methodology.point3].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span className="text-foreground font-semibold">{point}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all">
                {t.methodology.btn}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PaginaInstitucional;
