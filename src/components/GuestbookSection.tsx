import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, CheckCircle2, AlertCircle, Calendar, User, MessageSquare } from 'lucide-react';
import { GuestbookEntry } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export default function GuestbookSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch entries on load
  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook');
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      } else {
        throw new Error('Gagal mengambil data guestbook.');
      }
    } catch (err) {
      console.warn("Mencoba fallback data dari localStorage...");
      const local = localStorage.getItem('moonlit_guestbook_fallback');
      if (local) {
        setEntries(JSON.parse(local));
      } else {
        // Default entries
        setEntries([
          {
            id: 'gb-1',
            name: 'Bintang Aurora',
            message: 'Website portofolio yang sangat indah! Tema Moonlit Universe-nya terasa magis sekali. Desain visualnya luar biasa.',
            rating: 5,
            date: new Date('2026-07-01T10:30:00Z').toISOString()
          },
          {
            id: 'gb-2',
            name: 'Rian Cahaya',
            message: 'Fitur Ask Sapphire sangat responsif dan membantu menjelaskan proyek-proyek Anda. Sukses terus!',
            rating: 5,
            date: new Date('2026-07-03T15:45:00Z').toISOString()
          }
        ]);
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Handle submit entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || formState === 'submitting') return;

    setFormState('submitting');
    setErrorMsg(null);

    const entryData = { name, message, rating };

    try {
      /*
        ========================================================================
        🔥 FIREBASE FIRESTORE READY IMPLEMENTATION CODE COMMENTS 🔥
        ========================================================================
        Untuk beralih ke durabilitas penuh Firebase Firestore, pasang SDK Firebase:
        `npm install firebase` atau `install_applet_package`
        
        Import dan inisialisasi di client/server:
        import { initializeApp } from "firebase/app";
        import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
        
        const firebaseConfig = {
          apiKey: process.env.VITE_FIREBASE_API_KEY,
          authDomain: "...",
          projectId: "...",
          storageBucket: "...",
          messagingSenderId: "...",
          appId: "..."
        };
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        Fungsi Submit Entry:
        export async function submitGuestbookEntry(data) {
          const docRef = await addDoc(collection(db, "guestbook"), {
            name: data.name,
            message: data.message,
            rating: data.rating,
            date: new Date().toISOString()
          });
          return docRef.id;
        }
      */

      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entryData)
      });

      if (!res.ok) {
        throw new Error('Gagal mengirimkan pesan.');
      }

      const newEntry = await res.json();
      
      // Update state
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      
      // Update local storage backup
      localStorage.setItem('moonlit_guestbook_fallback', JSON.stringify(updatedEntries));

      setFormState('success');
      setName('');
      setMessage('');
      setRating(5);

      // Back to idle after 3 seconds
      setTimeout(() => setFormState('idle'), 3000);
    } catch (err: any) {
      console.error(err);
      
      // Local fallback submit
      const localEntry: GuestbookEntry = {
        id: 'gb-local-' + Date.now(),
        name,
        message,
        rating,
        date: new Date().toISOString()
      };
      const updatedEntries = [localEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem('moonlit_guestbook_fallback', JSON.stringify(updatedEntries));

      setFormState('success');
      setName('');
      setMessage('');
      setRating(5);
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <div className="w-full py-16" id="guestbook-section">
      <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Form area: Left side (5 columns) */}
        <div className="md:col-span-5">
          <div className="glass-card p-6 rounded-3xl sticky top-24 border border-[var(--col-border)]">
            <h3 className="text-xl md:text-2xl font-bold font-display text-[var(--col-moon-lt)] mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--col-accent)]" />
              <span>{t.guestbook.heading}</span>
            </h3>
            <p className="text-xs text-[var(--col-text-dim)] font-light leading-relaxed mb-6">
              {t.guestbook.subheading}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input */}
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[var(--col-text-muted)] mb-1.5 font-bold">
                  {t.guestbook.nameLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--col-text-muted)]">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.guestbook.namePlaceholder}
                    className="w-full bg-[var(--col-bg-2)] border border-[var(--col-border)] text-sm rounded-xl pl-10 pr-4 py-2.5 text-[var(--col-text)] placeholder-[var(--col-text-muted)] focus:outline-none focus:border-[var(--col-sapphire-lt)] transition-all"
                    id="guestbook-input-name"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[var(--col-text-muted)] mb-1.5 font-bold">
                  {t.guestbook.messageLabel}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.guestbook.messagePlaceholder}
                  className="w-full bg-[var(--col-bg-2)] border border-[var(--col-border)] text-sm rounded-xl px-4 py-2.5 text-[var(--col-text)] placeholder-[var(--col-text-muted)] focus:outline-none focus:border-[var(--col-sapphire-lt)] transition-all resize-none"
                  id="guestbook-input-message"
                />
              </div>

              {/* Rating Star Selection */}
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-[var(--col-text-muted)] mb-2 font-bold">
                  {t.guestbook.ratingLabel}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = hoverRating !== null ? star <= hoverRating : star <= rating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 hover:scale-125 active:scale-95 transition-transform cursor-pointer"
                        id={`guestbook-star-btn-${star}`}
                        aria-label={`${t.guestbook.ariaRating} ${star} ${t.guestbook.starsSuffix}`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            isFilled
                              ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]'
                              : 'text-gray-600'
                          } transition-all`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-mono font-bold text-[var(--col-text-dim)] ml-2">
                    ({hoverRating || rating} / 5 {t.guestbook.starsSuffix})
                  </span>
                </div>
              </div>

              {/* Submit Action Button with Morph States */}
              <button
                type="submit"
                disabled={formState === 'submitting' || !name.trim() || !message.trim()}
                className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm shadow-md transition-all ${
                  formState === 'success'
                    ? 'bg-emerald-600 text-white border border-emerald-500 shadow-emerald-950/20'
                    : 'bg-[var(--col-sapphire)] hover:bg-[var(--col-sapphire-mid)] hover:scale-[1.02] text-white border border-[var(--col-sapphire-lt)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
                id="guestbook-submit-btn"
              >
                <AnimatePresence mode="wait">
                  {formState === 'submitting' ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>{t.guestbook.submitting}</span>
                    </motion.div>
                  ) : formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                      <span>{t.guestbook.submitted}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.guestbook.submit}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

            </form>
          </div>
        </div>

        {/* Entries list area: Right side (7 columns) */}
        <div className="md:col-span-7 flex flex-col space-y-4 max-h-[580px] overflow-y-auto pr-2">
          <div className="flex justify-between items-center mb-1 pb-2 border-b border-[var(--col-border)]">
            <h4 className="text-sm font-mono tracking-widest text-[var(--col-text-muted)] uppercase font-bold">
              {t.guestbook.signaturesLabel} ({entries.length})
            </h4>
            <span className="text-[10px] font-mono text-[var(--col-text-muted)] bg-[var(--col-surface-2)] px-2.5 py-1 rounded-full border border-[var(--col-border)]">
              {t.guestbook.latest}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {entries.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl border-dashed">
                <p className="text-sm text-[var(--col-text-muted)] font-mono">
                  {t.guestbook.emptyTitle}
                </p>
                <p className="text-xs text-[var(--col-text-muted)] mt-1 font-light">
                  {t.guestbook.emptySubtitle}
                </p>
              </div>
            ) : (
              entries.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                  className="glass-card p-5 rounded-2xl relative border border-[var(--col-border)] bg-[var(--col-surface-2)]/40 hover:bg-[var(--col-surface-2)]/60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[var(--col-sapphire-lt)]/10 text-[var(--col-sapphire-lt)] flex items-center justify-center font-mono text-xs font-bold border border-[var(--col-border)]">
                        {entry.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[var(--col-moon)] font-display tracking-wide">
                          {entry.name}
                        </h5>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < entry.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--col-text-muted)]">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(entry.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--col-text-dim)] font-light leading-relaxed pl-10">
                    {entry.message}
                  </p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
