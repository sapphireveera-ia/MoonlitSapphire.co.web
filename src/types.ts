export type ThemeMode = 'morning' | 'sunset' | 'night' | 'auto';

// A value that has both an English and Indonesian version.
export interface Bilingual<T = string> {
  en: T;
  id: T;
}

export interface CaseStudy {
  overview: Bilingual;
  problem: Bilingual;
  solution: Bilingual;
  architecture: Bilingual<string[]>;
  challenges: Bilingual<string[]>;
  result: Bilingual;
  futurePlan: Bilingual;
}

export interface Project {
  id: string;
  title: string;
  description: Bilingual;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  pitchDeckUrl?: string;
  isFeatured?: boolean;
  caseStudy?: CaseStudy;
}

export interface Poetry {
  id: string;
  title: string;
  content: string; // Newline separated verses
  mood: string;
  date: string;
}


export interface Song {
  id: string;
  title: string;
  artist: string;
  mood: string;
  coverUrl: string;
  duration: string;       // fallback text sebelum metadata audio ke-load, format "M:SS"
  audioUrl: string;       // path ke file mp3, contoh: "/audio/quitely.mp3"
  description?: string;   // caption singkat lagu (opsional)
  youtubeUrl?: string;    // opsional, cuma ada kalau ada lyric video
  tiktokUrl?: string;     // opsional
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'tech' | 'leadership' | 'competition' | 'forum';
  credentialUrl?: string;
  image: string;
}

export interface Memory {
  id: string;
  title: string;
  description: Bilingual;
  date: string;
  imageUrl: string;
  image: string;
  category: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  rating: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}