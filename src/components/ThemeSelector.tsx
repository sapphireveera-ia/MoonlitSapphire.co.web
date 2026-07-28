import React, { useEffect, useState } from 'react';
import { ThemeMode } from '../types';
import { Sun, Sunset, Moon, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface ThemeSelectorProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const [resolvedTheme, setResolvedTheme] = useState<string>('night');

  useEffect(() => {
    const applyTheme = () => {
      let activeTheme = currentTheme;
      if (currentTheme === 'auto') {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 16) {
          activeTheme = 'morning';
        } else if (hour >= 16 && hour < 19) {
          activeTheme = 'sunset';
        } else {
          activeTheme = 'night';
        }
      }
      setResolvedTheme(activeTheme);
      document.documentElement.setAttribute('data-theme', activeTheme);
    };

    applyTheme();

    // Set an interval to recheck auto theme every minute
    const interval = setInterval(applyTheme, 60000);
    return () => clearInterval(interval);
  }, [currentTheme]);

  const themes: { mode: ThemeMode; label: string; icon: React.ReactNode; colorClass: string }[] = [
    { 
      mode: 'morning', 
      label: t.themeSelector.morning, 
      icon: <Sun className="w-4 h-4" />, 
      colorClass: 'hover:text-blue-500 hover:bg-blue-50 text-blue-600 dark:text-blue-400' 
    },
    { 
      mode: 'sunset', 
      label: t.themeSelector.sunset, 
      icon: <Sunset className="w-4 h-4" />, 
      colorClass: 'hover:text-pink-500 hover:bg-pink-950/20 text-pink-500' 
    },
    { 
      mode: 'night', 
      label: t.themeSelector.night, 
      icon: <Moon className="w-4 h-4" />, 
      colorClass: 'hover:text-sapphire-lt hover:bg-indigo-950/20 text-indigo-400' 
    },
    { 
      mode: 'auto', 
      label: t.themeSelector.auto, 
      icon: <Sparkles className="w-4 h-4" />, 
      colorClass: 'hover:text-amber-500 hover:bg-amber-950/10 text-amber-400' 
    }
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-[var(--col-border)] bg-[var(--col-surface-2)] backdrop-blur-md">
      {themes.map((theme) => {
        const isActive = currentTheme === theme.mode;
        return (
          <button
            key={theme.mode}
            onClick={() => onThemeChange(theme.mode)}
            title={theme.label}
            className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-[var(--col-sapphire)] text-white shadow-md scale-105' 
                : `text-[var(--col-text-dim)] ${theme.colorClass}`
            }`}
            id={`theme-btn-${theme.mode}`}
            aria-label={`${t.themeSelector.ariaChangeTo} ${theme.label}`}
          >
            {theme.icon}
            {isActive && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-medium bg-[var(--col-bg-2)] border border-[var(--col-border)] text-[var(--col-text)] rounded shadow-lg pointer-events-none whitespace-nowrap opacity-0 hover:opacity-100 md:group-hover:opacity-100 transition-opacity">
                {theme.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
