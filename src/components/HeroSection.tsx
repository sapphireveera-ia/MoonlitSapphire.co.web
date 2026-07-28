import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Award, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  triggerSecretShower: boolean;
  onSecretShowerTriggered: () => void;
  currentTheme?: string;
}

export default function HeroSection({ onNavigate, triggerSecretShower, onSecretShowerTriggered, currentTheme }: HeroSectionProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriting state
  const roles = t.hero.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll position for parallax
  const [scrollY, setScrollY] = useState(0);

  // Mouse coordinate tracker
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Monitor scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect with natural typing pauses & speed changes
  useEffect(() => {
    let timer: any;

    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (!isDeleting) {
        const nextText = fullText.substring(0, displayText.length + 1);
        setDisplayText(nextText);

        // Organic typing speed with slight character delay variation
        let delay = 60 + Math.random() * 70;

        // Natural pause at spaces or punctuation
        const lastChar = nextText[nextText.length - 1];
        if (lastChar === ' ' || lastChar === '·') {
          delay += 120;
        }

        if (nextText === fullText) {
          // Pause at complete phrase before backspacing
          timer = setTimeout(() => setIsDeleting(true), 2500);
        } else {
          timer = setTimeout(handleTyping, delay);
        }
      } else {
        const nextText = fullText.substring(0, displayText.length - 1);
        setDisplayText(nextText);

        // Deleting characters is faster
        let delay = 30 + Math.random() * 20;

        if (nextText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(handleTyping, 450); // Pause before starting next role
        } else {
          timer = setTimeout(handleTyping, delay);
        }
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 30 : 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  // Starfield, floating particles, and mouse follow glow logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; size: number; speedY: number; speedX: number; alpha: number; angle: number; angleSpeed: number }[] = [];
    let meteors: { x: number; y: number; length: number; speed: number; alpha: number; angle: number }[] = [];

    // Track mouse coordinates relative to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    // Responsive Canvas resizing
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        initParticles(width, height);
      }
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const count = 45; // 40-60 floating particles
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speedY: -(Math.random() * 0.4 + 0.15), // rise upwards slowly
          speedX: Math.random() * 0.2 - 0.1,
          alpha: Math.random() * 0.5 + 0.15,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: Math.random() * 0.02 - 0.01
        });
      }
    };

    const spawnMeteor = (width: number) => {
      meteors.push({
        x: Math.random() * width * 0.7,
        y: -10,
        length: Math.random() * 70 + 40,
        speed: Math.random() * 10 + 6,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() * 0.1 - 0.05) // diagonal trajectory
      });
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const initialWidth = containerRef.current?.clientWidth || window.innerWidth;
    const initialHeight = containerRef.current?.clientHeight || 650;
    canvas.width = initialWidth;
    canvas.height = initialHeight;
    initParticles(initialWidth, initialHeight);

    // Default centered mouse positions
    mouseRef.current.x = initialWidth / 2;
    mouseRef.current.y = initialHeight / 2;
    mouseRef.current.targetX = initialWidth / 2;
    mouseRef.current.targetY = initialHeight / 2;

    window.addEventListener('mousemove', handleMouseMove);

    // Initial shooting star timer setup (8-20s interval)
    let nextMeteorSpawn = Date.now() + (8000 + Math.random() * 12000);

    // Animation Render Loop
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const resolvedTheme = currentTheme || 'night';

      // 1. Mouse coordinates smooth interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // 2. Render Mouse-Follow Radial Glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const glowRad = 260;

      const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, glowRad);
      let glowColor = 'rgba(56, 189, 248, 0.07)'; // Night theme sapphire-blue glow
      if (resolvedTheme === 'sunset') {
        glowColor = 'rgba(236, 72, 153, 0.06)'; // Sunset warm pink/rose glow
      } else if (resolvedTheme === 'morning') {
        glowColor = 'rgba(37, 99, 235, 0.03)'; // Morning cool pale-blue glow
      }

      glowGrad.addColorStop(0, glowColor);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(mx, my, glowRad, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Floating Light Particles (Moon Dust)
      particles.forEach((p) => {
        p.y += p.speedY;
        p.angle += p.angleSpeed;
        p.x += p.speedX + Math.sin(p.angle) * 0.15;

        // Reset particle on top exit
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.fillStyle = resolvedTheme === 'morning'
          ? `rgba(37, 99, 235, ${p.alpha * 0.5})`
          : `rgba(232, 240, 252, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Render Shooting Stars (Only in Moonlit Night theme)
      if (resolvedTheme === 'night') {
        meteors.forEach((m, idx) => {
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.015;

          if (m.alpha <= 0 || m.x > w || m.y > h) {
            meteors.splice(idx, 1);
            return;
          }

          const grad = ctx.createLinearGradient(
            m.x, m.y,
            m.x - Math.cos(m.angle) * m.length,
            m.y - Math.sin(m.angle) * m.length
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
          grad.addColorStop(0.5, `rgba(186, 230, 253, ${m.alpha * 0.6})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
          ctx.stroke();
        });

        // Spawn a meteor periodically
        if (Date.now() > nextMeteorSpawn) {
          spawnMeteor(w);
          nextMeteorSpawn = Date.now() + (8000 + Math.random() * 12000);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [currentTheme]);

  // Listen for Easter egg meteor shower triggers
  useEffect(() => {
    if (triggerSecretShower) {
      const playShower = () => {
        const w = canvasRef.current?.width || window.innerWidth;
        // Broadcast custom events or local spawn burst
        for (let i = 0; i < 25; i++) {
          setTimeout(() => {
            const event = new CustomEvent('trigger-single-meteor', { detail: { w } });
            window.dispatchEvent(event);
          }, i * 120);
        }
      };
      playShower();
      onSecretShowerTriggered();
    }
  }, [triggerSecretShower]);

  const resolvedTheme = currentTheme || 'night';

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[92vh] flex items-center justify-center py-20 px-4 md:px-8 aurora-bg select-none overflow-hidden"
      id="hero-section"
    >
      {/* Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        aria-hidden="true"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />

      {/* Moving Organic Aurora Light Layers (Theme Adaptive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-12 left-[-10%] w-[65%] h-[65%] rounded-full blur-[130px] opacity-30 mix-blend-screen transition-all duration-1000 animate-[aurorasway_16s_ease-in-out_infinite]"
          style={{
            background: resolvedTheme === 'night'
              ? 'radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 70%)'
              : resolvedTheme === 'sunset'
                ? 'radial-gradient(circle, rgba(190,24,93,0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(125,211,252,0.3) 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.12}px)`
          }}
        />
        <div
          className="absolute bottom-12 right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-25 mix-blend-screen transition-all duration-1000 animate-[aurorasway_22s_ease-in-out_infinite_reverse]"
          style={{
            background: resolvedTheme === 'night'
              ? 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 75%)'
              : resolvedTheme === 'sunset'
                ? 'radial-gradient(circle, rgba(217,119,6,0.2) 0%, transparent 75%)'
                : 'radial-gradient(circle, rgba(191,219,254,0.25) 0%, transparent 75%)',
            transform: `translateY(${scrollY * 0.08}px)`
          }}
        />
        <div
          className="absolute top-[35%] left-[25%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-15 mix-blend-screen transition-all duration-1000 animate-[aurorasway_28s_ease-in-out_infinite]"
          style={{
            background: resolvedTheme === 'night'
              ? 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)'
              : resolvedTheme === 'sunset'
                ? 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 65%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 65%)',
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10 w-full">

        {/* Texts Column: Left Panel */}
        <motion.div
          className="md:col-span-7 flex flex-col items-start text-left order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        >
          {/* Badge Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--col-border)] bg-[var(--col-surface-2)] text-[var(--col-accent)] text-xs font-semibold tracking-wider uppercase mb-5 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{t.hero.badge}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-light text-[var(--col-text-dim)] tracking-wide mb-1">
            {t.hero.helloPrefix}
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-[var(--col-moon-lt)] text-glow font-display leading-tight">
            Safira Nur Azkia <span className="text-[var(--col-sapphire-lt)]">☾</span>
          </h1>

          {/* Typing Role Container with realistic pulse cursor */}
          <div className="h-8 md:h-10 mb-6 flex items-center">
            <span className="text-lg md:text-2xl text-[var(--col-text-dim)] font-medium font-mono border-r-2 border-[var(--col-sapphire-lt)] pr-1 animate-pulse whitespace-nowrap">
              {displayText}
            </span>
          </div>

          <p className="text-base md:text-lg text-[var(--col-text-dim)] font-light leading-relaxed mb-8 max-w-lg">
            {t.hero.description}
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('projects')}
              className="btn-premium relative overflow-hidden group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white bg-[var(--col-sapphire)] border border-[var(--col-sapphire-lt)] shadow-lg hover:scale-105 transition-all text-sm w-full sm:w-auto hover:shadow-[0_0_20px_var(--col-glow)]"
              id="hero-btn-projects"
            >
              {/* Shimmer light effect layer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              <span>{t.hero.viewProjects}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="relative overflow-hidden group flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[var(--col-text)] bg-transparent border border-[var(--col-border)] hover:bg-[var(--col-surface-2)] hover:border-[var(--col-sapphire-lt)] hover:scale-105 transition-all text-sm w-full sm:w-auto"
              id="hero-btn-contact"
            >
              <span>{t.hero.contactMe}</span>
            </button>

            {/* Premium CV Download Action */}
            <a
              href="/assets/safira_cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[var(--col-text-muted)] hover:text-[var(--col-moon-lt)] hover:underline transition-all group w-full sm:w-auto text-center"
              id="hero-btn-cv"
            >
              <i className="fa-solid fa-file-arrow-down opacity-70 group-hover:scale-115 transition-transform" />
              <span>{t.hero.downloadCV}</span>
            </a>
          </div>
        </motion.div>

        {/* Profile Orbital: Right Panel */}
        <motion.div
          className="md:col-span-5 flex justify-center items-center order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{ transform: `translateY(${scrollY * -0.04}px)` }}
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 float-element flex items-center justify-center">
            {/* Elegant Outer Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--col-sapphire-lt)] opacity-30 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute inset-2 rounded-full border border-[var(--col-border)] opacity-40 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[var(--col-sapphire)]/20 to-[var(--col-indigo)]/10 blur-md pointer-events-none" />

            {/* Main Picture Frame */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-1.5 bg-gradient-to-tr from-[var(--col-sapphire)] via-[var(--col-accent)] to-[var(--col-indigo)] shadow-2xl overflow-hidden group">
              <div className="w-full h-full rounded-full bg-[var(--col-bg-2)] overflow-hidden relative flex items-center justify-center border-2 border-[var(--col-bg)]">
                {/* Embedded dynamic illustration/placeholder avatar */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />

                {/* SVG Artistic representation of Safira Nur Azkia (Moonlit wanderer with crescent moon) */}
                {/* Foto profil asli Safira */}
                <img
                  src="/assets/images/profile/profile1.jpeg"
                  alt="Safira Nur Azkia"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-4 left-0 right-0 text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--col-moon)] uppercase bg-black/60 px-2 py-1 rounded-full border border-[var(--col-border)]">
                    {t.hero.moonlitWanderer}
                  </span>
                </div>
              </div>
            </div>

            {/* Tiny Floating Badges around the Profile Orbital */}
            <div className="absolute top-4 right-4 bg-[var(--col-surface)] border border-[var(--col-border)] p-2 rounded-full text-[var(--col-accent)] shadow-lg hover:scale-110 transition-transform">
              <Award className="w-4 h-4 icon-glow" />
            </div>
            <div className="absolute bottom-4 left-2 bg-[var(--col-surface)] border border-[var(--col-border)] p-2 rounded-full text-[var(--col-accent-warm)] shadow-lg hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-pulse pointer-events-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--col-text-muted)]">
          {t.hero.scrollDown}
        </span>
        <ChevronDown className="w-4 h-4 text-[var(--col-text-dim)] animate-bounce" />
      </div>
    </div>
  );
}
