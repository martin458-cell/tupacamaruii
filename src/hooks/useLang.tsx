import React, { createContext, useContext, useState } from 'react';
import { Lang } from '@/lib/translations';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
  toggleLang: () => {},
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('es');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'qu' : 'es');
  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
