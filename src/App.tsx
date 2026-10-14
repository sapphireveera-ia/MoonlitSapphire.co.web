import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Moon, Sun, Compass, Sparkles, BookOpen, Layers, Award, Image, Mail, Phone,
  MapPin, Heart, ArrowUpRight, Search, Play, Volume2, Eye, Calendar, Menu, X, CheckSquare, MessageSquare, Code2
} from 'lucide-react';
import { Project, Poetry, Song, Certificate, Memory, ThemeMode } from './types';
import { useLanguage } from './i18n/LanguageContext';
import { translations } from './i18n/translations';
import LanguageToggle from './components/LanguageToggle';
import FloatingSkills from './components/FloatingSkills';

// Importing custom components
import ThemeSelector from './components/ThemeSelector';
import HeroSection from './components/HeroSection';
import AchievementDashboard from './components/AchievementDashboard';
import JourneyTimeline from './components/JourneyTimeline';
import GuestbookSection from './components/GuestbookSection';
import CaseStudyModal from './components/CaseStudyModal';
import AudioPlayer from './components/AudioPlayer';
import AmbientLayer from './components/AmbientLayer';

export default function App() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('night');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom Cursor trailing variables
  const cursorRef = useRef<HTMLDivElement>(null);

  // Projects states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');

  // Poetry states
  const [selectedPoem, setSelectedPoem] = useState<Poetry | null>(null);
  const [inkAnimationActive, setInkAnimationActive] = useState(false);

  // Songs states
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // Certificates states
  const [certSearch, setCertSearch] = useState('');
  const [certCategory, setCertCategory] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Memories states
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Secret meteor shower tracker (Easter Egg)
  const [moonClicks, setMoonClicks] = useState(0);
  const [triggerShower, setTriggerShower] = useState(false);

  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState('');

  // Easter Egg: DevTools CSS ASCII Art message
  useEffect(() => {
    console.clear();
    console.log(
      "%c☾ MoonlitSapphire 2.0 %c\nWelcome to this universe's secret console!\n\"Still growing under the same moon.\"",
      "color: #3b6be0; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(100,150,220,0.5);",
      "color: #a8b8d0; font-size: 13px;"
    );
  }, []);

  // Sync cursor trailing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle clicking navbar moon for Easter Egg
  const handleMoonClick = () => {
    setMoonClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setTriggerShower(true);
        // Display notification
        console.log("%c✨ METEOR SHOWER TRIGGERED! ✨ Look at the sky!", "color: #e8f0fc; font-weight: bold; background: #2a4fa8; padding: 4px 8px; border-radius: 4px;");
        return 0;
      }
      return next;
    });
  };

  // Static Data lists
  const projectsData: Project[] = [
    {
      id: "invitation-gen",
      title: "AI Invitation Generator",
      description: {
        en: "An AI-powered web application that simplifies and automatically designs digital invitation drafts based on user preference input.",
        id: "Aplikasi web berbasis AI yang menyederhanakan dan secara otomatis merancang draf undangan digital berdasarkan preferensi pengguna."
      },
      tags: ["Python", "Flask", "SQLite", "HTML & CSS", "AI Tools"],
      demoUrl: "https://youtube.com", // Placeholder
      githubUrl: "https://github.com/safiranurazkia/ai-invitation-generator",
      pitchDeckUrl: "/assets/pitchdeck/ai-invitation-deck.pdf",
      isFeatured: true,
      caseStudy: {
        overview: {
          en: "AI Invitation Generator aims to solve the complexity of designing invitation wording and visuals by harnessing artificial intelligence. Users simply enter event details (wedding, birthday, gathering), the desired mood, and the target guests, and the AI drafts a poetic invitation and arranges it into a responsive web layout.",
          id: "AI Invitation Generator bertujuan menyelesaikan kerumitan merancang kata-kata dan visual undangan dengan memanfaatkan kecerdasan buatan. Pengguna cukup memasukkan detail acara (pernikahan, ulang tahun, kumpul-kumpul), suasana yang diinginkan, dan target tamu, lalu AI menyusun undangan yang puitis dan menatanya ke dalam tampilan web yang responsif."
        },
        problem: {
          en: "Drafting invitation wording that is polite, well-structured, and poetic all at once takes considerable time. Templates available on the market also often feel rigid and repetitive.",
          id: "Menyusun kata-kata undangan yang sopan, terstruktur rapi, sekaligus puitis membutuhkan waktu yang tidak sedikit. Template yang tersedia di pasaran pun sering terasa kaku dan monoton."
        },
        solution: {
          en: "Built a dynamic generator integrated with a large language model API on a Flask backend that composes custom invitation text, stores it in an SQLite database, and displays it in a ready-to-use aesthetic visual.",
          id: "Membangun generator dinamis yang terintegrasi dengan API large language model pada backend Flask, yang menyusun teks undangan kustom, menyimpannya di basis data SQLite, dan menampilkannya dalam visual estetis yang siap pakai."
        },
        architecture: {
          en: ["User enters data on the Front-end (HTML/Tailwind).", "Flask Backend processes the data and securely calls the AI generator API.", "The AI's response is filtered, stored in SQLite, and served back to the user.", "A template renderer assembles the aesthetic static invitation page."],
          id: ["Pengguna memasukkan data di Front-end (HTML/Tailwind).", "Flask Backend memproses data dan memanggil API generator AI secara aman.", "Respons AI disaring, disimpan di SQLite, dan dikirim kembali ke pengguna.", "Template renderer menyusun halaman undangan statis yang estetis."]
        },
        challenges: {
          en: ["Parsing AI output so it consistently fits the template format.", "Keeping API call latency safely under 3 seconds."],
          id: ["Mem-parsing output AI agar selalu konsisten dengan format template.", "Menjaga latensi pemanggilan API tetap aman di bawah 3 detik."]
        },
        result: {
          en: "The app successfully sped up invitation drafting from an average of 25 minutes to under 10 seconds, with a content satisfaction rate of 92%.",
          id: "Aplikasi ini berhasil mempercepat proses pembuatan undangan dari rata-rata 25 menit menjadi kurang dari 10 detik, dengan tingkat kepuasan konten mencapai 92%."
        },
        futurePlan: {
          en: "Functional integration to export drafts directly to high-resolution PDF or an interactive WhatsApp draft.",
          id: "Integrasi fungsional untuk mengekspor draf langsung ke PDF resolusi tinggi atau draf WhatsApp interaktif."
        }
      }
    },
    {
      id: "ai-study-buddy",
      title: "AI Study Buddy",
      description: {
        en: "An AI-powered study companion web app built with Google AI Studio and the Gemini API, created for a Google Student Ambassador workshop.",
        id: "Aplikasi web teman belajar berbasis AI yang dibangun dengan Google AI Studio dan Gemini API, dibuat untuk workshop Google Student Ambassador."
      },
      tags: ["React", "TypeScript", "Gemini API", "Tailwind CSS", "Framer Motion", "Google AI Studio"],
      demoUrl: "https://ai-study-buddy-2-0-243362489112.asia-southeast1.run.app/",
      githubUrl: "https://github.com/sapphireveera-ia/AI-Study-Buddy.git",
      isFeatured: true,
      caseStudy: {
        overview: {
          en: "AI Study Buddy is an AI-powered learning companion app built as the hands-on centerpiece of a Google Student Ambassador workshop, 'Exploring Google AI Studio with Gemini,' demonstrating how students can go from prompt design to a deployed app.",
          id: "AI Study Buddy adalah aplikasi teman belajar berbasis AI yang dibangun sebagai materi utama praktik langsung dalam workshop Google Student Ambassador, 'Exploring Google AI Studio with Gemini,' untuk menunjukkan bagaimana mahasiswa bisa melangkah dari merancang prompt hingga men-deploy aplikasi."
        },
        problem: {
          en: "Students attending the workshop needed a concrete, relatable example of what building with Google AI Studio and the Gemini API actually looks like — beyond just theory.",
          id: "Peserta workshop membutuhkan contoh nyata dan relate-able tentang bagaimana sebenarnya membangun aplikasi dengan Google AI Studio dan Gemini API — bukan sekadar teori."
        },
        solution: {
          en: "Built a React + TypeScript app styled with Tailwind CSS and animated with Framer Motion, powered by the Gemini API to act as an interactive study assistant, then deployed live on Cloud Run for participants to try during the workshop.",
          id: "Membangun aplikasi React + TypeScript dengan styling Tailwind CSS dan animasi Framer Motion, ditenagai Gemini API sebagai asisten belajar interaktif, lalu di-deploy secara live di Cloud Run agar peserta bisa langsung mencobanya selama workshop."
        },
        architecture: {
          en: ["React + TypeScript front-end for the chat/study interface.", "Gemini API integration for generating study assistance responses.", "Tailwind CSS and Framer Motion for styling and interaction.", "Deployment to Google Cloud Run."],
          id: ["Front-end React + TypeScript untuk antarmuka chat/belajar.", "Integrasi Gemini API untuk menghasilkan respons bantuan belajar.", "Tailwind CSS dan Framer Motion untuk styling dan interaksi.", "Deployment ke Google Cloud Run."]
        },
        challenges: {
          en: ["Debugging a Gemini API PERMISSION_DENIED error during setup.", "Designing the app to be simple enough to explain live within a workshop timeframe."],
          id: ["Melakukan debugging error PERMISSION_DENIED dari Gemini API saat setup.", "Merancang aplikasi agar cukup sederhana untuk dijelaskan langsung dalam durasi workshop."]
        },
        result: {
          en: "Successfully deployed and demoed live during the GSA workshop, giving participants a working example to reference for their own Gemini API projects.",
          id: "Berhasil di-deploy dan didemokan secara langsung selama workshop GSA, memberi peserta contoh nyata untuk dijadikan referensi proyek Gemini API mereka sendiri."
        },
        futurePlan: {
          en: "Adding personalized study plans and support for multiple subjects/languages.",
          id: "Menambahkan rencana belajar personal dan dukungan untuk berbagai mata pelajaran/bahasa."
        }
      }
    },
    {
      id: "floodguard-bekasi",
      title: "FloodGuard Bekasi",
      description: {
        en: "A Data Mining project that classifies flood risk levels across Kota and Kabupaten Bekasi using a Gradient Boosting model trained on climate and disaster data.",
        id: "Proyek Data Mining yang mengklasifikasikan tingkat risiko banjir di Kota dan Kabupaten Bekasi menggunakan model Gradient Boosting yang dilatih dari data iklim dan bencana."
      },
      tags: ["Python", "Gradient Boosting", "Data Mining", "NASA POWER", "BNPB Data"],
      demoUrl: "https://floodguard-bekasi.onrender.com",
      githubUrl: "https://github.com/sapphireveera-ia/FloodGuard-Bekasi.git",
      pitchDeckUrl: "/assets/pitchdeck/floodguard-deck.pdf",
      isFeatured: true,
      caseStudy: {
        overview: {
          en: "FloodGuard Bekasi is a flood risk classification system built for the Data Mining final exam project, combining historical climate data from NASA POWER with disaster incident records from BNPB to predict flood risk levels across the Bekasi region (city and regency).",
          id: "FloodGuard Bekasi adalah sistem klasifikasi risiko banjir yang dibangun untuk proyek UAS Data Mining, menggabungkan data iklim historis dari NASA POWER dengan catatan kejadian bencana dari BNPB untuk memprediksi tingkat risiko banjir di wilayah Bekasi (kota dan kabupaten)."
        },
        problem: {
          en: "Flood-prone areas in Bekasi are often identified only after an incident occurs, leaving residents and local authorities with little time to prepare or mitigate damage.",
          id: "Wilayah rawan banjir di Bekasi seringkali baru teridentifikasi setelah kejadian terjadi, sehingga warga dan pihak berwenang setempat punya sedikit waktu untuk bersiap atau memitigasi kerusakan."
        },
        solution: {
          en: "Merged NASA POWER climate data (rainfall, humidity, temperature) with BNPB historical flood records, then trained a Gradient Boosting classifier to predict flood risk categories for different sub-districts.",
          id: "Menggabungkan data iklim NASA POWER (curah hujan, kelembapan, suhu) dengan catatan historis banjir BNPB, lalu melatih classifier Gradient Boosting untuk memprediksi kategori risiko banjir di tiap kecamatan."
        },
        architecture: {
          en: ["Data collection & merging from NASA POWER and BNPB sources.", "Data cleaning, feature engineering, and exploratory data analysis (EDA).", "Model training and tuning using Gradient Boosting.", "Deployment of the prediction interface as a web application."],
          id: ["Pengumpulan & penggabungan data dari sumber NASA POWER dan BNPB.", "Pembersihan data, feature engineering, dan exploratory data analysis (EDA).", "Pelatihan dan tuning model menggunakan Gradient Boosting.", "Deployment antarmuka prediksi sebagai aplikasi web."]
        },
        challenges: {
          en: ["Merging two datasets with different time granularities and formats.", "Handling class imbalance between flood and non-flood records."],
          id: ["Menggabungkan dua dataset dengan granularitas waktu dan format yang berbeda.", "Menangani ketidakseimbangan kelas antara data banjir dan non-banjir."]
        },
        result: {
          en: "Delivered a working risk-classification tool alongside a formal technical report, presented to the course teaching assistant with both a technical write-up and a simplified explanation script.",
          id: "Menghasilkan alat klasifikasi risiko yang berfungsi beserta laporan teknis formal, dipresentasikan ke asisten dosen dengan tulisan teknis lengkap dan naskah penjelasan yang disederhanakan."
        },
        futurePlan: {
          en: "Expanding coverage to other flood-prone regions in Greater Jakarta and incorporating real-time weather API data.",
          id: "Memperluas cakupan ke wilayah rawan banjir lain di Jabodetabek dan mengintegrasikan data API cuaca real-time."
        }
      }
    },
    {
      id: "sentiment-analysis",
      title: "Movie Sentiment Analysis NLP",
      description: {
        en: "A natural language processing (NLP) project that classifies movie viewer reviews into positive or negative sentiment using Machine Learning algorithms.",
        id: "Proyek natural language processing (NLP) yang mengklasifikasikan ulasan penonton film menjadi sentimen positif atau negatif menggunakan algoritme Machine Learning."
      },
      tags: ["Python", "NLP", "Scikit-Learn", "Pandas", "Machine Learning"],
      githubUrl: "https://github.com/sapphireveera-ia/UTS_NLP_GANG.git",
      pitchDeckUrl: "/assets/pitchdeck/movie_sentiment.pdf",
      caseStudy: {
        overview: {
          en: "Movie Sentiment Analysis trains a machine to understand the emotional sentiment behind movie reviews. Using a large text dataset, three main classifiers were trained to test which delivers the best classification accuracy.",
          id: "Movie Sentiment Analysis melatih mesin untuk memahami sentimen emosional di balik ulasan film. Dengan dataset teks berukuran besar, tiga classifier utama dilatih untuk menguji mana yang memberikan akurasi klasifikasi terbaik."
        },
        problem: {
          en: "The sheer volume of movie reviews on digital platforms makes it difficult for producers or viewers to manually gauge the average response.",
          id: "Banyaknya ulasan film di platform digital membuat produser atau penonton kesulitan mengukur respons rata-rata secara manual."
        },
        solution: {
          en: "A Python-based NLP system that cleans text (lemmatization, stopword removal), extracts features using TF-IDF, then trains Naive Bayes, Logistic Regression, and SVM classifiers.",
          id: "Sistem NLP berbasis Python yang membersihkan teks (lemmatization, penghapusan stopword), mengekstrak fitur menggunakan TF-IDF, lalu melatih classifier Naive Bayes, Logistic Regression, dan SVM."
        },
        architecture: {
          en: ["Dataset preprocessing using Pandas & NLTK.", "Sentence feature extraction using TF-IDF Vectorizer.", "Training of Naive Bayes, Logistic Regression, and SVM algorithms.", "Model evaluation using a confusion matrix and F1-Score."],
          id: ["Preprocessing dataset menggunakan Pandas & NLTK.", "Ekstraksi fitur kalimat menggunakan TF-IDF Vectorizer.", "Pelatihan algoritme Naive Bayes, Logistic Regression, dan SVM.", "Evaluasi model menggunakan confusion matrix dan F1-Score."]
        },
        challenges: {
          en: ["Reviews with sarcasm or double negation are often misclassified.", "Imbalance between positive/negative data in certain portions of the dataset."],
          id: ["Ulasan yang mengandung sarkasme atau negasi ganda sering salah diklasifikasikan.", "Ketidakseimbangan data positif/negatif pada bagian tertentu dari dataset."]
        },
        result: {
          en: "The SVM model achieved the highest accuracy of 89.5% on test data, outperforming Naive Bayes (84.1%).",
          id: "Model SVM mencapai akurasi tertinggi sebesar 89.5% pada data uji, mengungguli Naive Bayes (84.1%)."
        },
        futurePlan: {
          en: "Implementing an LSTM deep learning model or fine-tuning a BERT model to detect more subtle sarcastic sentiment.",
          id: "Menerapkan model deep learning LSTM atau melakukan fine-tuning model BERT untuk mendeteksi sentimen sarkastis yang lebih halus."
        }
      }
    },
    {
      id: "move-master",
      title: "Move Master Calculator",
      description: {
        en: "An interactive travel physics calculator app built with Streamlit in the first semester to understand algorithm fundamentals.",
        id: "Aplikasi kalkulator fisika perjalanan interaktif yang dibangun dengan Streamlit di semester pertama untuk memahami dasar-dasar algoritme."
      },
      tags: ["Python", "Streamlit", "Loops", "Conditional Logic"],
      githubUrl: "https://github.com/safiranurazkia/move-master-calculator",
      pitchDeckUrl: "/assets/pitchdeck/MovaMaster-App.pdf",
      caseStudy: {
        overview: {
          en: "Move Master is an academic motion-mechanics calculator project for computing speed, distance traveled, and estimated travel time based on dynamic input.",
          id: "Move Master adalah proyek akademik kalkulator mekanika gerak untuk menghitung kecepatan, jarak tempuh, dan estimasi waktu perjalanan berdasarkan input dinamis."
        },
        problem: {
          en: "Basic kinematics concepts often feel abstract to new students when confined to functional paper scribbles.",
          id: "Konsep kinematika dasar sering terasa abstrak bagi mahasiswa baru ketika hanya dibatasi pada coretan rumus di atas kertas."
        },
        solution: {
          en: "Built an interactive interface using Streamlit that shows live calculations along with graph visualizations comparing motion parameters.",
          id: "Membangun antarmuka interaktif menggunakan Streamlit yang menampilkan perhitungan secara langsung beserta visualisasi grafik perbandingan parameter gerak."
        },
        architecture: {
          en: ["Parameter input (initial velocity, acceleration, time).", "Basic kinematics calculation functions (uniform & uniformly accelerated motion).", "Plotting graphs of object motion.", "Rendering a responsive Streamlit interface."],
          id: ["Input parameter (kecepatan awal, percepatan, waktu).", "Fungsi perhitungan kinematika dasar (gerak lurus beraturan & berubah beraturan).", "Membuat plot grafik gerak objek.", "Menampilkan antarmuka Streamlit yang responsif."]
        },
        challenges: {
          en: ["Handling input exceptions such as negative values for the time parameter.", "Managing Streamlit state so values don't reset during graph interactions."],
          id: ["Menangani exception input seperti nilai negatif pada parameter waktu.", "Mengelola state Streamlit agar nilai tidak reset saat berinteraksi dengan grafik."]
        },
        result: {
          en: "Successfully used as a visual demo tool in a first-semester basic physics class presentation and earned the best project award.",
          id: "Berhasil digunakan sebagai alat demo visual dalam presentasi kelas fisika dasar semester pertama dan meraih penghargaan proyek terbaik."
        },
        futurePlan: {
          en: "Adding a projectile motion simulation module and an orbital gravity calculator.",
          id: "Menambahkan modul simulasi gerak parabola dan kalkulator gravitasi orbit."
        }
      }
    },
    {
      id: "internhub",
      title: "InternHub",
      description: {
        en: "A Project Management case study on an internship management information system, covering the full project lifecycle from charter to execution planning.",
        id: "Studi kasus Project Management untuk sistem informasi manajemen magang, mencakup siklus proyek penuh dari charter hingga perencanaan eksekusi."
      },
      tags: ["Project Management", "System Design", "PptxGenJS", "Documentation"],
      demoUrl: "https://internhub-project-production-4277.up.railway.app",
      githubUrl: "https://github.com/sapphireveera-ia/InternHub-Project.git",
      pitchDeckUrl: "/assets/pitchdeck/InternHubNEBULA.pdf",
      caseStudy: {
        overview: {
          en: "InternHub is an internship management information system designed to help universities and students manage the internship process — from application, placement, monitoring, to reporting — presented as a full Project Management lifecycle case study under the 'NEBULA' team (Kelompok 15).",
          id: "InternHub adalah sistem informasi manajemen magang yang dirancang untuk membantu universitas dan mahasiswa mengelola proses magang — mulai dari pendaftaran, penempatan, monitoring, hingga pelaporan — disajikan sebagai studi kasus siklus Project Management lengkap oleh tim 'NEBULA' (Kelompok 15)."
        },
        problem: {
          en: "Internship administration is often scattered across manual forms, spreadsheets, and email threads, making it hard for coordinators to track student progress and for students to manage their own documentation.",
          id: "Administrasi magang seringkali tersebar di formulir manual, spreadsheet, dan utas email, sehingga koordinator sulit melacak progres mahasiswa dan mahasiswa sulit mengelola dokumentasinya sendiri."
        },
        solution: {
          en: "Designed a structured project covering project infrastructure, governance, resource planning, and a full Project Charter, then translated the concept into a working information system prototype.",
          id: "Merancang proyek terstruktur yang mencakup infrastruktur proyek, governance, perencanaan sumber daya, dan Project Charter lengkap, lalu menerjemahkan konsep tersebut menjadi prototipe sistem informasi yang berfungsi."
        },
        architecture: {
          en: ["Project initiation & Project Charter definition.", "Governance and resource planning documentation.", "System design for student, mentor, and admin roles.", "Prototype build and deployment of the InternHub web app."],
          id: ["Inisiasi proyek & penyusunan Project Charter.", "Dokumentasi governance dan perencanaan sumber daya.", "Desain sistem untuk peran mahasiswa, mentor, dan admin.", "Pembangunan prototipe dan deployment aplikasi web InternHub."]
        },
        challenges: {
          en: ["Balancing academic project management theory with a realistic, buildable system scope.", "Coordinating deliverables across a multi-person team (Kelompok 15) under a consistent visual theme."],
          id: ["Menyeimbangkan teori project management akademik dengan cakupan sistem yang realistis dan bisa dibangun.", "Mengoordinasikan deliverable di antara tim beranggotakan banyak orang (Kelompok 15) dengan tema visual yang konsisten."]
        },
        result: {
          en: "Delivered a complete project management presentation with a 'Midnight Executive' visual theme, alongside a functioning deployed prototype of the system.",
          id: "Menghasilkan presentasi project management yang lengkap dengan tema visual 'Midnight Executive', beserta prototipe sistem yang berfungsi dan sudah di-deploy."
        },
        futurePlan: {
          en: "Adding real-time progress tracking for students and automated report generation for university coordinators.",
          id: "Menambahkan pelacakan progres real-time untuk mahasiswa dan pembuatan laporan otomatis untuk koordinator universitas."
        }
      }
    },
    {
      id: "rag-chatbot-pemweb",
      title: "Asisten Akademik: RAG Chatbot for Web Programming",
      description: {
        en: "An NLP project using Retrieval-Augmented Generation (RAG) to build an academic chatbot assistant that answers questions about basic web programming.",
        id: "Proyek NLP yang menggunakan Retrieval-Augmented Generation (RAG) untuk membangun chatbot asisten akademik yang menjawab pertanyaan seputar pemrograman web dasar."
      },
      tags: ["Python", "Streamlit", "LangChain", "ChromaDB", "RAG", "Qwen2.5-7B-Instruct"],
      demoUrl: "https://huggingface.co/spaces/firaa-sapphire29/chatbot-space-pemweb",
      githubUrl: "https://github.com/sapphireveera-ia/Chatbot-Pemrograman-web.git",
      pitchDeckUrl: "/assets/pitchdeck/chatbot-rag.pdf",
      caseStudy: {
        overview: {
          en: "Asisten Akademik is a Retrieval-Augmented Generation (RAG) chatbot built to answer student questions about basic web programming material, combining a vector database with a large language model for grounded, course-relevant answers.",
          id: "Asisten Akademik adalah chatbot Retrieval-Augmented Generation (RAG) yang dibangun untuk menjawab pertanyaan mahasiswa seputar materi pemrograman web dasar, menggabungkan vector database dengan large language model agar jawaban tetap akurat dan relevan dengan materi kuliah."
        },
        problem: {
          en: "Students often need quick, accurate answers to conceptual web programming questions, but generic chatbots can hallucinate or give answers disconnected from the actual course material.",
          id: "Mahasiswa sering membutuhkan jawaban cepat dan akurat untuk pertanyaan konseptual pemrograman web, tetapi chatbot generik bisa berhalusinasi atau memberi jawaban yang tidak sesuai dengan materi kuliah sebenarnya."
        },
        solution: {
          en: "Built a RAG pipeline using LangChain and ChromaDB to retrieve relevant course content, then passed it as context to the Qwen2.5-7B-Instruct model to generate grounded answers, deployed via Streamlit on Hugging Face Spaces.",
          id: "Membangun pipeline RAG menggunakan LangChain dan ChromaDB untuk mengambil konten kuliah yang relevan, lalu meneruskannya sebagai konteks ke model Qwen2.5-7B-Instruct untuk menghasilkan jawaban yang akurat, di-deploy melalui Streamlit di Hugging Face Spaces."
        },
        architecture: {
          en: ["Course material chunked and embedded into a ChromaDB vector store.", "LangChain retrieval pipeline fetches relevant context per query.", "Qwen2.5-7B-Instruct generates the final answer using retrieved context.", "Streamlit interface deployed on Hugging Face Spaces."],
          id: ["Materi kuliah dipecah (chunking) dan di-embed ke vector store ChromaDB.", "Pipeline retrieval LangChain mengambil konteks relevan untuk setiap query.", "Qwen2.5-7B-Instruct menghasilkan jawaban akhir menggunakan konteks yang diambil.", "Antarmuka Streamlit di-deploy di Hugging Face Spaces."]
        },
        challenges: {
          en: ["Resolving a hardcoded API token security issue before deployment.", "Adapting to Hugging Face's Streamlit SDK restructuring during setup."],
          id: ["Menyelesaikan isu keamanan API token yang ter-hardcode sebelum deployment.", "Beradaptasi dengan restrukturisasi Streamlit SDK Hugging Face selama proses setup."]
        },
        result: {
          en: "Successfully deployed a working academic chatbot that gives contextually grounded answers about web programming fundamentals.",
          id: "Berhasil men-deploy chatbot akademik yang berfungsi dan memberi jawaban yang akurat secara kontekstual seputar dasar-dasar pemrograman web."
        },
        futurePlan: {
          en: "Expanding the knowledge base to cover more courses and adding conversation memory for follow-up questions.",
          id: "Memperluas basis pengetahuan untuk mencakup lebih banyak mata kuliah dan menambahkan memori percakapan untuk pertanyaan lanjutan."
        }
      }
    },
    {
      id: "helmet-detection",
      title: "Helmet Detection",
      description: {
        en: "An Image Processing project focused on detecting helmet usage from image or video input using computer vision techniques.",
        id: "Proyek Image Processing yang berfokus pada deteksi penggunaan helm dari input gambar atau video menggunakan teknik computer vision."
      },
      tags: ["Python", "Computer Vision", "Image Processing", "Object Detection"],
      githubUrl: "https://github.com/sapphireveera-ia/Deteksi_Helm.git",
      pitchDeckUrl: "/assets/pitchdeck/",
      caseStudy: {
        overview: {
          en: "Helmet Detection is a computer vision project developed for the Image Processing course, aimed at automatically detecting whether a person in an image is wearing a helmet.",
          id: "Helmet Detection adalah proyek computer vision yang dikembangkan untuk mata kuliah Image Processing, bertujuan mendeteksi secara otomatis apakah seseorang dalam gambar sedang memakai helm."
        },
        problem: {
          en: "Manually monitoring helmet compliance (e.g. for riders) is time-consuming and inconsistent, especially at scale.",
          id: "Memantau kepatuhan penggunaan helm secara manual (misalnya untuk pengendara) memakan waktu dan tidak konsisten, terutama dalam skala besar."
        },
        solution: {
          en: "Applied image processing and object detection techniques to identify and classify helmet usage from image input.",
          id: "Menerapkan teknik image processing dan object detection untuk mengidentifikasi dan mengklasifikasikan penggunaan helm dari input gambar."
        },
        architecture: {
          en: ["Image preprocessing and annotation.", "Feature extraction and object detection model training.", "Classification of helmet vs. no-helmet.", "Evaluation against test images."],
          id: ["Preprocessing dan anotasi gambar.", "Ekstraksi fitur dan pelatihan model object detection.", "Klasifikasi memakai helm vs. tidak memakai helm.", "Evaluasi terhadap gambar uji."]
        },
        challenges: {
          en: ["Variations in lighting, angle, and image quality affecting detection accuracy.", "Distinguishing helmets from visually similar objects."],
          id: ["Variasi pencahayaan, sudut, dan kualitas gambar yang memengaruhi akurasi deteksi.", "Membedakan helm dari objek lain yang secara visual mirip."]
        },
        result: {
          en: "Built a functional detection pipeline as part of the Image Processing coursework.",
          id: "Membangun pipeline deteksi yang berfungsi sebagai bagian dari tugas mata kuliah Image Processing."
        },
        futurePlan: {
          en: "Extending the model to real-time video detection and deploying it as a lightweight web demo.",
          id: "Mengembangkan model untuk deteksi video real-time dan men-deploy-nya sebagai demo web yang ringan."
        }
      }
    },
    {
      id: "lensique-ecommerce",
      title: "Lensique",
      description: {
        en: "A full-stack JavaScript e-commerce web application for a women's eyewear/fashion brand concept, covering both storefront and backend logic.",
        id: "Aplikasi web e-commerce full-stack berbasis JavaScript untuk konsep brand eyewear/fashion wanita, mencakup storefront dan logika backend."
      },
      tags: ["JavaScript", "Full-Stack", "E-Commerce", "Web Development"],
      demoUrl: "https://lensique-progammer-women.vercel.app/",
      githubUrl: "https://github.com/feby25252/Project-Fullstack.git",
      pitchDeckUrl: "/assets/pitchdeck/lensique-deck.pdf",
      caseStudy: {
        overview: {
          en: "Lensique is a full-stack e-commerce web application built entirely with JavaScript, designed as a storefront concept for a women-focused eyewear/fashion brand.",
          id: "Lensique adalah aplikasi web e-commerce full-stack yang dibangun sepenuhnya dengan JavaScript, dirancang sebagai konsep storefront untuk brand eyewear/fashion yang berfokus pada wanita."
        },
        problem: {
          en: "Small fashion brands often need an accessible, well-designed online storefront without relying on heavy third-party platforms.",
          id: "Brand fashion skala kecil sering membutuhkan storefront online yang mudah diakses dan dirancang dengan baik tanpa harus bergantung pada platform pihak ketiga yang berat."
        },
        solution: {
          en: "Built a complete e-commerce flow — product listing, cart, and checkout logic — using a JavaScript-based full-stack architecture, deployed live on Vercel.",
          id: "Membangun alur e-commerce lengkap — daftar produk, keranjang, dan logika checkout — menggunakan arsitektur full-stack berbasis JavaScript, di-deploy secara live di Vercel."
        },
        architecture: {
          en: ["Front-end storefront UI for browsing and product display.", "Cart and checkout logic handled on the client/server side.", "Deployment and hosting via Vercel."],
          id: ["UI storefront front-end untuk menjelajah dan menampilkan produk.", "Logika keranjang dan checkout ditangani di sisi client/server.", "Deployment dan hosting melalui Vercel."]
        },
        challenges: {
          en: ["Structuring a clean full-stack flow within a JavaScript-only stack.", "Designing a storefront UI that felt polished and brand-appropriate."],
          id: ["Menyusun alur full-stack yang rapi dalam stack berbasis JavaScript saja.", "Merancang UI storefront yang terasa rapi dan sesuai dengan identitas brand."]
        },
        result: {
          en: "Delivered a fully deployed, functional e-commerce web app demonstrating end-to-end full-stack development skills.",
          id: "Menghasilkan aplikasi web e-commerce yang berfungsi penuh dan sudah di-deploy, menunjukkan kemampuan pengembangan full-stack end-to-end."
        },
        futurePlan: {
          en: "Adding payment gateway integration and a proper admin dashboard for inventory management.",
          id: "Menambahkan integrasi payment gateway dan dashboard admin yang layak untuk manajemen inventaris."
        }
      }
    }
  ];

  const poetryData: Poetry[] = [
    {
      id: "poem-1",
      title: "3 a.m",
      content: "In the third of the night,\nI whisper your name to God,\nIf this isn't right,\ntake it out of my heart.\n\nBut it stays…\nsoft under silver light.\nIt stays\nevery single night.\n\nYou only know my name,\nmaybe just my face.\nYou wouldn't notice if I'm gone,\nbut I see you in the afterglow.\n\nI tell God about you,\nthen let faith decide our way.\nI leave the rest to fate,\nno need to rush the days.\n\nYou make me want to change,\nto be better in my own way.\n\nIf we're meant to cross again,\nwe'll find it someday.\nSo I let faith decide our way\nand hope in silence.",
      mood: "lowkey",
      date: "2025"
    },
    {
      id: "poem-2",
      title: "Mimpi",
      content: "ia berjalan di lorong kata belum,\nmemanggul rasa yang tak pernah selesai\nbernama cukup\nyang bahkan, tak pernah benar-benar ada.\n\ndunia terus menuntut,\nia terus mengalah.\nlangkahnya tertahan oleh timbangan tak terlihat,\nselalu condong ke arah orang lain.\n\nsenyum tinggal sisa kebiasaan,\nretak menjelma jadi bentuk tubuh.\nia belajar bahwa\nkesempurnaan adalah upeti,\nkegagalan adalah bunyi\nyang harus diredam,\ndan bahagia harus menunggu\nhingga dunia merasa puas.\n\nia pandai mengalah\nbahkan pada mimpi yang diam-diam tumbuh di dadanya.\ndisimpannya rapi, agar tak ada yang terganggu\noleh harapannya.\n\nmimpi itu tidak mati,\nhanya dibiarkan tidak bernapas.\n\nSunyi kini tinggal, membawa bulan yang jauh\ntak menjawab,\ntapi setidaknya ia tak meminta apa-apa.",
      mood: "Emotion",
      date: "2025"
    },
    {
      id: "poem-3",
      title: "Star",
      content: "Five months from now, I never knew\nA star like you was always there\nI didn't see it till the moon\nSpoke your name inside my sleep\n\nSince that night your smile stays\nSo softly curved inside my head\n\nYour eyes look like crescent moons\nWhen you laugh, I lose myself\nAt two a.m. I ask the moon\nWill you look at me the way I look at you?\n\nThis feeling stays unspoken, still\nI'm scared our worlds don't face the same\nBut every night you cross my mind\nAnd I just smile here in the dark\n\nYour eyes look like crescent moons\nWhen you laugh, I lose myself\nAt two a.m. I ask the moon\nWill you look at me the way I look at you?\n\nHope is heavy in my chest\nOne day it might break in two\nI just wish that you would know\nYou're the quiet star I chose\n\nI want that gentle star to fall\nInto my arms",
      mood: "Emotion",
      date: "2025"
    },
    {
      id: "poem-4",
      title: "Stillness",
      content: "Late Morning, almost noon\nA tender breeze drifts unhurried,\ntracing warmth across my face\nand the quiet hours of the day.\nThe sky glows in a half-lit hush,\nand the leaves sway, soft,\nas though careful not to disturb the moment.\n\nTwo souls cross paths without intention\na flicker of greeting,\na glance too brief to hold,\nyet wrapped within those timid smiles,\nsomething gentle chooses to remain.\n\nNo vows, no names,\nonly a breath of time suspended in the air.\nAnd somehow,\nthe sky brightens beyond its nature,\nas though it, too, sensed\nhow two wondering hearts\ntouched for a heartbeat,\nand then parted with the light.",
      mood: "Emotion",
      date: "2025"
    },
    {
      id: "poem-5",
      title: "The Soft Beginning",
      content: "As the sun lowered its gaze,\namber light brushed the cheeks of two quiet souls.\nSilence learned how to speak,\nand a single look unraveled a thousand stories.\n\n\"May I touch your hair?\"\nA timid nod answered the pulse of a shy heart.\nSun-warmed strands, tinged with soft brown,\nrested gently in the cradle of dusk.\n\nFingers lingered in reverent stillness,\nthe wind exhaled in whispers.\nOne laugh, one smile—\nand time, understanding, held its breath.\n\nFootsteps home dissolved into violet twilight,\nwhile the earth released its memory into the air.\nA tender grip on a dangling strap,\nwarmer than a thousand unspoken words.\n\nNo vows were asked for, no reasons demanded—\nonly a silence that recognized itself.\nThe evening thinned and drifted away,\nyet the feeling refused to loosen its hold.\n\nEven now, the ears remember\nlaughter beneath a blushing sky,\ncalling rose-colored warmth to gentle cheeks.\n\nWas it merely an afternoon too soft to endure?\nOr something quietly taking root,\ngrowing without permission,\nwithout a name.",
      mood: "Emotion",
      date: "2025"
    },
    {
      id: "poem-6",
      title: "White Dress",
      content: "I've been chasing something blurry\nThat I don't quite understand\nIs it love or just a story\nThat was never in my hands?\n\nThey say \"you'll get there someday\"\nLike it's written in the stars\nBut what if I'm still waiting\nWith these questions and these scars?\n\nWill I ever wear a white dress someday\nLike everyone always talks about?\nOr will white find me first\nBefore I figure my life out?\n\nAnd every step feels heavier\nLike I'm running out of time\nBut I keep pretending I'm okay\nWhile I'm losing what is mine\n\nWhat if I'm not meant for\nThe life they always dreamed?\nWhat if I'm just someone\nWho survived more than it seems?\n\nAnd if I never wear that white dress\nIf it never comes my way\nWill it mean I failed at living\nOr just learned a different way?",
      mood: "Emotion",
      date: "2025"
    },
    {
      id: "poem-7",
      title: "quitely",
      content: "I never planned to write about you,\nyet somehow your name\nkeeps finding its way\nbetween my lines.\n\nYou appear in quiet moments\nlike a thought I didn't invite,\nsoftly living somewhere\nbetween my days and nights.\n\nI never meant to feel this way,\nnever meant to let it grow,\nbut somehow liking you in silence\nbecame something beautiful.\n\nMaybe you will never notice,\nmaybe you will never see\nhow simply knowing you existed\nchanged a part of me.\n\nI don't know where life will take us,\nmaybe far from where we are,\nmaybe someday our two stories\nmeet again beneath the stars.\n\nAnd if that moment ever finds us\nsomewhere in the future's light,\nI hope we meet again\nas better hearts,\nbetter souls,\nbetter lives.",
      mood: "Dreams",
      date: "2025"
    }
  ];



  const songsData: Song[] = [
    {
      id: "song-1",
      title: "quitely",
      artist: "Safira Nur Azkia (☾)",
      mood: "Vulnerable & Quiet",
      coverUrl: "purple",
      duration: "2:28", // ganti sesuai durasi asli file mp3 kamu
      audioUrl: "assets/audio/confession.mp3",
      description: "i was too scared to say out loud.",
      youtubeUrl: "https://www.youtube.com/embed/PVRk4BkpyHI",
      tiktokUrl: "https://vt.tiktok.com/ZS9W3QRyk/"
    },
    {
      id: "song-2",
      title: "3 a.m",
      artist: "Safira Nur Azkia (☾)",
      mood: "Melancholic (Deep Mood)",
      coverUrl: "blue",
      duration: "2:19",
      audioUrl: "assets/audio/3am.mp3",
      description: "some things are better left in prayers.",
      tiktokUrl: "https://vt.tiktok.com/ZS9W3nJjH/"
    },
    {
      id: "song-3",
      title: "lonely moon",
      artist: "Safira Nur Azkia (☾)",
      mood: "Soothing (Lullaby)",
      coverUrl: "indigo",
      duration: "2:19",
      audioUrl: "assets/audio/lonely-moon.mp3",
      description: "for those who had to became everything, before they even know who they were.",
      tiktokUrl: "https://vt.tiktok.com/ZS9WTLhfR/"
    },
    {
      id: "song-4",
      title: "i tried, didn't i?",
      artist: "Safira Nur Azkia (☾)",
      mood: "Melancholic (Deep Mood)",
      coverUrl: "rose",
      duration: "1:04",
      audioUrl: "assets/audio/i-tried-didn't-i.mp4",
      description: "about giving your all… and still wondering why it wasn't enough(?)",
      tiktokUrl: "https://vt.tiktok.com/ZS978VeHH/"
    },
    {
      id: "song-5",
      title: "we used to say hello",
      artist: "Safira Nur Azkia (☾)",
      mood: "Indie Rock (Yearning Mood)",
      coverUrl: "rose",
      duration: "0.58",
      audioUrl: "assets/audio/we-used-to-say-hello.mp3",
      description: "about realizing that you can miss someone",
    }
  ];


  const certificatesData: Certificate[] = [
    { id: "cert-1", title: "Gemini Certificated Student", issuer: "Google AI", date: "2026", category: "tech", image: "assets/images/certificates/gemini-certified-student.jpg" },
    { id: "cert-2", title: "Global Youth Digital Conference", issuer: "Global Youth Network", date: "Oct 2024", category: "forum", image: "assets/images/certificates/c0.jpg" },
    { id: "cert-3", title: "Secretariat Staff", issuer: "OSCAR 2.0", date: "2025 Term", category: "leadership", image: "assets/images/certificates/c1.jpeg" },
    { id: "cert-4", title: "Green Initiative Conference", issuer: "KUMPARAN", date: "2025", category: "forum", image: "assets/images/certificates/c2.jpeg" },
    { id: "cert-5", title: "FPCI-GRIPS Virtual Public Forum", issuer: "FPCI ", date: "2025", category: "forum", image: "assets/images/certificates/c3.jpeg" },
    { id: "cert-6", title: "Regional Forum 2025", issuer: "Regional Council Org", date: "2026", category: "forum", image: "assets/images/certificates/c4.jpeg" },
    { id: "cert-7", title: "Youth Generation Inspire", issuer: "Generation Inspire", date: "2025", category: "leadership", image: "assets/images/certificates/c5.jpeg" },
    { id: "cert-8", title: "Competition AI x Creativity Hackathon", issuer: "Alibaba Cloud", date: "2026", category: "competition", image: "assets/images/certificates/c6.jpg" },
    { id: "cert-9", title: "Samsung Innovation Campus", issuer: "Samsung", date: "2024", category: "tech", image: "assets/images/certificates/c7.jpg" },
    { id: "cert-10", title: "Generation Impact Conference", issuer: "Impact Network Global", date: "2025", category: "forum", image: "assets/images/certificates/c8.jpg" },
    { id: "cert-11", title: "National Poetry Writing Competition", issuer: "Sastra Nusantara Foundation", date: "2024", category: "competition", image: "assets/images/certificates/c9.jpg" },
    { id: "cert-12", title: "Investor Daily Summit 2025", issuer: "B-UNIVERSE", date: "2025", category: "forum", image: "assets/images/certificates/ids25.png" },
    { id: "cert-13", title: "Investor Daily Summit 2026", issuer: "B-UNIVERSE", date: "2026", category: "forum", image: "assets/images/certificates/ids26.png" }
  ];


  const memoriesData: Memory[] = [
    {
      id: "mem-1",
      title: "Jakarta Geopolitical Forum 2025",
      description: { en: "A memorable experience attending the Jakarta Geopolitical Forum 2025, organized by the National Resilience Institute (Lemhannas RI) under the Ministry of Defense, where global issues and youth perspectives on geopolitics came together.", id: "Pengalaman berkesan menghadiri Jakarta Geopolitical Forum 2025, yang diselenggarakan oleh Lembaga Ketahanan Nasional (Lemhannas RI) di bawah Kementerian Pertahanan, tempat isu-isu global dan perspektif anak muda tentang geopolitik dipertemukan." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a1.jpeg",
      category: "Conference",
    },
    {
      id: "mem-2",
      title: "Green Impact Festival",
      description: { en: "Participated in the Green Impact Festival 2025, a national event bringing together young innovators and sustainability initiatives, attended by the Vice President of Indonesia, Gibran Rakabuming Raka.", id: "Berpartisipasi dalam Green Impact Festival 2025, sebuah acara nasional yang mempertemukan inovator muda dan inisiatif keberlanjutan, dihadiri oleh Wakil Presiden Indonesia, Gibran Rakabuming Raka." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a2.jpeg",
      category: "conference",
    },
    {
      id: "mem-4",
      title: "Google Student Ambassador 2026",
      description: { en: "Selected as a Google Student Ambassador 2026 from over 81,000 applicants nationwide, becoming one of only three students chosen to represent my university. This opportunity allows me to empower communities, foster innovation, and advocate for technology through Google's programs and initiatives.", id: "Terpilih sebagai Google Student Ambassador 2026 dari lebih dari 81.000 pendaftar se-Indonesia, menjadi salah satu dari hanya tiga mahasiswa yang terpilih mewakili universitasnya. Kesempatan ini memungkinkan saya memberdayakan komunitas, mendorong inovasi, dan mengadvokasi teknologi melalui program dan inisiatif Google." },
      date: "2026",
      imageUrl: "Delegate",
      image: "/assets/images/memories/a42.jpeg",
      category: "Google Student Ambassador"
    },
    {
      id: "mem-3",
      title: "BytePlus Community Connect",
      description: { en: "Celebrating Independence Through Ideas, Bringing Stories to Life with Content Gen AI", id: "Merayakan Kemerdekaan Lewat Ide, Menghidupkan Cerita dengan Content Gen AI" },
      date: "2025",
      imageUrl: "workshop",
      image: "/assets/images/memories/a3.jpeg",
      category: "workshop"
    },
    {
      id: "mem-4",
      title: "OSCAR 2.0",
      description: { en: "Served as a Secretary Staff member for OSCAR 2.0, an event held at the Depok City Hall and attended by the Vice Mayor of Depok", id: "Menjadi Staf Sekretaris untuk OSCAR 2.0, acara yang diselenggarakan di Balai Kota Depok dan dihadiri oleh Wakil Wali Kota Depok." },
      date: "2025",
      imageUrl: "meeting",
      image: "/assets/images/memories/a4.jpeg",
      category: "event"
    },

    {
      id: "mem-4",
      title: "KATADATA SAFE 2025: Green for Resilience",
      description: { en: "Participated in KATADATA SAFE 2025: Green for Resilience, a national forum that brought together experts, policymakers, and young leaders to discuss sustainability, climate resilience, and green development initiatives in Indonesia.", id: "Berpartisipasi dalam KATADATA SAFE 2025: Green for Resilience, forum nasional yang mempertemukan para ahli, pembuat kebijakan, dan pemimpin muda untuk membahas keberlanjutan, ketahanan iklim, dan inisiatif pembangunan hijau di Indonesia." },
      date: "2025",
      imageUrl: "Conference",
      image: "/assets/images/memories/a5.jpeg",
      category: "conference"
    },

    {
      id: "mem-4",
      title: "KUMPARAN: GREEN INITIATIVE CONFERENCE",
      description: { en: "A warm round-table discussion with fellow board members organizing the administration of a national event.", id: "Diskusi meja bundar yang hangat bersama sesama anggota panitia dalam mengorganisasi administrasi sebuah acara nasional." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a6.jpeg",
      category: "Conference"
    },
    {
      id: "mem-4",
      title: "INVESTOR DAILY SUMMIT 2025",
      description: { en: "Attended the Investor Daily Summit 2025, a prestigious national forum that brought together government leaders, industry experts, and business executives to discuss Indonesia's economic outlook, investment opportunities, and future development strategies.", id: "Menghadiri Investor Daily Summit 2025, forum nasional bergengsi yang mempertemukan pemimpin pemerintahan, pakar industri, dan eksekutif bisnis untuk membahas prospek ekonomi Indonesia, peluang investasi, dan strategi pembangunan masa depan." },
      date: "2025",
      imageUrl: "Conference",
      image: "/assets/images/memories/a7.jpeg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "INVESTOR DAILY SUMMIT 2025",
      description: { en: "Attended the Investor Daily Summit 2025, a prestigious national forum that brought together government leaders, industry experts, and business executives to discuss Indonesia's economic outlook, investment opportunities, and future development strategies.", id: "Menghadiri Investor Daily Summit 2025, forum nasional bergengsi yang mempertemukan pemimpin pemerintahan, pakar industri, dan eksekutif bisnis untuk membahas prospek ekonomi Indonesia, peluang investasi, dan strategi pembangunan masa depan." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a8.jpeg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Lomba Event Sumpah Pemuda KE-97 KEMENPORA RI",
      description: { en: "Represented GenSmart Indonesia in the booth competition at the 97th Youth Pledge (Sumpah Pemuda) Event organized by the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), showcasing the organization's initiatives and engaging with participants from various communities.", id: "Mewakili GenSmart Indonesia dalam kompetisi booth pada Acara Sumpah Pemuda ke-97 yang diselenggarakan oleh Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), menampilkan inisiatif organisasi dan berinteraksi dengan peserta dari berbagai komunitas." },
      date: "2025",
      imageUrl: "meeting",
      image: "/assets/images/memories/a9.jpeg",
      category: "competition"
    },
    {
      id: "mem-4",
      title: "Lomba Event Sumpah Pemuda KE-97 KEMENPORA RI",
      description: { en: "Represented GenSmart Indonesia in the booth competition at the 97th Youth Pledge (Sumpah Pemuda) Event organized by the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), showcasing the organization's initiatives and engaging with participants from various communities.", id: "Mewakili GenSmart Indonesia dalam kompetisi booth pada Acara Sumpah Pemuda ke-97 yang diselenggarakan oleh Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), menampilkan inisiatif organisasi dan berinteraksi dengan peserta dari berbagai komunitas." },
      date: "2025",
      imageUrl: "meeting",
      image: "/assets/images/memories/a10.jpeg",
      category: "competition"
    },
    {
      id: "mem-11",
      title: "Lomba Event Sumpah Pemuda KE-97 KEMENPORA RI",
      description: { en: "Represented GenSmart Indonesia in the booth competition at the 97th Youth Pledge (Sumpah Pemuda) Event organized by the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), showcasing the organization's initiatives and engaging with participants from various communities.", id: "Mewakili GenSmart Indonesia dalam kompetisi booth pada Acara Sumpah Pemuda ke-97 yang diselenggarakan oleh Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), menampilkan inisiatif organisasi dan berinteraksi dengan peserta dari berbagai komunitas." },
      date: "2025",
      imageUrl: "meeting",
      image: "/assets/images/memories/a11.jpeg",
      category: "competition"
    },
    {
      id: "mem-4",
      title: "REGIONAL FORUM 2025: EMPOWERING REGIONS, FROM LOCAL TO GLOBAL",
      description: { en: "Participated in Regional Forum 2025: Empowering Regions, From Local to Global, a national forum that brought together leaders, policymakers, and young changemakers to discuss regional development, innovation, and global collaboration.", id: "Berpartisipasi dalam Regional Forum 2025: Empowering Regions, From Local to Global, forum nasional yang mempertemukan para pemimpin, pembuat kebijakan, dan penggerak perubahan muda untuk membahas pembangunan daerah, inovasi, dan kolaborasi global." },
      date: "2025",
      imageUrl: "forum",
      image: "/assets/images/memories/a12.jpeg",
      category: "forum"
    },
    {
      id: "mem-4",
      title: "REGIONAL FORUM 2025: EMPOWERING REGIONS, FROM LOCAL TO GLOBAL",
      description: { en: "Participated in Regional Forum 2025: Empowering Regions, From Local to Global, a national forum that brought together leaders, policymakers, and young changemakers to discuss regional development, innovation, and global collaboration.", id: "Berpartisipasi dalam Regional Forum 2025: Empowering Regions, From Local to Global, forum nasional yang mempertemukan para pemimpin, pembuat kebijakan, dan penggerak perubahan muda untuk membahas pembangunan daerah, inovasi, dan kolaborasi global." },
      date: "2025",
      imageUrl: "forum",
      image: "/assets/images/memories/a13.jpeg",
      category: "forum"
    },
    {
      id: "mem-14",
      title: "Leader Forum",
      description: { en: "Participated in the Leader Forum 2025, an inspiring gathering that brought together young leaders and changemakers to exchange ideas, strengthen leadership skills, and build meaningful connections.", id: "Berpartisipasi dalam Leader Forum 2025, pertemuan inspiratif yang mempertemukan pemimpin muda dan penggerak perubahan untuk bertukar gagasan, memperkuat keterampilan kepemimpinan, dan membangun koneksi yang bermakna." },
      date: "2025",
      imageUrl: "Leadership",
      image: "/assets/images/memories/a14.jpeg",
      category: "Leadership"
    },
    {
      id: "mem-15",
      title: "Leader Forum",
      description: { en: "Participated in the Leader Forum 2025, an inspiring gathering that brought together young leaders and changemakers to exchange ideas, strengthen leadership skills, and build meaningful connections.", id: "Berpartisipasi dalam Leader Forum 2025, pertemuan inspiratif yang mempertemukan pemimpin muda dan penggerak perubahan untuk bertukar gagasan, memperkuat keterampilan kepemimpinan, dan membangun koneksi yang bermakna." },
      date: "2025",
      imageUrl: "Leadership",
      image: "/assets/images/memories/a15.jpeg",
      category: "Leadership"
    },
    {
      id: "mem-4",
      title: "Indonesia Youth Health Summit 2026",
      description: { en: "Participated in the Indonesia Youth Health Summit 2026, a national forum held at the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), bringing together young leaders and advocates to discuss youth health, well-being, and collaborative initiatives for a healthier future.", id: "Berpartisipasi dalam Indonesia Youth Health Summit 2026, forum nasional yang diselenggarakan di Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), mempertemukan pemimpin muda dan para pendukung untuk membahas kesehatan pemuda, kesejahteraan, dan inisiatif kolaboratif demi masa depan yang lebih sehat." },
      date: "2026",
      imageUrl: "conference",
      image: "/assets/images/memories/a16.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Indonesia Youth Health Summit 2026",
      description: { en: "Participated in the Indonesia Youth Health Summit 2026, a national forum held at the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), bringing together young leaders and advocates to discuss youth health, well-being, and collaborative initiatives for a healthier future.", id: "Berpartisipasi dalam Indonesia Youth Health Summit 2026, forum nasional yang diselenggarakan di Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), mempertemukan pemimpin muda dan para pendukung untuk membahas kesehatan pemuda, kesejahteraan, dan inisiatif kolaboratif demi masa depan yang lebih sehat." },
      date: "2026",
      imageUrl: "conference",
      image: "/assets/images/memories/a17.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Lingkar Sehat Jakarta: Urban Health, Data Governance, Youth Leadership, & SDGs",
      description: { en: "Participated in Lingkar Sehat Jakarta 2026, a collaborative forum that explored urban health, data governance, youth leadership, and the Sustainable Development Goals (SDGs), bringing together young leaders, experts, and changemakers to discuss innovative solutions for healthier and more sustainable cities.", id: "Berpartisipasi dalam Lingkar Sehat Jakarta 2026, forum kolaboratif yang mengeksplorasi kesehatan urban, tata kelola data, kepemimpinan pemuda, dan Tujuan Pembangunan Berkelanjutan (SDGs), mempertemukan pemimpin muda, para ahli, dan penggerak perubahan untuk membahas solusi inovatif demi kota yang lebih sehat dan berkelanjutan." },
      date: "2026",
      imageUrl: "conference",
      image: "/assets/images/memories/a18.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Indonesia Youth Health Summit 2026",
      description: { en: "Participated in the Indonesia Youth Health Summit 2026, a national forum held at the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), bringing together young leaders and advocates to discuss youth health, well-being, and collaborative initiatives for a healthier future.", id: "Berpartisipasi dalam Indonesia Youth Health Summit 2026, forum nasional yang diselenggarakan di Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), mempertemukan pemimpin muda dan para pendukung untuk membahas kesehatan pemuda, kesejahteraan, dan inisiatif kolaboratif demi masa depan yang lebih sehat." },
      date: "2026",
      imageUrl: "conference",
      image: "/assets/images/memories/a19.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Youth Generation Inspire 2025",
      description: { en: "Served as a teaching volunteer at Youth Generation Inspire 2025, an initiative organized by IPB University, providing educational activities and inspiring elementary school students through interactive learning experiences.", id: "Menjadi relawan pengajar di Youth Generation Inspire 2025, inisiatif yang diselenggarakan oleh IPB University, memberikan kegiatan edukatif dan menginspirasi siswa sekolah dasar melalui pengalaman belajar yang interaktif." },
      date: "2025",
      imageUrl: "volunteer",
      image: "/assets/images/memories/a20.JPG",
      category: "volunteer"
    },
    {
      id: "mem-4",
      title: "Youth Generation Inspire 2025",
      description: { en: "Served as a teaching volunteer at Youth Generation Inspire 2025, an initiative organized by IPB University, providing educational activities and inspiring elementary school students through interactive learning experiences.", id: "Menjadi relawan pengajar di Youth Generation Inspire 2025, inisiatif yang diselenggarakan oleh IPB University, memberikan kegiatan edukatif dan menginspirasi siswa sekolah dasar melalui pengalaman belajar yang interaktif." },
      date: "2025",
      imageUrl: "volunteer",
      image: "/assets/images/memories/a21.JPG",
      category: "volunteer"
    },
    {
      id: "mem-4",
      title: "UNSW OPEN HOUSE",
      description: { en: "Participated in the UNSW Open House 2025, exploring academic opportunities, global learning experiences, and insights into studying at the University of New South Wales (UNSW) while connecting with students and university representatives.", id: "Berpartisipasi dalam UNSW Open House 2025, mengeksplorasi peluang akademik, pengalaman belajar global, dan wawasan tentang studi di University of New South Wales (UNSW) sambil terhubung dengan mahasiswa dan perwakilan universitas." },
      date: "2025",
      imageUrl: "Event",
      image: "/assets/images/memories/a22.jpg",
      category: "Event"
    },
    {
      id: "mem-4",
      title: "Talk Global Study Fair 2025",
      description: { en: "Participated in the Talk Global Study Fair 2025, exploring international study opportunities, scholarship programs, and insights from global education institutions while connecting with university representatives and fellow aspiring students.", id: "Berpartisipasi dalam Talk Global Study Fair 2025, mengeksplorasi peluang studi internasional, program beasiswa, dan wawasan dari institusi pendidikan global sambil terhubung dengan perwakilan universitas dan sesama calon mahasiswa." },
      date: "2025",
      imageUrl: "event",
      image: "/assets/images/memories/a24.jpg",
      category: "event"

    },
    {
      id: "mem-4",
      title: "UNSW OPEN HOUSE",
      description: { en: "Participated in the UNSW Open House 2025, exploring academic opportunities, global learning experiences, and insights into studying at the University of New South Wales (UNSW) while connecting with students and university representatives.", id: "Berpartisipasi dalam UNSW Open House 2025, mengeksplorasi peluang akademik, pengalaman belajar global, dan wawasan tentang studi di University of New South Wales (UNSW) sambil terhubung dengan mahasiswa dan perwakilan universitas." },
      date: "2025",
      imageUrl: "Event",
      image: "/assets/images/memories/a25.jpg",
      category: "event"
    },

    {
      id: "mem-4",
      title: "MC : High School Event",
      description: { en: "A memorable experience hosting my high school's Miss School Selection Event as the Master of Ceremonies, enhancing my public speaking, confidence, and stage management skills.", id: "Pengalaman berkesan menjadi pembawa acara (MC) pada Ajang Pemilihan Miss School di sekolah menengah saya, mengasah kemampuan public speaking, kepercayaan diri, dan pengelolaan panggung." },
      date: "2024",
      imageUrl: "Event",
      image: "/assets/images/memories/a29.jpg",
      category: "MC"
    },
    {
      id: "mem-4",
      title: "2nd Place Winner – Public Speaking Competition",
      description: { en: "Achieved 2nd Place in a Public Speaking Competition in 2020, demonstrating strong communication skills, confidence, and the ability to deliver impactful speeches before an audience.", id: "Meraih Juara 2 dalam Kompetisi Public Speaking pada tahun 2020, menunjukkan kemampuan komunikasi yang kuat, kepercayaan diri, dan kemampuan menyampaikan pidato yang berdampak di depan audiens." },
      date: "2020",
      imageUrl: "competition",
      image: "/assets/images/memories/a30.jpg",
      category: "competition"
    },
    {
      id: "mem-4",
      title: "Virtual Islamic History Library Project",
      description: { en: "Served as the person in charge and assistant teacher, leading my peers in developing a virtual library of Islamic historical stories. This experience strengthened my leadership, teamwork, and project coordination skills while making educational resources more accessible.", id: "Menjadi penanggung jawab dan asisten pengajar, memimpin rekan-rekan dalam mengembangkan perpustakaan virtual cerita sejarah Islam. Pengalaman ini memperkuat kepemimpinan, kerja sama tim, dan keterampilan koordinasi proyek sambil membuat sumber daya edukatif lebih mudah diakses." },
      date: "October 2024",
      imageUrl: "leadership",
      image: "/assets/images/memories/a31.jpg",
      category: "Leadership"
    },
    {
      id: "mem-4",
      title: "Generation Impact Conference 2025",
      description: { en: "Participated in the Generation Impact Conference 2025, a youth empowerment conference held at the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), bringing together young leaders, innovators, and changemakers to exchange ideas and create positive social impact.", id: "Berpartisipasi dalam Generation Impact Conference 2025, konferensi pemberdayaan pemuda yang diselenggarakan di Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), mempertemukan pemimpin muda, inovator, dan penggerak perubahan untuk bertukar gagasan dan menciptakan dampak sosial yang positif." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a32.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Generation Impact Conference 2025",
      description: { en: "Participated in the Generation Impact Conference 2025, a youth empowerment conference held at the Ministry of Youth and Sports of the Republic of Indonesia (Kemenpora RI), bringing together young leaders, innovators, and changemakers to exchange ideas and create positive social impact.", id: "Berpartisipasi dalam Generation Impact Conference 2025, konferensi pemberdayaan pemuda yang diselenggarakan di Kementerian Pemuda dan Olahraga Republik Indonesia (Kemenpora RI), mempertemukan pemimpin muda, inovator, dan penggerak perubahan untuk bertukar gagasan dan menciptakan dampak sosial yang positif." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a33.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Qur'an Recitation at High School Graduation Ceremony",
      description: { en: "Had the honor of serving as the Qur'an reciter (Tilawah) at my high school graduation ceremony, contributing to one of the most memorable milestones of our academic journey.", id: "Mendapat kehormatan menjadi pembaca Al-Qur'an (Tilawah) pada upacara kelulusan sekolah menengah, berkontribusi pada salah satu momen paling berkesan dalam perjalanan akademik kami." },
      date: "2024",
      imageUrl: "event",
      image: "/assets/images/memories/a34.jpg",
      category: "event"
    },
    {
      id: "mem-4",
      title: "1st Place Winner – Trilingual Speech Competition",
      description: { en: "Won 1st Place in a Trilingual Speech Competition as part of a three-member team, delivering the Arabic speech category while collaborating with teammates who represented the Indonesian and English categories.", id: "Meraih Juara 1 dalam Kompetisi Pidato Tiga Bahasa sebagai bagian dari tim beranggotakan tiga orang, membawakan kategori pidato Bahasa Arab sambil berkolaborasi dengan rekan tim yang mewakili kategori Bahasa Indonesia dan Bahasa Inggris." },
      date: "2022",
      imageUrl: "competition",
      image: "/assets/images/memories/a35.jpg",
      category: "competition"
    },
    {
      id: "mem-4",
      title: "Youth Generation Inspire 2025",
      description: { en: "Served as a teaching volunteer at Youth Generation Inspire 2025, an initiative organized by IPB University, providing educational activities and inspiring elementary school students through interactive learning experiences.", id: "Menjadi relawan pengajar di Youth Generation Inspire 2025, inisiatif yang diselenggarakan oleh IPB University, memberikan kegiatan edukatif dan menginspirasi siswa sekolah dasar melalui pengalaman belajar yang interaktif." },
      date: "2025",
      imageUrl: "volunteer",
      image: "/assets/images/memories/a36.jpg",
      category: "volunteer"
    },
    {
      id: "mem-4",
      title: "YOTNC 15",
      description: { en: "Participated in Young On Top National Conference (YOTNC) 15, one of Indonesia's largest youth conferences, featuring inspiring sessions from prominent national figures, industry leaders, entrepreneurs, and changemakers.", id: "Berpartisipasi dalam Young On Top National Conference (YOTNC) 15, salah satu konferensi pemuda terbesar di Indonesia, menampilkan sesi-sesi inspiratif dari tokoh nasional terkemuka, pemimpin industri, pengusaha, dan penggerak perubahan." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a37.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Energy & Mineral Festival",
      description: { en: "Participated in the Energy & Mineral Festival 2025, an inspiring event organized by the Ministry of Energy and Mineral Resources of the Republic of Indonesia (Ministry of ESDM), exploring the future of energy, sustainability, and innovation in Indonesia's natural resources sector.", id: "Berpartisipasi dalam Energy & Mineral Festival 2025, acara inspiratif yang diselenggarakan oleh Kementerian Energi dan Sumber Daya Mineral Republik Indonesia (ESDM), mengeksplorasi masa depan energi, keberlanjutan, dan inovasi di sektor sumber daya alam Indonesia." },
      date: "2025",
      imageUrl: "Conference",
      image: "/assets/images/memories/a38.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Symposium 2025",
      description: { en: "Participated in Symposium 2025, a youth empowerment forum held at the National Library of Indonesia, bringing together young leaders and changemakers to exchange ideas, foster collaboration, and discuss the future of youth development in Indonesia.", id: "Berpartisipasi dalam Symposium 2025, forum pemberdayaan pemuda yang diselenggarakan di Perpustakaan Nasional Indonesia, mempertemukan pemimpin muda dan penggerak perubahan untuk bertukar gagasan, membangun kolaborasi, dan membahas masa depan pengembangan pemuda di Indonesia." },
      date: "2025",
      imageUrl: "Forum",
      image: "/assets/images/memories/a39.jpg",
      category: "forum"
    },
    {
      id: "mem-4",
      title: "AI Talent Hub Indonesia",
      description: { en: "Participated in AI Talent Hub Indonesia 2025, a technology and innovation event held at the University of Indonesia (UI), bringing together students, industry leaders, and technology enthusiasts with support from major organizations such as Danantara, Pertamina, and other strategic partners.", id: "Berpartisipasi dalam AI Talent Hub Indonesia 2025, acara teknologi dan inovasi yang diselenggarakan di Universitas Indonesia (UI), mempertemukan mahasiswa, pemimpin industri, dan penggiat teknologi dengan dukungan dari organisasi besar seperti Danantara, Pertamina, dan mitra strategis lainnya." },
      date: "2025",
      imageUrl: "Tech",
      image: "/assets/images/memories/a40.jpg",
      category: "Tech"
    },
    {
      id: "mem-4",
      title: "FPCI: ASEAN for the People Conference",
      description: { en: "Participated in the FPCI: ASEAN for the People Conference 2025, a regional forum organized by the Foreign Policy Community of Indonesia (FPCI), bringing together young leaders, diplomats, and changemakers to discuss ASEAN cooperation, regional challenges, and the future of Southeast Asia.", id: "Berpartisipasi dalam FPCI: ASEAN for the People Conference 2025, forum regional yang diselenggarakan oleh Foreign Policy Community of Indonesia (FPCI), mempertemukan pemimpin muda, diplomat, dan penggerak perubahan untuk membahas kerja sama ASEAN, tantangan regional, dan masa depan Asia Tenggara." },
      date: "2025",
      imageUrl: "conference",
      image: "/assets/images/memories/a41.jpg",
      category: "conference"
    },
    {
      id: "mem-4",
      title: "Exploring Google AI Studio with Gemini: Turning Ideas into AI-Powered Solutions",
      description: { en: "Served as a speaker and workshop facilitator for a Google Student Ambassador event at my university, introducing participants to Google AI Studio and Gemini while guiding them in transforming ideas into AI-powered solutions through hands-on learning and prompt engineering.", id: "Menjadi pembicara dan fasilitator workshop untuk acara Google Student Ambassador di kampus saya, memperkenalkan peserta pada Google AI Studio dan Gemini sambil membimbing mereka mengubah ide menjadi solusi berbasis AI melalui pembelajaran praktik langsung dan prompt engineering." },
      date: "2026",
      imageUrl: "Speaker",
      image: "/assets/images/memories/a43.jpeg",
      category: "Speaker"
    },
    {
      id: "mem-4",
      title: "Prompt, Code, Launch!: Building Your Portfolio Website with Gemini Canvas",
      description: { en: "Served as a speaker and workshop facilitator for a Google Student Ambassador event at my university, guiding participants in building their own portfolio websites using Gemini Canvas and demonstrating how AI can accelerate creativity, coding, and personal branding.", id: "Menjadi pembicara dan fasilitator workshop untuk acara Google Student Ambassador di kampus saya, membimbing peserta membangun situs portofolio mereka sendiri menggunakan Gemini Canvas dan menunjukkan bagaimana AI dapat mempercepat kreativitas, coding, dan personal branding." },
      date: "2026",
      imageUrl: "Speaker",
      image: "/assets/images/memories/a44.jpeg",
      category: "Speaker"
    },
    {
      id: "mem-4",
      title: "HIPMI: Powered Development Forum 2026",
      description: { en: "Participated in the HIPMI Powered Development Forum 2026, a conference organized in collaboration with Danantara and PLN, bringing together young leaders, entrepreneurs, and professionals to discuss innovation, leadership, and Indonesia's future development.", id: "Berpartisipasi dalam HIPMI Powered Development Forum 2026, konferensi yang diselenggarakan bekerja sama dengan Danantara dan PLN, mempertemukan pemimpin muda, pengusaha, dan profesional untuk membahas inovasi, kepemimpinan, dan pembangunan masa depan Indonesia." },
      date: "2026",
      imageUrl: "Conference",
      image: "/assets/images/memories/a45.jpeg",
      category: "Conference"
    },
  ];

  // Filter handlers
  const filteredProjects = projectsData.filter((p) => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'ai') return p.tags.includes('AI Tools') || p.tags.includes('NLP');
    if (projectFilter === 'web') return p.tags.includes('HTML & CSS') || p.tags.includes('Flask');
    return true;
  });

  const filteredCertificates = certificatesData.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      c.issuer.toLowerCase().includes(certSearch.toLowerCase());
    const matchesCategory = certCategory === 'all' || c.category === certCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle real contact submission -> Formspree
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqqnwrp';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;

    setContactError('');
    setContactSending(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMsg,
        }),
      });

      if (res.ok) {
        setContactSuccess(true);
        setContactName('');
        setContactEmail('');
        setContactMsg('');
        // Clear success banner after 5 seconds
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        const data = await res.json().catch(() => null);
        setContactError(
          data?.errors?.[0]?.message || t.contact.genericError
        );
      }
    } catch (err) {
      setContactError(t.contact.networkError);
    } finally {
      setContactSending(false);
    }
  };

  // Switch navigation tabs smoothly
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-[var(--col-text)] bg-[var(--col-bg)] select-none">

      {/* Ambient Background Layer per Theme */}
      <AmbientLayer currentTheme={currentTheme} />

      {/* Dynamic Cursor Glow Tracker */}
      <div ref={cursorRef} className="custom-cursor-glow hidden sm:block" />

      {/* Modern Fixed Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--col-bg-glass)] backdrop-blur-md border-b border-[var(--col-border)] py-4 px-4 md:px-8 flex items-center justify-between gap-3 transition-all">
        {/* Logo and Moon Click Easter Egg */}
        <div
          onClick={handleMoonClick}
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
          title="Click 5 times in a row for a meteor shower!"
        >
          <span className="text-xl md:text-2xl text-[var(--col-sapphire-lt)] text-glow animate-pulse font-serif leading-none">
            ☾
          </span>
          <span className="font-bold text-sm md:text-base tracking-widest normal-case font-display text-[var(--col-moon-lt)] group-hover:text-[var(--col-sapphire-lt)] transition-colors">
            MoonlitSapphire.co
          </span>
        </div>

        {/* Desktop Links Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
          {['home', 'projects', 'poetry', 'songs', 'certificates', 'memories', 'guestbook', 'contact'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3.5 py-2 rounded-full cursor-pointer transition-all duration-300 ${isActive
                  ? 'bg-[var(--col-sapphire)] text-white shadow-md border border-[var(--col-sapphire-lt)]'
                  : 'text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)] hover:bg-[var(--col-surface-2)]'
                  }`}
                id={`nav-link-${tab}`}
              >
                {tab === 'home' ? t.nav.home
                  : tab === 'projects' ? t.nav.projects
                    : tab === 'poetry' ? t.nav.poetry
                      : tab === 'songs' ? t.nav.songs
                        : tab === 'certificates' ? t.nav.certificates
                          : tab === 'memories' ? t.nav.memories
                            : tab === 'guestbook' ? t.nav.guestbook
                              : t.nav.contact}
              </button>
            );
          })}
        </nav>

        {/* Right tools and buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageToggle />
          <div className="hidden sm:block">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          </div>

          {/* Hamburger Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full border border-[var(--col-border)] bg-[var(--col-surface-2)] text-[var(--col-text-dim)] hover:text-white cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Collapsible Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[68px] left-0 right-0 z-30 bg-[var(--col-bg-glass)] backdrop-blur-lg border-b border-[var(--col-border)] p-5 flex flex-col gap-2 shadow-2xl xl:hidden uppercase tracking-wider text-xs font-bold"
          >
            <div className="flex sm:hidden justify-center pb-2 mb-1 border-b border-[var(--col-border)]">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
            </div>
            {['home', 'projects', 'poetry', 'songs', 'certificates', 'memories', 'guestbook', 'contact'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`w-full text-left py-3 px-4 rounded-xl cursor-pointer transition-all ${isActive
                    ? 'bg-[var(--col-sapphire)] text-white border border-[var(--col-sapphire-lt)]'
                    : 'text-[var(--col-text-dim)] hover:text-white hover:bg-[var(--col-surface-2)]'
                    }`}
                  id={`mob-nav-link-${tab}`}
                >
                  {tab === 'home' ? t.nav.home
                    : tab === 'projects' ? t.nav.projects
                      : tab === 'poetry' ? t.nav.poetry
                        : tab === 'songs' ? t.nav.songs
                          : tab === 'certificates' ? t.nav.certificates
                            : tab === 'memories' ? t.nav.memories
                              : tab === 'guestbook' ? t.nav.guestbook
                                : t.nav.contact}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sections Routing Area */}
      <main className="pt-20 min-h-screen">

        <AnimatePresence mode="wait">

          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <HeroSection
                onNavigate={handleTabChange}
                triggerSecretShower={triggerShower}
                onSecretShowerTriggered={() => setTriggerShower(false)}
                currentTheme={currentTheme}
              />


              {/* Bio Section */}
              <section className="py-20 max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                {/* Profile illustration: Left Column */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-64 h-80 rounded-3xl p-1.5 bg-gradient-to-tr from-[var(--col-sapphire)] via-[var(--col-accent)] to-[var(--col-indigo)] shadow-xl overflow-hidden group">
                    <div className="w-full h-full rounded-[20px] bg-[var(--col-bg-2)] overflow-hidden relative flex items-center justify-center border-2 border-[var(--col-bg)]">
                      {/* Artistic Night Vibe vector background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-black/60 z-10" />
                      <div className="absolute top-8 left-8 w-12 h-12 rounded-full border-2 border-dashed border-[var(--col-border)] animate-spin-slow" />

                      <img
                        src="/assets/images/profile/profile2.jpeg"
                        alt="Safira Nur Azkia"
                        className="w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Narrative Bio Content: Right Column */}
                <div className="md:col-span-7 space-y-6 text-left">
                  <h3 className="text-xl font-mono text-[var(--col-sapphire-lt)] tracking-wider uppercase font-bold">
                    {t.bio.heading}
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-bold font-display text-[var(--col-moon-lt)] tracking-tight leading-snug">
                    {t.bio.quote}
                  </h2>
                  <div className="space-y-4 text-sm md:text-base text-[var(--col-text-dim)] font-light leading-relaxed">
                    <p>
                      {t.bio.p1}
                    </p>
                    <p>
                      {t.bio.p2}
                    </p>
                    <p>
                      {t.bio.p3Prefix} <strong className="text-[var(--col-moon-lt)] font-semibold">{t.bio.p3Web}</strong>{t.bio.p3And1} <strong className="text-[var(--col-moon-lt)] font-semibold">{t.bio.p3AI}</strong>{t.bio.p3And2} <strong className="text-[var(--col-moon-lt)] font-semibold">{t.bio.p3Lit}</strong>{t.bio.p3Suffix}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => handleTabChange('projects')}
                      className="btn-premium px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase border border-[var(--col-sapphire-lt)] bg-[var(--col-sapphire)] text-white hover:scale-105 transition-all flex items-center gap-2"
                      id="bio-cta-btn"
                    >
                      <span>{t.bio.cta}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Floating skill bubbles */}
              <FloatingSkills />

              {/* Achievement stats component */}
              <AchievementDashboard />

              {/* Core interactive Journey timeline */}
              <JourneyTimeline />

              {/* Fun Facts section wrapper */}
              <section className="py-16 max-w-5xl mx-auto px-4 md:px-8">
                <div className="glass-card p-8 rounded-3xl border border-[var(--col-border)] bg-gradient-to-tr from-[var(--col-bg-2)] to-[var(--col-surface-2)]">
                  <h4 className="text-lg font-bold font-display text-[var(--col-moon)] mb-6 tracking-wide flex items-center gap-2.5 pb-2 border-b border-[var(--col-border)]">
                    <Sparkles className="w-5 h-5 text-[var(--col-accent)]" />
                    <span>{t.funFacts.heading}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-2xl bg-[var(--col-surface)] border border-[var(--col-border)]">
                      <span className="text-xs font-mono font-bold uppercase text-[var(--col-sapphire-lt)]">{t.funFacts.fact1Title}</span>
                      <p className="text-xs text-[var(--col-text-dim)] leading-relaxed mt-1 font-light">
                        {t.funFacts.fact1Body}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--col-surface)] border border-[var(--col-border)]">
                      <span className="text-xs font-mono font-bold uppercase text-[var(--col-sapphire-lt)]">{t.funFacts.fact2Title}</span>
                      <p className="text-xs text-[var(--col-text-dim)] leading-relaxed mt-1 font-light">
                        {t.funFacts.fact2Body}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--col-surface)] border border-[var(--col-border)]">
                      <span className="text-xs font-mono font-bold uppercase text-[var(--col-sapphire-lt)]">{t.funFacts.fact3Title}</span>
                      <p className="text-xs text-[var(--col-text-dim)] leading-relaxed mt-1 font-light">
                        {t.funFacts.fact3Body}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 max-w-6xl mx-auto px-4 md:px-8 text-left"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.projects.heading}
                </h2>
                <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
                  {t.projects.subheading}
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    id={`project-${proj.id}`}
                    className="glass-card p-6 rounded-3xl flex flex-col justify-between border border-[var(--col-border)] relative overflow-hidden group hover:scale-[1.01]"
                  >
                    {/* Visual glow on cover hover */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--col-glow-soft)] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                    <div>
                      {/* Tags list */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[var(--col-surface-2)] text-[var(--col-sapphire-lt)] border border-[var(--col-border)]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold font-display text-[var(--col-moon)] mb-2 leading-tight">
                        {proj.title}
                      </h3>

                      <p className="text-xs md:text-sm text-[var(--col-text-dim)] font-light leading-relaxed mb-6">
                        {proj.description[language]}
                      </p>
                    </div>

                    {/* Actions bar */}
                    <div className="pt-4 border-t border-[var(--col-border)] flex flex-wrap gap-2 justify-between items-center mt-auto">
                      {proj.caseStudy ? (
                        <button
                          onClick={() => setSelectedProject(proj)}
                          className="flex items-center gap-1 text-xs font-semibold text-[var(--col-accent)] hover:text-[var(--col-sapphire-lt)] cursor-pointer"
                          id={`proj-btn-study-${proj.id}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.projects.caseStudy}</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[var(--col-text-muted)] italic font-mono">{t.projects.placeholder}</span>
                      )}

                      <div className="flex items-center gap-2">
                        {proj.demoUrl && (
                          <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--col-surface-2)] text-[var(--col-text-dim)] hover:text-white transition-colors" title={t.projects.openDemo}>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--col-surface-2)] text-[var(--col-text-dim)] hover:text-white transition-colors" title={t.projects.openSource}>
                            <Code2 className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Card #4: Placeholder coming soon */}
                <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center border-dashed border-[var(--col-border)] bg-[var(--col-surface-2)]/20 min-h-[220px]">
                  <Compass className="w-8 h-8 text-[var(--col-text-muted)] mb-3 animate-spin-slow" />
                  <h4 className="text-sm font-semibold text-[var(--col-text-dim)] tracking-wide font-mono">
                    {t.projects.comingSoonTitle}
                  </h4>
                  <p className="text-[11px] text-[var(--col-text-muted)] font-light max-w-[200px] mt-1.5">
                    {t.projects.comingSoonBody}
                  </p>
                </div>
              </div>

              {/* Case study popup view container */}
              <AnimatePresence>
                {selectedProject && (
                  <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 3: POETRY */}
          {activeTab === 'poetry' && (
            <motion.div
              key="poetry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 max-w-5xl mx-auto px-4 md:px-8 text-left"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.poetry.heading}
                </h2>
                <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
                  {t.poetry.subheading}
                </p>
              </div>

              {/* Poetry Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {poetryData.map((poem, idx) => (
                  <div
                    key={poem.id}
                    onClick={() => {
                      setSelectedPoem(poem);
                      setInkAnimationActive(true);
                      setTimeout(() => setInkAnimationActive(false), 1500);
                    }}
                    className="glass-card p-6 rounded-3xl border border-[var(--col-border)] cursor-pointer hover:-translate-y-1.5 flex flex-col justify-between hover:border-[var(--col-sapphire-lt)] group"
                    id={`poem-card-${poem.id}`}
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[var(--col-sapphire-lt)] uppercase tracking-wider mb-2">
                        ☾ {t.poetry.verseLabel} 0{idx + 1}
                      </div>
                      <h3 className="text-xl font-bold font-serif text-[var(--col-moon)] group-hover:text-glow group-hover:text-[var(--col-moon-lt)] transition-colors leading-snug mb-3">
                        {poem.title}
                      </h3>
                      {/* Short summary snippet */}
                      <p className="text-xs text-[var(--col-text-dim)] font-light leading-relaxed line-clamp-3 italic">
                        "{poem.content.split('\n')[0]}..."
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--col-border)] flex justify-between items-center text-[10px] font-mono text-[var(--col-text-muted)] font-bold mt-6">
                      <span className="uppercase">{poem.mood}</span>
                      <span>{poem.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ink-Faded Reading Canvas Modal */}
              <AnimatePresence>
                {selectedPoem && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 select-none">
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedPoem(null)}
                      className="absolute inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Reading sheet paper */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full max-w-xl max-h-[85vh] bg-[var(--col-bg-glass)] border border-[var(--col-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 backdrop-blur-lg"
                    >
                      {/* Close button - stays fixed, outside the scroll area */}
                      <button
                        onClick={() => setSelectedPoem(null)}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--col-surface-2)] text-[var(--col-text-muted)] hover:text-[var(--col-moon-lt)] transition-colors cursor-pointer z-20"
                        id="poem-close-btn"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Scrollable reading area */}
                      <div className="overflow-y-auto p-8 md:p-12 flex flex-col items-center text-center">
                        {/* Decors */}
                        <div className="text-2xl text-[var(--col-accent)] font-serif leading-none mb-6">☾</div>

                        {/* Ink animations block */}
                        <div className={`space-y-6 ${inkAnimationActive ? 'ink-transition' : ''}`}>
                          <h3 className="text-2xl md:text-3xl font-bold font-serif text-[var(--col-moon-lt)] tracking-wide">
                            {selectedPoem.title}
                          </h3>

                          <div className="w-12 h-0.5 bg-[var(--col-border)] mx-auto rounded-full" />

                          <p className="text-sm md:text-base font-serif-p text-[var(--col-text-dim)] italic leading-relaxed whitespace-pre-wrap tracking-wide">
                            {selectedPoem.content}
                          </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-[var(--col-border)] w-full flex justify-between items-center text-[10px] font-mono text-[var(--col-text-muted)]">
                          <span className="uppercase">{t.poetry.moodLabel}: {selectedPoem.mood}</span>
                          <span>{selectedPoem.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 4: SONGS */}
          {activeTab === 'songs' && (
            <motion.div
              key="songs"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-16 max-w-5xl mx-auto px-4 md:px-8 text-left"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.songs.heading}
                </h2>
                <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
                  {t.songs.subheading}
                </p>
              </div>

              {/* Two Column Layout: Active player on Left, Grid vinyl list on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Active Player widget: 5 columns */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="sticky top-24 w-full">
                    <AudioPlayer
                      song={selectedSong || songsData[0]}
                      onNext={() => {
                        const currentIdx = songsData.findIndex((s) => s.id === (selectedSong?.id || songsData[0].id));
                        const nextIdx = (currentIdx + 1) % songsData.length;
                        setSelectedSong(songsData[nextIdx]);
                      }}
                      onPrev={() => {
                        const currentIdx = songsData.findIndex((s) => s.id === (selectedSong?.id || songsData[0].id));
                        const prevIdx = (currentIdx - 1 + songsData.length) % songsData.length;
                        setSelectedSong(songsData[prevIdx]);
                      }}
                    />
                  </div>
                </div>

                {/* Vinyl List: 7 columns */}
                <div className="lg:col-span-7 flex flex-col space-y-3 max-h-[550px] overflow-y-auto pr-2">
                  <div className="text-[10px] font-mono tracking-widest text-[var(--col-text-muted)] uppercase font-bold mb-1 pb-1.5 border-b border-[var(--col-border)]">
                    {t.songs.catalogLabel} ({songsData.length} {t.songs.tracksLabel})
                  </div>

                  {songsData.map((song, idx) => {
                    const isSelected = selectedSong ? selectedSong.id === song.id : idx === 0;
                    return (
                      <div
                        key={song.id}
                        onClick={() => setSelectedSong(song)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${isSelected
                          ? 'bg-[var(--col-surface)] border-[var(--col-sapphire-lt)] shadow-md text-[var(--col-moon-lt)]'
                          : 'bg-[var(--col-surface-2)]/30 border-[var(--col-border)] text-[var(--col-text-dim)] hover:bg-[var(--col-surface-2)]/60'
                          }`}
                        id={`song-card-list-${song.id}`}
                      >
                        <div className="flex items-center gap-3.5 overflow-hidden">
                          {/* Left index or active equalizer */}
                          <div className="w-6 text-center text-xs font-mono font-bold text-[var(--col-text-muted)] shrink-0">
                            {isSelected ? (
                              <div className="flex justify-center items-end gap-0.5 h-3">
                                <span className="w-1 bg-[var(--col-sapphire-lt)] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                                <span className="w-1 bg-[var(--col-sapphire-lt)] rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
                                <span className="w-1 bg-[var(--col-sapphire-lt)] rounded-full animate-bounce h-1" style={{ animationDelay: '300ms' }} />
                              </div>
                            ) : (
                              <span>0{idx + 1}</span>
                            )}
                          </div>

                          {/* Cover art visual representation */}
                          <div className={`w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 ${isSelected ? 'vinyl-spin' : ''
                            }`} style={{ animationDuration: '6s' }}>
                            <div className="w-4.5 h-4.5 rounded-full border border-black flex items-center justify-center" style={{ background: song.coverUrl === 'purple' ? '#5b4fa8' : song.coverUrl === 'blue' ? '#2a4fa8' : song.coverUrl === 'emerald' ? '#10b981' : song.coverUrl === 'amber' ? '#f59e0b' : '#3b82f6' }}>
                              <div className="w-1 h-1 rounded-full bg-black" />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="overflow-hidden text-left">
                            <h4 className="font-semibold text-sm truncate leading-snug">
                              {song.title}
                            </h4>
                            <p className="text-[10px] text-[var(--col-text-muted)] font-mono uppercase tracking-wider mt-0.5">
                              {song.artist} • {song.mood}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-mono text-[var(--col-text-muted)] shrink-0 pl-3">
                          {song.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 max-w-6xl mx-auto px-4 md:px-8 text-left animate-fade-in"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.certificates.heading}
                </h2>
                <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
                  {t.certificates.subheading}
                </p>
              </div>

              {/* Filters & Search controllers */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">

                {/* Search Bar Input */}
                <div className="md:col-span-6 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--col-text-muted)]">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    placeholder={t.certificates.searchPlaceholder}
                    className="w-full bg-[var(--col-surface-2)]/30 border border-[var(--col-border)] text-sm rounded-xl pl-10 pr-4 py-3 text-[var(--col-text)] placeholder-[var(--col-text-muted)] focus:outline-none focus:border-[var(--col-sapphire-lt)] focus:bg-[var(--col-bg-2)] transition-all"
                    id="cert-search-input"
                  />
                </div>

                {/* Category quick selectors (6 columns) */}
                <div className="md:col-span-6 flex flex-wrap gap-2 items-center justify-start md:justify-end">
                  {[
                    { id: 'all', label: t.certificates.categoryAll },
                    { id: 'tech', label: t.certificates.categoryTech },
                    { id: 'leadership', label: t.certificates.categoryLeadership },
                    { id: 'forum', label: t.certificates.categoryForum },
                    { id: 'competition', label: t.certificates.categoryCompetition }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCertCategory(cat.id)}
                      className={`px-3 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${certCategory === cat.id
                        ? 'bg-[var(--col-sapphire)] border-[var(--col-sapphire-lt)] text-white'
                        : 'text-[var(--col-text-dim)] border-[var(--col-border)] hover:bg-[var(--col-surface-2)]'
                        }`}
                      id={`cert-cat-btn-${cat.id}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Certificates Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="glass-card rounded-3xl border border-[var(--col-border)] cursor-pointer flex flex-col justify-between group hover:-translate-y-1 overflow-hidden"
                    id={`cert-card-${cert.id}`}
                  >
                    {/* Thumbnail image */}
                    <div className="w-full h-36 overflow-hidden bg-[var(--col-surface-2)] border-b border-[var(--col-border)]">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        {/* Category Badge indicator */}
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--col-surface-2)] text-[var(--col-sapphire-lt)] border border-[var(--col-border)] mb-3 inline-block">
                          {cert.category === 'tech' ? t.certificates.badgeTech : cert.category === 'leadership' ? t.certificates.badgeLeadership : cert.category === 'forum' ? t.certificates.badgeForum : t.certificates.badgeCompetition}
                        </span>

                        <h3 className="text-base md:text-lg font-bold font-display text-[var(--col-moon)] leading-snug mb-1 group-hover:text-[var(--col-moon-lt)] transition-colors">
                          {cert.title}
                        </h3>

                        <p className="text-xs text-[var(--col-text-muted)] font-mono font-bold uppercase tracking-wider">
                          {cert.issuer}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[var(--col-border)] flex justify-between items-center text-[10px] font-mono text-[var(--col-text-muted)] font-semibold mt-5">
                        <span>Official Credential</span>
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredCertificates.length === 0 && (
                  <div className="col-span-full text-center py-16 glass-card rounded-2xl border-dashed">
                    <p className="text-sm text-[var(--col-text-muted)] font-mono">
                      {t.certificates.noResults}
                    </p>
                  </div>
                )}
              </div>

              {/* Lightbox Modal preview */}
              <AnimatePresence>
                {selectedCert && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 select-none">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedCert(null)}
                      className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full max-w-2xl bg-[var(--col-bg-2)] border border-[var(--col-border)] rounded-3xl p-6 md:p-8 flex flex-col z-10 max-h-[90vh] overflow-y-auto"
                    >
                      <button onClick={() => setSelectedCert(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--col-surface)] text-[var(--col-text-muted)] hover:text-white transition-colors cursor-pointer z-20" id="cert-close-btn">
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex flex-col items-center text-center space-y-4">
                        <Award className="w-10 h-10 text-[var(--col-sapphire-lt)] icon-glow" />

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--col-sapphire-lt)]">
                            {t.certificates.officialCertificate}
                          </span>
                          <h4 className="text-xl md:text-2xl font-bold font-display text-[var(--col-moon-lt)] tracking-wide mt-1">
                            {selectedCert.title}
                          </h4>
                          <p className="text-xs text-[var(--col-text-muted)] font-mono font-bold uppercase tracking-wider mt-0.5">
                            {selectedCert.issuer}
                          </p>
                        </div>

                        {/* Actual certificate image */}
                        <div className="w-full max-w-md rounded-2xl border border-[var(--col-border)] bg-[var(--col-surface-2)] overflow-hidden">
                          <img
                            src={selectedCert.image}
                            alt={selectedCert.title}
                            className="w-full h-auto object-contain max-h-[60vh]"
                          />
                        </div>

                        <span className="text-[10px] font-mono text-[var(--col-text-muted)] font-semibold uppercase tracking-widest">
                          {t.certificates.issueDate}: {selectedCert.date}
                        </span>

                        <p className="text-xs text-[var(--col-text-muted)] italic max-w-md">
                          {t.certificates.verifiedNote}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 6: MEMORIES */}
          {activeTab === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 max-w-6xl mx-auto px-4 md:px-8 text-left"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.memories.heading}
                </h2>
                <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
                  {t.memories.subheading}
                </p>
              </div>

              {/* Masonry layout — each card's height follows the photo's natural ratio, no forced cropping */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                {memoriesData.map((mem) => (
                  <div
                    key={mem.id}
                    onClick={() => setSelectedMemory(mem)}
                    className="glass-card rounded-3xl border border-[var(--col-border)] cursor-pointer overflow-hidden mb-6 break-inside-avoid group"
                    id={`mem-card-${mem.id}`}
                  >
                    {/* Photo: natural aspect ratio, no cropping */}
                    <div className="relative overflow-hidden">
                      <img
                        src={mem.image}
                        alt={mem.title}
                        className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 text-[var(--col-sapphire-lt)] border border-[var(--col-border)]">
                        {mem.category}
                      </span>
                    </div>

                    {/* Info sits below the photo, not overlapping it */}
                    <div className="p-5">
                      <span className="flex items-center gap-1 font-mono text-[9px] text-[var(--col-text-muted)] uppercase mb-1.5 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {mem.date}
                      </span>
                      <h3 className="text-base md:text-lg font-bold font-display text-[var(--col-moon)] leading-snug group-hover:text-[var(--col-moon-lt)] transition-colors mb-1.5">
                        {mem.title}
                      </h3>
                      <p className="text-xs text-[var(--col-text-dim)] font-light leading-relaxed">
                        {mem.description[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal review for Memories */}
              <AnimatePresence>
                {selectedMemory && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 select-none">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedMemory(null)}
                      className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full max-w-xl bg-[var(--col-bg-2)] border border-[var(--col-border)] rounded-3xl overflow-hidden flex flex-col z-10 max-h-[90vh]"
                    >
                      <button onClick={() => setSelectedMemory(null)} className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--col-surface)] text-[var(--col-text-muted)] hover:text-white transition-colors cursor-pointer z-30" id="mem-close-btn">
                        <X className="w-5 h-5" />
                      </button>

                      {/* Actual memory photo — full photo shown, no cropping */}
                      <div className="w-full relative border-b border-[var(--col-border)] shrink-0 bg-black/20 flex items-center justify-center max-h-[50vh] overflow-hidden">
                        <img
                          src={selectedMemory.image}
                          alt={selectedMemory.title}
                          className="w-full h-auto max-h-[50vh] object-contain"
                        />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-black/60 text-[var(--col-sapphire-lt)] border border-[var(--col-border)]">
                            {selectedMemory.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3 overflow-y-auto">
                        <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--col-text-muted)] font-bold uppercase">
                          <Calendar className="w-3.5 h-3.5" />
                          {selectedMemory.date}
                        </span>

                        <h4 className="text-xl font-bold font-display text-[var(--col-moon-lt)] tracking-wide">
                          {selectedMemory.title}
                        </h4>

                        <p className="text-xs md:text-sm text-[var(--col-text-dim)] font-light leading-relaxed">
                          {selectedMemory.description[language]}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 7: GUESTBOOK */}
          {activeTab === 'guestbook' && (
            <motion.div
              key="guestbook"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.guestbook.heading}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[var(--col-sapphire)] to-[var(--col-indigo)] mx-auto rounded-full mb-12" />

                <GuestbookSection />
              </div>
            </motion.div>
          )}

          {/* TAB 8: CONTACT */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-16 max-w-5xl mx-auto px-4 md:px-8 text-left"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--col-moon-lt)] font-display mb-3">
                  {t.contact.heading}
                </h2>
                <p className="text-sm md:text-base text-[var(--col-text-dim)] max-w-lg mx-auto font-light">
                  {t.contact.subheading}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Contact info: 4 columns */}
                <div className="md:col-span-4 space-y-6">
                  <div className="glass-card p-6 rounded-3xl border border-[var(--col-border)] space-y-5 text-left">
                    <h4 className="text-base font-bold font-display text-[var(--col-moon)] tracking-wide">
                      {t.contact.channelsHeading}
                    </h4>

                    <div className="flex gap-3.5 items-start">
                      <div className="p-2.5 rounded-xl bg-[var(--col-surface-2)] text-[var(--col-sapphire-lt)] border border-[var(--col-border)] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[9px] font-mono text-[var(--col-text-muted)] font-bold uppercase tracking-wider block">{t.contact.emailLabel}</span>
                        <a href="mailto:bluemoonsappire@gmail.com" className="text-xs md:text-sm text-[var(--col-text-dim)] hover:text-[var(--col-sapphire-lt)] font-mono transition-colors truncate block">
                          veerasapphire@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-start">
                      <div className="p-2.5 rounded-xl bg-[var(--col-surface-2)] text-[var(--col-sapphire-lt)] border border-[var(--col-border)] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[9px] font-mono text-[var(--col-text-muted)] font-bold uppercase tracking-wider block">{t.contact.locationLabel}</span>
                        <span className="text-xs md:text-sm text-[var(--col-text-dim)] block">
                          Depok, Indonesia (☾)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social links badges */}
                  <div className="flex justify-start gap-3 pl-2">
                    <a href="https://www.instagram.com/sapphr_?igsh=OTRjdjFqN2pndXkz" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-dim)] hover:text-white hover:border-[var(--col-sapphire-lt)] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md">
                      <i className="fa-brands fa-instagram text-sm" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/safira-nur-azkia-a786a7353?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-dim)] hover:text-white hover:border-[var(--col-sapphire-lt)] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                    >
                      <i className="fa-brands fa-linkedin-in text-sm" />
                    </a>
                    <a href="https://github.com/sapphireveera-ia" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-dim)] hover:text-white hover:border-[var(--col-sapphire-lt)] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md">
                      <i className="fa-brands fa-github text-sm" />
                    </a>
                    <a href="https://www.tiktok.com/@sapphr_?_r=1&_t=ZS-97r3PRE3p0W" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-dim)] hover:text-white hover:border-[var(--col-sapphire-lt)] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md">
                      <i className="fa-brands fa-tiktok text-sm" />
                    </a>
                  </div>
                </div>

                {/* Form area: 8 columns */}
                <div className="md:col-span-8">
                  <div className="glass-card p-6 md:p-8 rounded-3xl border border-[var(--col-border)]">
                    <h3 className="text-lg md:text-xl font-bold font-display text-[var(--col-moon-lt)] tracking-wide mb-6">
                      {t.contact.formHeading}
                    </h3>

                    <form onSubmit={handleContactSubmit} className="space-y-4 text-left">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--col-text-muted)] mb-1 font-bold">
                            {t.contact.nameLabel}
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder={t.contact.namePlaceholder}
                            className="w-full bg-[var(--col-bg-2)] border border-[var(--col-border)] text-sm rounded-xl px-4 py-2.5 text-[var(--col-text)] placeholder-[var(--col-text-muted)] focus:outline-none focus:border-[var(--col-sapphire-lt)] transition-colors"
                            id="contact-input-name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--col-text-muted)] mb-1 font-bold">
                            {t.contact.emailLabel}
                          </label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder={t.contact.emailPlaceholder}
                            className="w-full bg-[var(--col-bg-2)] border border-[var(--col-border)] text-sm rounded-xl px-4 py-2.5 text-[var(--col-text)] placeholder-[var(--col-text-muted)] focus:outline-none focus:border-[var(--col-sapphire-lt)] transition-colors"
                            id="contact-input-email"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[var(--col-text-muted)] mb-1 font-bold">
                          {t.contact.messageLabel}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder={t.contact.messagePlaceholder}
                          className="w-full bg-[var(--col-bg-2)] border border-[var(--col-border)] text-sm rounded-xl px-4 py-2.5 text-[var(--col-text)] placeholder-[var(--col-text-muted)] focus:outline-none focus:border-[var(--col-sapphire-lt)] transition-colors resize-none"
                          id="contact-input-message"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={contactSending}
                        className="btn-premium px-6 py-3.5 rounded-xl font-semibold text-white bg-[var(--col-sapphire)] border border-[var(--col-sapphire-lt)] shadow-md hover:scale-105 transition-all text-xs uppercase tracking-widest cursor-pointer inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        id="contact-submit-btn"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{contactSending ? t.contact.sending : t.contact.send}</span>
                      </button>

                    </form>

                    {/* Success banner overlay */}
                    <AnimatePresence>
                      {contactSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-4 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-emerald-200 text-xs flex items-center gap-2"
                        >
                          <CheckSquare className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                          <span>{t.contact.successMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error banner overlay */}
                    <AnimatePresence>
                      {contactError && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-4 p-4 bg-red-950/30 border border-red-500/30 rounded-xl text-red-200 text-xs flex items-center gap-2"
                        >
                          <span>{contactError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Shared Footer Area */}
      <footer className="py-12 border-t border-[var(--col-border)] bg-[var(--col-bg-2)]/30 text-center relative z-20">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          {/* Brand */}
          <div className="flex justify-center items-center gap-1 text-[var(--col-moon-lt)] text-sm font-semibold tracking-wider font-display">
            <span>MoonlitSapphire.co</span>
            <span className="text-[var(--col-sapphire-lt)]">☾</span>
          </div>

          <p className="text-xs text-[var(--col-text-muted)] italic">
            "Still growing under the same moon."
          </p>

          <p className="text-[10px] font-mono text-[var(--col-text-muted)] uppercase tracking-widest font-semibold">
            © {new Date().getFullYear()} Safira Nur Azkia. {t.footer.rights}
          </p>
        </div>
      </footer>

    </div>
  );
}
