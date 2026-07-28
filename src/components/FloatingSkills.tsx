import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface Skill {
  name: string;
  // devicon CDN url; omitted for tools without a reliable official logo icon
  icon?: string;
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Core tech stack shown as gently floating bubbles.
// Purely decorative/informational — not clickable, not a filter.
const SKILLS: Skill[] = [
  { name: 'HTML5', icon: `${DEVICON_BASE}/html5/html5-original.svg` },
  { name: 'CSS3', icon: `${DEVICON_BASE}/css3/css3-original.svg` },
  { name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  { name: 'TypeScript', icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  { name: 'React', icon: `${DEVICON_BASE}/react/react-original.svg` },
  { name: 'Python', icon: `${DEVICON_BASE}/python/python-original.svg` },
  { name: 'Flask', icon: `${DEVICON_BASE}/flask/flask-original.svg` },
  { name: 'PHP', icon: `${DEVICON_BASE}/php/php-original.svg` },
  { name: 'Laravel', icon: `${DEVICON_BASE}/laravel/laravel-original.svg` },
  { name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original-wordmark.svg` },
  { name: 'PostgreSQL', icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
  { name: 'SQLite', icon: `${DEVICON_BASE}/sqlite/sqlite-original.svg` },
  { name: 'Tailwind CSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Figma', icon: `${DEVICON_BASE}/figma/figma-original.svg` },
  { name: 'Git', icon: `${DEVICON_BASE}/git/git-original.svg` },
  // No official brand icon available for these — shown as text-only chips
  { name: 'Streamlit' },
  { name: 'LangChain' },
  { name: 'ChromaDB' },
  { name: 'RAG' },
  { name: 'Gemini API' },
  { name: 'Machine Learning' },
  { name: 'Computer Vision' },
  { name: 'Framer Motion' },
];

export default function FloatingSkills() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full py-16" id="tech-stack">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
          {t.skills.heading}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[var(--col-sapphire)] to-[var(--col-indigo)] mx-auto rounded-full mb-4" />
        <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
          {t.skills.subheading}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
        {SKILLS.map((skill, idx) => {
          // Deterministic little variety per bubble so the float feels organic,
          // without relying on randomness (keeps it stable across renders).
          const duration = 3.2 + (idx % 5) * 0.35;
          const delay = (idx % 7) * 0.22;
          const distance = 5 + (idx % 3) * 2;

          return (
            <motion.div
              key={skill.name}
              animate={{ y: [0, -distance, 0] }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-dim)] shadow-sm select-none"
            >
              {skill.icon && (
                <img
                  src={skill.icon}
                  alt=""
                  className="w-4 h-4 md:w-[18px] md:h-[18px] object-contain shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    // Gracefully hide the icon if a logo URL ever breaks
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span>{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
}