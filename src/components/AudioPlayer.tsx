import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Heart, Youtube } from 'lucide-react';
import { Song } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface AudioPlayerProps {
  song: Song;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function AudioPlayer({ song, onNext, onPrev }: AudioPlayerProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Ganti track: reset state & load song baru, langsung play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [song.audioUrl]);

  // Sinkronin play/pause state ke elemen audio asli
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Sinkronin volume & mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onNext) onNext();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  return (
    <div className="glass-card p-6 rounded-3xl border border-[var(--col-border)] max-w-md mx-auto relative overflow-hidden select-none" id="audio-player-widget">

      {/* elemen audio asli, hidden, ini yang beneran mutar file mp3 */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Visual glowing aura behind player */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--col-glow-soft)] rounded-full blur-3xl pointer-events-none" />

      {/* Main layout */}
      <div className="flex flex-col items-center">

        {/* Spinning Vinyl Cover Art */}
        <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
          {/* Outer Vinyl grooves */}
          <div className={`absolute inset-0 rounded-full bg-neutral-900 border-4 border-neutral-800 shadow-2xl flex items-center justify-center ${
            isPlaying ? 'vinyl-spin' : ''
          } transition-all duration-[3000ms] ease-linear`}>

            {/* Inner groove circles */}
            <div className="absolute inset-4 rounded-full border border-neutral-700/50" />
            <div className="absolute inset-8 rounded-full border border-neutral-700/30" />
            <div className="absolute inset-12 rounded-full border border-neutral-700/20" />

            {/* Song Cover Art Center Label */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black flex items-center justify-center bg-[var(--col-bg-2)] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 opacity-60" />
              <Music className="w-6 h-6 text-white relative z-10 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-black border border-neutral-800 z-20 absolute" />
            </div>
          </div>

          {/* Decorative Tonearm needle */}
          <div
            className="absolute -top-3 right-4 w-12 h-20 origin-top-left transition-transform duration-700 pointer-events-none z-20"
            style={{
              transform: isPlaying ? 'rotate(18deg)' : 'rotate(0deg)'
            }}
          >
            <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
              <path d="M5,5 L15,10 L15,45 L25,55 L22,60" stroke="#7890a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18" y="52" width="8" height="12" rx="1" fill="#c8d8f0" />
              <circle cx="5" cy="5" r="4" fill="#a8b8d0" />
            </svg>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="h-10 flex items-center gap-1.5 justify-center w-full mb-6 relative">
          {Array.from({ length: 18 }).map((_, i) => {
            const delay = i * 0.08;
            return (
              <span
                key={i}
                className="w-1.5 rounded-full bg-gradient-to-t from-[var(--col-sapphire)] to-[var(--col-sapphire-lt)] origin-bottom transition-all duration-300"
                style={{
                  height: isPlaying ? '100%' : '20%',
                  animation: isPlaying ? `float-slow 1.2s ease-in-out infinite alternate` : 'none',
                  animationDelay: `${delay}s`,
                  maxHeight: `${[24, 38, 16, 32, 20, 42, 14, 36, 22, 40, 18, 30, 12, 34, 26, 38, 16, 24][i % 18]}px`
                }}
              />
            );
          })}
        </div>

        {/* Tracks Information */}
        <div className="text-center mb-4 w-full px-4">
          <h4 className="font-bold text-lg text-[var(--col-moon)] font-display tracking-wide truncate">
            {song.title}
          </h4>
          <p className="text-xs text-[var(--col-text-muted)] mt-0.5 truncate font-semibold font-mono uppercase tracking-wider">
            {song.artist}
          </p>
          {song.description && (
            <p className="text-xs text-[var(--col-text-dim)] italic mt-2 px-2">
              {song.description}
            </p>
          )}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-muted)] text-[10px] font-mono uppercase tracking-wider font-semibold mt-3">
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            <span>Mood: {song.mood}</span>
          </div>
        </div>

        {/* Progress Timeline Slider — real audio time */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-center text-[10px] font-mono text-[var(--col-text-muted)] mb-1">
            <span>{formatSeconds(currentTime)}</span>
            <span>{duration ? formatSeconds(duration) : song.duration}</span>
          </div>
          <div
            onClick={handleSeek}
            className="h-1.5 w-full bg-[var(--col-surface-2)] border border-[var(--col-border)] rounded-full cursor-pointer relative"
          >
            <div
              className="h-full bg-gradient-to-r from-[var(--col-sapphire-mid)] to-[var(--col-indigo)] rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div
              className="w-3 h-3 rounded-full bg-white border border-[var(--col-sapphire-mid)] absolute -top-[3px] -translate-x-1/2 shadow-md"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>

        {/* Audio Controller Buttons */}
        <div className="flex items-center gap-6 mb-4">
          <button
            onClick={onPrev}
            className="p-2 text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title={t.audioPlayer.previous}
            id="audio-prev-btn"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="w-12 h-12 rounded-full bg-[var(--col-sapphire)] border border-[var(--col-sapphire-lt)] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-[var(--col-glow)] cursor-pointer"
            id="audio-play-btn"
            aria-label={isPlaying ? t.audioPlayer.pause : t.audioPlayer.play}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={onNext}
            className="p-2 text-[var(--col-text-dim)] hover:text-[var(--col-moon-lt)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title={t.audioPlayer.next}
            id="audio-next-btn"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume indicators */}
        <div className="flex items-center gap-3 w-full max-w-[200px] text-[var(--col-text-muted)] mt-2 mb-4">
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="hover:text-[var(--col-moon-lt)] transition-colors cursor-pointer"
            id="audio-mute-btn"
            aria-label={isMuted ? t.audioPlayer.unmute : t.audioPlayer.mute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="h-1 w-full bg-[var(--col-surface-2)] rounded-full appearance-none cursor-pointer accent-[var(--col-sapphire-lt)]"
            aria-label={t.audioPlayer.volume}
          />
        </div>

        {/* Platform links — nonton lyric video / TikTok */}
        {(song.youtubeUrl || song.tiktokUrl) && (
          <div className="flex items-center gap-3">
            {song.youtubeUrl && (
              <a
                href={song.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-muted)] text-[10px] font-mono uppercase tracking-wider font-semibold hover:text-red-400 hover:border-red-400/40 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" /> YouTube
              </a>
            )}
            {song.tiktokUrl && (
              <a
                href={song.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--col-surface-2)] border border-[var(--col-border)] text-[var(--col-text-muted)] text-[10px] font-mono uppercase tracking-wider font-semibold hover:text-[var(--col-moon-lt)] hover:border-[var(--col-sapphire-lt)]/40 transition-colors"
              >
                <Music className="w-3.5 h-3.5" /> TikTok
              </a>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

// Format detik jadi M:SS
function formatSeconds(totalSec: number): string {
  if (!isFinite(totalSec) || totalSec < 0) return '0:00';
  const mins = Math.floor(totalSec / 60);
  const secs = Math.floor(totalSec % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}