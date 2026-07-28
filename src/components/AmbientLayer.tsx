import React, { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '../types';

interface AmbientLayerProps {
  currentTheme: ThemeMode;
}

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
  angle: number;
}

interface Cloud {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  dir: number;
  blur: number;
  color: string; // "rgba(r,g,b," format so we can append opacity
}

export default function AmbientLayer({ currentTheme }: AmbientLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resolvedTheme, setResolvedTheme] = useState<'morning' | 'sunset' | 'night'>('night');

  // Resolve the actual theme mode (especially when auto is selected)
  useEffect(() => {
    const resolveActiveTheme = () => {
      let active: 'morning' | 'sunset' | 'night' = 'night';
      if (currentTheme === 'auto') {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 16) {
          active = 'morning';
        } else if (hour >= 16 && hour < 19) {
          active = 'sunset';
        } else {
          active = 'night';
        }
      } else {
        // Fallback or explicit mapping
        if (currentTheme === 'morning') active = 'morning';
        else if (currentTheme === 'sunset') active = 'sunset';
        else active = 'night';
      }
      setResolvedTheme(active);
    };

    resolveActiveTheme();
    const interval = setInterval(resolveActiveTheme, 30000); // Re-resolve every 30 seconds
    return () => clearInterval(interval);
  }, [currentTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let morningClouds: Cloud[] = [];
    let sunsetClouds: Cloud[] = [];

    // Transition opacities for crossfading
    let alphaNight = resolvedTheme === 'night' ? 1 : 0;
    let alphaMorning = resolvedTheme === 'morning' ? 1 : 0;
    let alphaSunset = resolvedTheme === 'sunset' ? 1 : 0;

    const targetAlphaNight = () => (resolvedTheme === 'night' ? 1 : 0);
    const targetAlphaMorning = () => (resolvedTheme === 'morning' ? 1 : 0);
    const targetAlphaSunset = () => (resolvedTheme === 'sunset' ? 1 : 0);

    // Prefer static display if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Stars
    const initStars = (width: number, height: number) => {
      stars = [];
      const count = Math.floor((width * height) / 9000); // Dense but fine
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.5, // 0.5px to 1.7px fine stars
          alpha: Math.random() * 0.5 + 0.3, // Opacity 0.3 to 0.8
          speed: prefersReducedMotion ? 0 : Math.random() * 0.015 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Initialize Clouds
    const initClouds = (width: number, height: number) => {
      // 5 Morning Clouds (White/Cyan-blue pastel soft)
      morningClouds = [
        {
          x: Math.random() * width,
          y: height * 0.15,
          r: 120 + Math.random() * 60,
          speed: prefersReducedMotion ? 0 : 0.08 + Math.random() * 0.06,
          opacity: 0.22,
          dir: 1, // left to right
          blur: 65,
          color: 'rgba(224, 242, 254, ', // light sky-100
        },
        {
          x: Math.random() * width,
          y: height * 0.45,
          r: 150 + Math.random() * 80,
          speed: prefersReducedMotion ? 0 : 0.05 + Math.random() * 0.05,
          opacity: 0.18,
          dir: -1, // right to left
          blur: 80,
          color: 'rgba(255, 255, 255, ', // plain white
        },
        {
          x: Math.random() * width,
          y: height * 0.7,
          r: 130 + Math.random() * 50,
          speed: prefersReducedMotion ? 0 : 0.07 + Math.random() * 0.05,
          opacity: 0.2,
          dir: 1,
          blur: 70,
          color: 'rgba(224, 231, 255, ', // indigo-50
        },
        {
          x: Math.random() * width,
          y: height * 0.3,
          r: 110 + Math.random() * 40,
          speed: prefersReducedMotion ? 0 : 0.04 + Math.random() * 0.04,
          opacity: 0.15,
          dir: -1,
          blur: 60,
          color: 'rgba(240, 249, 255, ', // sky-50
        },
        {
          x: Math.random() * width,
          y: height * 0.85,
          r: 160 + Math.random() * 70,
          speed: prefersReducedMotion ? 0 : 0.06 + Math.random() * 0.06,
          opacity: 0.16,
          dir: 1,
          blur: 90,
          color: 'rgba(255, 255, 255, ',
        }
      ];

      // 5 Sunset Clouds (Rich magenta, warm gold, lavender pastel)
      sunsetClouds = [
        {
          x: Math.random() * width,
          y: height * 0.2,
          r: 130 + Math.random() * 60,
          speed: prefersReducedMotion ? 0 : 0.05 + Math.random() * 0.05,
          opacity: 0.24,
          dir: 1,
          blur: 75,
          color: 'rgba(244, 114, 182, ', // pink-400
        },
        {
          x: Math.random() * width,
          y: height * 0.5,
          r: 160 + Math.random() * 80,
          speed: prefersReducedMotion ? 0 : 0.04 + Math.random() * 0.04,
          opacity: 0.16,
          dir: -1,
          blur: 90,
          color: 'rgba(192, 132, 252, ', // purple-400
        },
        {
          x: Math.random() * width,
          y: height * 0.75,
          r: 140 + Math.random() * 50,
          speed: prefersReducedMotion ? 0 : 0.06 + Math.random() * 0.04,
          opacity: 0.22,
          dir: 1,
          blur: 80,
          color: 'rgba(251, 146, 60, ', // orange-400
        },
        {
          x: Math.random() * width,
          y: height * 0.35,
          r: 110 + Math.random() * 40,
          speed: prefersReducedMotion ? 0 : 0.03 + Math.random() * 0.04,
          opacity: 0.15,
          dir: -1,
          blur: 65,
          color: 'rgba(244, 63, 94, ', // rose-500
        },
        {
          x: Math.random() * width,
          y: height * 0.9,
          r: 170 + Math.random() * 60,
          speed: prefersReducedMotion ? 0 : 0.05 + Math.random() * 0.05,
          opacity: 0.18,
          dir: 1,
          blur: 100,
          color: 'rgba(216, 180, 254, ', // purple-300
        }
      ];
    };

    const spawnMeteor = (width: number) => {
      meteors.push({
        x: Math.random() * width * 1.1 - width * 0.1,
        y: -20,
        length: Math.random() * 60 + 35,
        speed: prefersReducedMotion ? 0 : Math.random() * 10 + 5,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() * 0.08 - 0.04), // ~45 deg
      });
    };

    // Keep track of canvas size
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initStars(w, h);
      initClouds(w, h);
    };

    // Listen for custom single meteor triggers (e.g. from Click Easter Egg in Hero)
    const handleSingleMeteor = (e: Event) => {
      if (prefersReducedMotion) return;
      const customEvent = e as CustomEvent;
      const w = customEvent.detail?.w || canvas.width;
      spawnMeteor(w);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('trigger-single-meteor', handleSingleMeteor);

    // Initial trigger
    handleResize();

    // Main animation loop
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Update transition opacities (Crossfade)
      // Transition rate: 0.02 (~50 frames or ~0.8 seconds for full crossfade)
      const fadeSpeed = 0.02;

      const targetNight = targetAlphaNight();
      const targetMorning = targetAlphaMorning();
      const targetSunset = targetAlphaSunset();

      if (alphaNight < targetNight) alphaNight = Math.min(targetNight, alphaNight + fadeSpeed);
      else if (alphaNight > targetNight) alphaNight = Math.max(targetNight, alphaNight - fadeSpeed);

      if (alphaMorning < targetMorning) alphaMorning = Math.min(targetMorning, alphaMorning + fadeSpeed);
      else if (alphaMorning > targetMorning) alphaMorning = Math.max(targetMorning, alphaMorning - fadeSpeed);

      if (alphaSunset < targetSunset) alphaSunset = Math.min(targetSunset, alphaSunset + fadeSpeed);
      else if (alphaSunset > targetSunset) alphaSunset = Math.max(targetSunset, alphaSunset - fadeSpeed);

      // 2. Draw Night Starfield Layer (if visible)
      if (alphaNight > 0.001) {
        // Render Starfield
        stars.forEach((star) => {
          if (!prefersReducedMotion) {
            star.phase += star.speed;
          }
          const twinkle = Math.sin(star.phase) * 0.25;
          const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + twinkle)) * alphaNight;
          
          ctx.fillStyle = `rgba(232, 240, 252, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Faint constellation web
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.03 * alphaNight})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < stars.length; i += 12) {
          for (let j = i + 12; j < i + 36; j += 12) {
            if (stars[j]) {
              const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
              if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
              }
            }
          }
        }

        // Handle Meteors / Shooting Stars
        meteors.forEach((m, index) => {
          if (!prefersReducedMotion) {
            m.x += Math.cos(m.angle) * m.speed;
            m.y += Math.sin(m.angle) * m.speed;
            m.alpha -= 0.016;
          } else {
            m.alpha = 0; // Don't show moving meteors when motion is reduced
          }

          if (m.alpha <= 0 || m.x > w || m.y > h) {
            meteors.splice(index, 1);
            return;
          }

          ctx.strokeStyle = `rgba(224, 231, 255, ${m.alpha * alphaNight})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
          ctx.stroke();
        });

        // Periodically spawn random shooting stars if night is active
        if (!prefersReducedMotion && Math.random() < 0.005 && meteors.length < 3 && resolvedTheme === 'night') {
          spawnMeteor(w);
        }
      }

      // 3. Draw Morning Cloud Layer (if visible)
      if (alphaMorning > 0.001) {
        morningClouds.forEach((cloud) => {
          if (!prefersReducedMotion) {
            cloud.x += cloud.speed * cloud.dir;
            // Wrap clouds around screen boundaries
            if (cloud.dir === 1 && cloud.x - cloud.r * 2.2 > w) {
              cloud.x = -cloud.r * 2.2;
            } else if (cloud.dir === -1 && cloud.x + cloud.r * 2.2 < 0) {
              cloud.x = w + cloud.r * 2.2;
            }
          }

          ctx.save();
          ctx.filter = `blur(${cloud.blur}px)`;
          ctx.fillStyle = `${cloud.color}${cloud.opacity * alphaMorning})`;
          ctx.beginPath();
          ctx.ellipse(cloud.x, cloud.y, cloud.r * 2.2, cloud.r * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // 4. Draw Sunset Cloud & Sun Glow Layer (if visible)
      if (alphaSunset > 0.001) {
        // Draw static Golden Sunset Sun Glow
        const sunX = w * 0.75;
        const sunY = h * 0.8;
        const sunRadius = Math.min(320, w * 0.35);

        ctx.save();
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, sunRadius);
        sunGrad.addColorStop(0, `rgba(253, 186, 116, ${0.35 * alphaSunset})`); // amber-300 warmth
        sunGrad.addColorStop(0.3, `rgba(244, 63, 94, ${0.15 * alphaSunset})`); // rose-500 tint
        sunGrad.addColorStop(1, 'rgba(20, 8, 21, 0)');
        
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw sunset clouds
        sunsetClouds.forEach((cloud) => {
          if (!prefersReducedMotion) {
            cloud.x += cloud.speed * cloud.dir;
            // Wrap clouds around screen boundaries
            if (cloud.dir === 1 && cloud.x - cloud.r * 2.4 > w) {
              cloud.x = -cloud.r * 2.4;
            } else if (cloud.dir === -1 && cloud.x + cloud.r * 2.4 < 0) {
              cloud.x = w + cloud.r * 2.4;
            }
          }

          ctx.save();
          ctx.filter = `blur(${cloud.blur}px)`;
          ctx.fillStyle = `${cloud.color}${cloud.opacity * alphaSunset})`;
          ctx.beginPath();
          ctx.ellipse(cloud.x, cloud.y, cloud.r * 2.4, cloud.r * 0.9, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('trigger-single-meteor', handleSingleMeteor);
      cancelAnimationFrame(animationId);
    };
  }, [resolvedTheme]);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-[1] overflow-hidden"
      id="ambient-background-layer"
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        id="ambient-canvas"
      />
    </div>
  );
}
