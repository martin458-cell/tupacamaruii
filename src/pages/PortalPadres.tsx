import { useState } from 'react';
import { User, FileText, CreditCard, Bell, AlertCircle, MessageSquare } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';

const PortalPadres = () => {
  const { lang } = useLang();
  const [activeTab, setActiveTab] = useState('inicio');

  const estudiante = {
    nombre: "Sofía Quispe Mamani",
    grado: "4º Primaria - Sección A"
  };

  const avisos = [
    { id: 1, tipo: 'urgente', titulo: "Reunión de Padres", fecha: "15 Mar 2026", desc: "Entrega de libretas del primer bimestre." },
    { id: 2, tipo: 'info', titulo: "Materiales de Arte", fecha: "10 Mar 2026", desc: "Traer témperas y pinceles para la próxima semana." },
    { id: 3, tipo: 'pago', titulo: "Vencimiento de Pensión", fecha: "05 Mar 2026", desc: "Recordatorio de pago de la mensualidad de Marzo." },
  ];

  const calificaciones = [
    { materia: "Matemática", nota: 18, color: "bg-green-500" },
    { materia: "Comunicación", nota: 17, color: "bg-primary" },
    { materia: "Ciencia y Tecnología", nota: 16, color: "bg-accent" },
    { materia: "Personal Social", nota: 19, color: "bg-green-600" },
    { materia: "Arte y Cultura", nota: 20, color: "bg-destructive" },
    { materia: "Educación Física", nota: 18, color: "bg-primary" },
  ];

  const getAvisoIcon = (tipo: string) => {
    switch (tipo) {
      case 'urgente': return <AlertCircle size={18} className="text-destructive" />;
      case 'info': return <MessageSquare size={18} className="text-primary" />;
      case 'pago': return <CreditCard size={18} className="text-accent-foreground" />;
      default: return <Bell size={18} />;
    }
  };

  const tabs = [
    { id: 'inicio', label: lang === 'es' ? 'Avisos' : 'Willakuykuna', icon: Bell },
    { id: 'notas', label: lang === 'es' ? 'Notas' : 'Yupay', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground mb-8 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black">{estudiante.nombre}</h1>
              <p className="opacity-80">{estudiante.grado}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground border border-border hover:bg-muted'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'inicio' && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-black text-foreground mb-4">
              {lang === 'es' ? 'Comunicados' : 'Willakuykuna'}
            </h2>
            {avisos.map(aviso => (
              <div key={aviso.id} className="bg-card rounded-2xl p-5 shadow-md border border-border hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
                    {getAvisoIcon(aviso.tipo)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-extrabold text-foreground">{aviso.titulo}</h3>
                      <span className="text-xs text-muted-foreground">{aviso.fecha}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{aviso.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notas' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-foreground mb-4">
              {lang === 'es' ? 'Calificaciones - I Bimestre' : 'Yupay - I Bimestre'}
            </h2>
            <div className="bg-card rounded-3xl shadow-md border border-border overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-border">
                {calificaciones.map((cal, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 hover:bg-muted/50 transition-colors">
                    <span className="font-bold text-foreground">{cal.materia}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(cal.nota / 20) * 100}%` }}
                        />
                      </div>
                      <span className="font-black text-lg text-foreground w-8 text-right">{cal.nota}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              {lang === 'es'
                ? 'Las notas del primer bimestre estarán disponibles pronto.'
                : 'Ñawpaq bimestre yupaykunaqa dasmi kanqa.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalPadres;
