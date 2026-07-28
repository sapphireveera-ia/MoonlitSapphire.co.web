import { motion } from 'motion/react';
import { X, Play, Github, Award, BookOpen, Layers, Compass, BarChart } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const caseStudy = project.caseStudy;

  if (!caseStudy) return null;

  const sections = [
    { id: 'overview', label: t.caseStudyModal.overview, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'problem', label: t.caseStudyModal.problem, icon: <Compass className="w-4 h-4" /> },
    { id: 'solution', label: t.caseStudyModal.solution, icon: <Award className="w-4 h-4" /> },
    { id: 'architecture', label: t.caseStudyModal.architecture, icon: <Layers className="w-4 h-4" /> },
    { id: 'challenges', label: t.caseStudyModal.challenges, icon: <Layers className="w-4 h-4 animate-spin-slow" /> },
    { id: 'result', label: t.caseStudyModal.result, icon: <BarChart className="w-4 h-4" /> }
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(`cs-sec-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-hidden select-none">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Main Body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
        className="relative w-full max-w-5xl h-[90vh] bg-[var(--col-bg-2)] border border-[var(--col-border)] rounded-3xl overflow-hidden flex flex-col shadow-2xl z-10"
      >
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-[var(--col-bg)] to-[var(--col-surface-2)] border-b border-[var(--col-border)] flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--col-sapphire-lt)] bg-[var(--col-sapphire)]/10 px-2.5 py-1 rounded-full border border-[var(--col-border)] font-bold">
                {t.caseStudyModal.badge}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--col-moon-lt)] tracking-wide leading-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--col-surface)] text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)] transition-colors cursor-pointer"
            id="cs-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section: Sidebar Navigation + Main Article Scroll */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Navigation Rails - Hidden on Mobile */}
          <div className="w-48 hidden md:block border-r border-[var(--col-border)] bg-[var(--col-bg)]/50 p-4 shrink-0">
            <div className="text-[10px] font-mono text-[var(--col-text-muted)] uppercase tracking-wider mb-4 font-bold">
              {t.caseStudyModal.studyNav}
            </div>
            <div className="flex flex-col space-y-1.5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleScrollToSection(sec.id)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)] hover:bg-[var(--col-surface-2)] transition-all text-left cursor-pointer"
                >
                  {sec.icon}
                  <span>{sec.label}</span>
                </button>
              ))}
            </div>

            {/* Quick action buttons in case studies */}
            <div className="mt-8 pt-6 border-t border-[var(--col-border)] flex flex-col space-y-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-xl bg-[var(--col-sapphire)] border border-[var(--col-sapphire-lt)] text-white hover:scale-105 transition-all text-center"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.caseStudyModal.liveDemo}</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-xl bg-transparent border border-[var(--col-border)] text-[var(--col-text)] hover:bg-[var(--col-surface-2)] hover:scale-105 transition-all text-center"
                >
                  <i className="fa-brands fa-github text-xs"></i>
                  <span>{t.caseStudyModal.githubSrc}</span>
                </a>
              )}
              {project.pitchDeckUrl && (
                <a
                  href={project.pitchDeckUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-xl bg-transparent border border-[var(--col-border)] text-[var(--col-text)] hover:bg-[var(--col-surface-2)] hover:scale-105 transition-all text-center"
                >
                  <i className="fa-solid fa-file-pdf text-xs"></i>
                  <span>{t.caseStudyModal.pitchDeck}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Main Article Container */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 scrollbar-thin">
            
            {/* Overview / Background */}
            <section id="cs-sec-overview" className="scroll-mt-6">
              <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-3 flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                <BookOpen className="w-5 h-5 text-[var(--col-sapphire-lt)]" />
                <span>{t.caseStudyModal.sec1}</span>
              </h4>
              <p className="text-sm text-[var(--col-text-dim)] font-light leading-relaxed whitespace-pre-wrap">
                {caseStudy.overview[language]}
              </p>
            </section>

            {/* The Problem */}
            <section id="cs-sec-problem" className="scroll-mt-6">
              <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-3 flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                <Compass className="w-5 h-5 text-red-400" />
                <span>{t.caseStudyModal.sec2}</span>
              </h4>
              <p className="text-sm text-[var(--col-text-dim)] font-light leading-relaxed whitespace-pre-wrap bg-red-950/10 p-5 rounded-2xl border border-red-500/10 italic">
                {caseStudy.problem[language]}
              </p>
            </section>

            {/* The Solution */}
            <section id="cs-sec-solution" className="scroll-mt-6">
              <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-3 flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>{t.caseStudyModal.sec3}</span>
              </h4>
              <p className="text-sm text-[var(--col-text-dim)] font-light leading-relaxed whitespace-pre-wrap bg-emerald-950/10 p-5 rounded-2xl border border-emerald-500/10">
                {caseStudy.solution[language]}
              </p>
            </section>

            {/* Tech Stack / Architecture */}
            <section id="cs-sec-architecture" className="scroll-mt-6">
              <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-4 flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                <Layers className="w-5 h-5 text-[var(--col-accent)]" />
                <span>{t.caseStudyModal.sec4}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.architecture[language].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--col-border)] bg-[var(--col-surface-2)] flex gap-3 items-start hover:border-[var(--col-sapphire-lt)] transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--col-sapphire)] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-xs md:text-sm text-[var(--col-text-dim)] font-light leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section id="cs-sec-challenges" className="scroll-mt-6">
              <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-4 flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                <Layers className="w-5 h-5 text-[var(--col-accent-warm)]" />
                <span>{t.caseStudyModal.sec5}</span>
              </h4>
              <div className="space-y-3">
                {caseStudy.challenges[language].map((challenge, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[var(--col-border)] bg-[var(--col-surface-2)]/30 flex gap-3 italic text-xs md:text-sm text-[var(--col-text-muted)]"
                  >
                    <span className="text-[var(--col-accent-warm)] font-mono font-bold">★ {t.caseStudyModal.challengeLabel} {idx + 1}:</span>
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Result & Future Plan */}
            <section id="cs-sec-result" className="scroll-mt-6">
              <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-3 flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                <BarChart className="w-5 h-5 text-[var(--col-sapphire-mid)]" />
                <span>{t.caseStudyModal.sec6}</span>
              </h4>
              <p className="text-sm text-[var(--col-text-dim)] font-light leading-relaxed mb-6">
                {caseStudy.result[language]}
              </p>

              <div className="p-5 rounded-2xl border border-[var(--col-border)] bg-gradient-to-r from-[var(--col-sapphire)]/5 to-[var(--col-indigo)]/5">
                <h5 className="text-sm font-bold text-[var(--col-moon-lt)] font-mono uppercase tracking-widest mb-2">
                  {t.caseStudyModal.futurePlanLabel}
                </h5>
                <p className="text-xs text-[var(--col-text-dim)] leading-relaxed italic">
                  {caseStudy.futurePlan[language]}
                </p>
              </div>

              {/* Premium Case Study Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[var(--col-border)] flex flex-wrap gap-4 items-center">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2.5 px-5 py-3 text-xs font-bold tracking-wider uppercase rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 border border-amber-500 text-white shadow-lg shadow-amber-950/25 hover:from-amber-500 hover:to-orange-500 hover:scale-105 transition-all text-center cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.caseStudyModal.liveDemo}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2.5 px-5 py-3 text-xs font-bold tracking-wider uppercase rounded-xl bg-transparent border border-amber-500/40 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400 hover:scale-105 transition-all text-center cursor-pointer"
                  >
                    <i className="fa-brands fa-github text-sm"></i>
                    <span>{t.caseStudyModal.viewOnGithub}</span>
                  </a>
                )}
                {project.pitchDeckUrl && (
                  <a
                    href={project.pitchDeckUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2.5 px-5 py-3 text-xs font-bold tracking-wider uppercase rounded-xl bg-transparent border border-amber-500/40 text-amber-200 hover:bg-amber-500/10 hover:border-amber-400 hover:scale-105 transition-all text-center cursor-pointer"
                  >
                    <i className="fa-solid fa-file-pdf text-sm"></i>
                    <span>{t.caseStudyModal.pitchDeck}</span>
                  </a>
                )}
              </div>
            </section>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
