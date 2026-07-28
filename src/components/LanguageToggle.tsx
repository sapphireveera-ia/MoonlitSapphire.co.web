import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full border border-[var(--col-border)] bg-[var(--col-surface-2)] p-0.5 text-[10px] font-mono font-bold uppercase tracking-wider"
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => setLanguage('id')}
        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          language === 'id'
            ? 'bg-[var(--col-sapphire)] text-white shadow-sm'
            : 'text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)]'
        }`}
        aria-pressed={language === 'id'}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-[var(--col-sapphire)] text-white shadow-sm'
            : 'text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)]'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}
