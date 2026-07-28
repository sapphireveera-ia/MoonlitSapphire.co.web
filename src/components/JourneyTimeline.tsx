import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Code, Sparkles, Award, BookOpen, Wallet, Crown, ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { Bilingual } from '../types';

interface TimelineEvent {
  id: string;
  category: 'Creative' | 'Tech' | 'Leadership' | 'AI';
  title: Bilingual;
  subtitle: Bilingual;
  date: string;
  location: string;
  description: Bilingual;
  expandedDetails: Bilingual;
  icon: React.ReactNode;
}

export default function JourneyTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  const timelineData: TimelineEvent[] = [
    {
      id: "creative-beginning",
      category: "Creative",
      title: { en: "First Steps: Literature & Poetry", id: "Langkah Pertama: Sastra & Puisi" },
      subtitle: { en: "Finding a Storytelling Soul Through Words", id: "Menemukan Jiwa Bercerita Lewat Kata-Kata" },
      date: "2021 - 2023",
      location: "Personal Collection & Anthologies",
      description: { en: "Opened up to the world of creative writing. Began pouring imagination, restlessness, and late-night observations into lines of poetry and song lyrics.", id: "Membuka diri pada dunia penulisan kreatif. Mulai menuangkan imajinasi, kegelisahan, dan pengamatan larut malam ke dalam larik puisi dan lirik lagu." },
      expandedDetails: { en: "This period trained artistic sensitivity and the ability to shape emotion into structured form. Literature proved to be an important foundation for Safira Nur Azkia in designing digital concepts that are 'meaningful' — not just mechanically functional.", id: "Periode ini melatih kepekaan artistik dan kemampuan membentuk emosi menjadi bentuk yang terstruktur. Sastra terbukti menjadi fondasi penting bagi Safira Nur Azkia dalam merancang konsep digital yang 'bermakna' — bukan sekadar berfungsi secara mekanis." },
      icon: <PenTool className="w-5 h-5" />
    },
    {
      id: "miss-school",
      category: "Leadership",
      title: { en: "School Pageant Titleholder", id: "Pemegang Gelar Ratu Sekolah" },
      subtitle: { en: "Representing Grace, Confidence & School Spirit", id: "Mewakili Keanggunan, Kepercayaan Diri & Semangat Sekolah" },
      date: "2021 - 2022",
      location: "SMA IT Darul Kholidin",
      description: { en: "Held the school's 'Miss' title for two consecutive periods — a small-scale, school-level pageant that celebrated confidence, public presence, and character.", id: "Memegang gelar 'Miss' sekolah selama dua periode berturut-turut — sebuah ajang tingkat sekolah berskala kecil yang merayakan kepercayaan diri, kehadiran di depan publik, dan karakter." },
      expandedDetails: { en: "Beyond the crown, this experience became an early lesson in public speaking, self-presentation, and carrying responsibility as a school representative — soft skills that later carried over into more technical and organizational roles.", id: "Di luar mahkota, pengalaman ini menjadi pelajaran awal dalam public speaking, presentasi diri, dan mengemban tanggung jawab sebagai perwakilan sekolah — soft skill yang kemudian terbawa ke peran-peran teknis dan organisasi berikutnya." },
      icon: <Crown className="w-5 h-5" />
    },
    {
      id: "ngaji-tahfiz-mentor",
      category: "Leadership",
      title: { en: "Qur'an & Tahfiz Mentor", id: "Mentor Mengaji & Tahfiz" },
      subtitle: { en: "Guiding Junior Students in Recitation & Memorization", id: "Membimbing Adik Kelas dalam Tilawah & Hafalan" },
      date: "2023",
      location: "SMA IT Darul Kholidin",
      description: { en: "Served as a mentor teaching Qur'an recitation and memorization to first-year junior high school students.", id: "Menjadi mentor yang mengajarkan tilawah dan hafalan Al-Qur'an kepada siswa kelas satu SMP." },
      expandedDetails: { en: "Rooted in her boarding school background, this role sharpened patience, teaching ability, and a sense of responsibility toward guiding younger students — values that continue to shape how Safira Nur Azkia facilitates workshops today.", id: "Berakar dari latar belakang pesantrennya, peran ini mengasah kesabaran, kemampuan mengajar, dan rasa tanggung jawab dalam membimbing adik kelas — nilai-nilai yang terus membentuk cara Safira Nur Azkia memfasilitasi workshop hingga kini." },
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: "osis-treasurer",
      category: "Leadership",
      title: { en: "Treasurer of OSIS", id: "Bendahara OSIS" },
      subtitle: { en: "Managing Finances for the Student Council", id: "Mengelola Keuangan Organisasi Siswa" },
      date: "2023 - 2024",
      location: "High School Student Council (OSIS)",
      description: { en: "Trusted as the treasurer of OSIS, responsible for managing the student council's budget, financial reports, and event funding.", id: "Dipercaya sebagai bendahara OSIS, bertanggung jawab mengelola anggaran, laporan keuangan, dan pendanaan acara organisasi siswa." },
      expandedDetails: { en: "This role built a foundation in organizational responsibility, accountability, and structured planning — skills that later translated well into coordinating logistics for tech workshops and campus events.", id: "Peran ini membangun fondasi tanggung jawab organisasi, akuntabilitas, dan perencanaan yang terstruktur — kemampuan yang kemudian sangat berguna dalam mengoordinasikan logistik workshop teknologi dan acara kampus." },
      icon: <Wallet className="w-5 h-5" />
    },
    {
      id: "informatics-coding",
      category: "Tech",
      title: { en: "Entering Informatics & Coding", id: "Memasuki Dunia Informatika & Coding" },
      subtitle: { en: "Translating Aesthetics into Lines of Code", id: "Menerjemahkan Estetika ke dalam Baris Kode" },
      date: "2024",
      location: "STT Terpadu Nurul Fikri",
      description: { en: "Started college as an Informatics student, and with it, began learning to code from the ground up — HTML, CSS, JavaScript, and core programming logic.", id: "Memulai kuliah sebagai mahasiswa Informatika, dan bersamaan dengan itu, mulai belajar coding dari dasar — HTML, CSS, JavaScript, dan logika pemrograman inti." },
      expandedDetails: { en: "This was the turning point where writing turned into building. College became the gateway into programming, and Safira Nur Azkia discovered that code could be just as expressive a medium as poetry — the beginning of merging calming visual design (night/moon vibes) with real functionality.", id: "Ini adalah titik balik di mana menulis berubah menjadi membangun. Kuliah menjadi gerbang menuju pemrograman, dan Safira Nur Azkia menemukan bahwa kode bisa menjadi medium yang sama ekspresifnya dengan puisi — awal dari perpaduan desain visual yang menenangkan (nuansa malam/bulan) dengan fungsionalitas nyata." },
      icon: <Code className="w-5 h-5" />
    },
    {
      id: "leadership-forum",
      category: "Leadership",
      title: { en: "Active in Forums & Organizations", id: "Aktif di Forum & Organisasi" },
      subtitle: { en: "Voicing Creative Ideas as Secretary", id: "Menyuarakan Gagasan Kreatif sebagai Sekretaris" },
      date: "2024 - 2025",
      location: "Regional Forums & Conferences",
      description: { en: "Joined the secretariat team of a youth organization, participated in green technology conferences, and a global digital youth conference.", id: "Bergabung dengan tim kesekretariatan organisasi pemuda, berpartisipasi dalam konferensi teknologi hijau, dan konferensi pemuda digital global." },
      expandedDetails: { en: "Held an important role in committee administration, engaging in prestigious forums such as the 'FPCI-GRIPS Virtual Public Forum' and 'Regional Forum 2025'. Developed leadership soft skills, public communication, and collaborative teamwork.", id: "Memegang peran penting dalam administrasi kepanitiaan, terlibat dalam forum-forum bergengsi seperti 'FPCI-GRIPS Virtual Public Forum' dan 'Regional Forum 2025'. Mengembangkan soft skill kepemimpinan, komunikasi publik, dan kerja sama tim." },
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: "google-student-ambassador",
      category: "AI",
      title: { en: "Google Student Ambassador", id: "Google Student Ambassador" },
      subtitle: { en: "Deepening Expertise in Google Technologies", id: "Memperdalam Keahlian pada Teknologi Google" },
      date: "2026 - Present",
      location: "Campus & Community",
      description: { en: "Became a Google Student Ambassador, taking on the role of organizing and facilitating workshops and events, while going deeper into Google's technology ecosystem.", id: "Menjadi Google Student Ambassador, mengemban peran mengorganisasi dan memfasilitasi workshop serta acara, sekaligus mendalami ekosistem teknologi Google." },
      expandedDetails: { en: "This role marks the convergence of Safira Nur Azkia's technical, creative, and leadership journey: designing hands-on workshops, building AI-powered apps like the 'AI Study Buddy', and helping fellow students explore the practical side of Google's AI tools.", id: "Peran ini menandai titik temu perjalanan teknis, kreatif, dan kepemimpinan Safira Nur Azkia: merancang workshop praktik langsung, membangun aplikasi berbasis AI seperti 'AI Study Buddy', dan membantu sesama mahasiswa menjelajahi sisi praktis dari tools AI milik Google." },
      icon: <Award className="w-5 h-5 animate-pulse" />
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Creative': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'Tech': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'AI': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Leadership': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full py-16" id="journey-timeline">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
            {t.journey.heading}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--col-sapphire)] to-[var(--col-indigo)] mx-auto rounded-full mb-4" />
          <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
            {t.journey.subheading}
          </p>
        </div>

        {/* Timeline Line Container */}
        <div className="relative border-l-2 border-[var(--col-border)] ml-4 md:ml-32 pl-6 md:pl-10 space-y-12">
          
          {timelineData.map((event, index) => {
            const isExpanded = expandedId === event.id;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Glowing Node Point */}
                <div 
                  onClick={() => toggleExpand(event.id)}
                  className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border border-[var(--col-border)] bg-[var(--col-bg-2)] flex items-center justify-center cursor-pointer hover:border-[var(--col-sapphire-lt)] hover:scale-110 active:scale-95 shadow-md hover:shadow-[var(--col-glow)] transition-all z-10 text-[var(--col-accent)]"
                >
                  {event.icon}
                </div>

                {/* Left Side Date Label (hidden on mobile, visible on desktop) */}
                <div className="absolute hidden md:block -left-[140px] top-2 w-[100px] text-right font-mono text-xs text-[var(--col-text-muted)] font-semibold">
                  {event.date}
                </div>

                {/* Card Container */}
                <div className="glass-card p-6 rounded-2xl relative transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
                      {t.journey.categories[event.category]}
                    </span>
                    <span className="flex items-center gap-1 md:hidden font-mono text-xs text-[var(--col-text-muted)] font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-[var(--col-moon)] font-display leading-snug mb-1">
                    {event.title[language]}
                  </h3>
                  
                  <h4 className="text-xs md:text-sm text-[var(--col-sapphire-lt)] font-medium mb-3">
                    {event.subtitle[language]}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--col-text-muted)] mb-4 font-mono">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--col-text-dim)] font-light leading-relaxed">
                    {event.description[language]}
                  </p>

                  {/* Collapsable expandable panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[var(--col-border)] text-xs text-[var(--col-text-dim)] leading-relaxed italic bg-[var(--col-surface-2)] p-4 rounded-xl border border-dashed">
                          {event.expandedDetails[language]}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interactive toggle button */}
                  <button
                    onClick={() => toggleExpand(event.id)}
                    className="flex items-center gap-1 mt-4 text-xs font-semibold text-[var(--col-accent)] hover:text-[var(--col-sapphire-lt)] transition-colors"
                  >
                    <span>{isExpanded ? t.journey.closeDetails : t.journey.readMore}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
