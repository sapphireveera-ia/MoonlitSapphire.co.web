import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, ShieldCheck, Heart, Users, Compass, BookOpen, Presentation } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

function AnimatedCounter({ label, value, suffix, icon, metricLabel }: StatItemProps & { metricLabel: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (end === 0) return;
      
      const duration = 1500; // ms
      const incrementTime = Math.max(Math.floor(duration / end), 15);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="glass-card flex flex-col justify-between p-6 rounded-2xl relative overflow-hidden group hover:border-[var(--col-sapphire-lt)]"
    >
      {/* Background glow overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--col-glow-soft)] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-[var(--col-surface-2)] text-[var(--col-sapphire-lt)] border border-[var(--col-border)] group-hover:scale-110 group-hover:rotate-6 transition-all">
          {icon}
        </div>
        <div className="text-[10px] font-mono tracking-widest text-[var(--col-text-muted)] uppercase">
          {metricLabel}
        </div>
      </div>

      <div>
        <div className="text-3xl md:text-4xl font-extrabold text-[var(--col-moon)] font-display tracking-tight mb-1 flex items-baseline">
          <span>{value === 9999 ? '∞' : count}</span>
          <span className="text-[var(--col-sapphire-lt)] text-2xl ml-0.5">{suffix}</span>
        </div>
        <div className="text-sm text-[var(--col-text-dim)] font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function AchievementDashboard() {
  const { language } = useLanguage();
  const t = translations[language];
  const statsList = [
    {
      label: t.achievements.stats.projects,
      value: 9,
      suffix: '+',
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      label: t.achievements.stats.aiIntegrations,
      value: 3,
      suffix: '+',
      icon: <Compass className="w-5 h-5 animate-spin-slow" />
    },
    {
      label: t.achievements.stats.certificates,
      value: 12,
      suffix: '+',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      label: t.achievements.stats.speaking,
      value: 2,
      suffix: '+',
      icon: <Presentation className="w-5 h-5" />
    },
    {
      label: t.achievements.stats.events,
      value: 15,
      suffix: '+',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      label: t.achievements.stats.organizations,
      value: 3,
      suffix: '+',
      icon: <Users className="w-5 h-5" />
    },
    {
      label: t.achievements.stats.curiosity,
      value: 9999, // Represents infinite
      suffix: '∞',
      icon: <Heart className="w-5 h-5 text-red-400" />
    }
  ];

  return (
    <div className="w-full py-16" id="achievement-dashboard">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
            {t.achievements.heading}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--col-sapphire)] to-[var(--col-indigo)] mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
            {t.achievements.subheading}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statsList.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={stat.value === 9999 ? 'col-span-2 md:col-span-2' : 'col-span-1'}
            >
              <AnimatedCounter
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                icon={stat.icon}
                metricLabel={t.achievements.metricLabel}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
