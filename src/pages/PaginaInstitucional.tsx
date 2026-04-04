import { Calendar, BookOpen, Bell, Globe2, Cpu, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import { useState } from 'react';
import { toast } from 'sonner';
import heroPortada from '@/assets/hero-portada.jpg';

const QuickAccessCard = ({ icon: Icon, title, desc, color, to }: {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  color: string;
  to?: string;
}) => {
  const content = (
    <>
      <Icon className={`mx-auto mb-2 ${color}`} size={28} />
      <p className="font-extrabold text-sm text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="bg-card rounded-2xl p-5 shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer text-center">
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-5 shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer text-center">
      {content}
    </div>
  );
};

const PaginaInstitucional = () => {
  const { lang } = useLang();
  const t = locales[lang];

  const quickItems = [
    { icon: Calendar, title: t.quick.calTitle, desc: t.quick.calDesc, color: 'text-primary' },
    { icon: BookOpen, title: t.quick.platTitle, desc: t.quick.platDesc, color: 'text-primary', to: '/biblioteca' },
    { icon: Globe2, title: lang === 'es' ? 'Rincón' : 'Llaqta', desc: lang === 'es' ? 'Cívico' : 'Taki', color: 'text-primary', to: '/rincon-civico' },
    { icon: Bell, title: lang === 'es' ? 'Herramientas' : 'Llamkana', desc: lang === 'es' ? 'IA' : 'IA', color: 'text-destructive', to: '/herramientas-ia' },
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
          <div className="inline-flex items-center gap-2 bg-accent/80 text-accent-foreground px-4 py-2 rounded-full text-sm font-bold mb-4 w-fit backdrop-blur-sm">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.hero.badgeTitle} — {t.hero.badgeDesc}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight text-white mb-4 max-w-3xl drop-shadow-lg">
            {t.hero.title1}
            <span className="text-amber-300">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-2xl drop-shadow">
            {t.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#admisiones" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105">
              {t.hero.btnPrimary}
              <ChevronRight size={18} />
            </a>
            <Link to="/herramientas-ia" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-base shadow-md border border-white/30 hover:bg-white/30 transition-all">
              {lang === 'es' ? 'Herramientas IA' : 'IA Llamkanakuna'}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-8 -mt-6 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              { icon: Globe2, title: t.essence.card1Title, desc: t.essence.card1Desc, gradient: 'from-primary/10 to-primary/5' },
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

      {/* Admissions */}
      <AdmissionsSection />
    </div>
  );
};

const AdmissionsSection = () => {
  const { lang } = useLang();
  const t = locales[lang];
  const [form, setForm] = useState({ parent: '', student: '', grade: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === 'es' ? '¡Solicitud enviada con éxito!' : 'Apachisqa!');
    setForm({ parent: '', student: '', grade: '', email: '', phone: '' });
  };

  return (
    <section id="admisiones" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-4">{t.admissions.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.admissions.desc}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { num: 1, title: t.admissions.step1Title, desc: t.admissions.step1Desc },
            { num: 2, title: t.admissions.step2Title, desc: t.admissions.step2Desc },
            { num: 3, title: t.admissions.step3Title, desc: t.admissions.step3Desc },
          ].map((step) => (
            <div key={step.num} className="bg-card rounded-3xl p-6 shadow-md border border-border text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-extrabold text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto bg-card rounded-3xl p-8 shadow-lg border border-border">
          <h3 className="font-extrabold text-2xl text-foreground mb-6 text-center">{t.admissions.formTitle}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder={t.admissions.formNameParent} value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
            <input type="text" placeholder={t.admissions.formNameStudent} value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder={t.admissions.formGrade} value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
              <input type="email" placeholder={t.admissions.formEmail} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
            <input type="tel" placeholder={t.admissions.formPhone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none" />
            <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-base shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
              {t.admissions.formBtn}
            </button>
            <p className="text-center text-xs text-muted-foreground">{t.admissions.formPrivacy}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaginaInstitucional;
