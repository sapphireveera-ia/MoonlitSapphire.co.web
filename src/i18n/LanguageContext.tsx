import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'moonlit-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'id';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
    return 'id';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleLanguage = () => setLanguageState((prev) => (prev === 'en' ? 'id' : 'en'));

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook used by every component that needs the current language or translated strings
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}

// Small helper for picking a bilingual value: pick({ en: 'Hello', id: 'Halo' }, 'id') -> 'Halo'
export function pick<T>(value: { en: T; id: T }, language: Language): T {
  return value[language];
}
