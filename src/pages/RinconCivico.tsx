import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { locales } from '@/lib/translations';
import { getCivicTracks } from '@/lib/data';

const formatTime = (s: number) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const RinconCivico = () => {
  const { lang } = useLang();
  const t = locales[lang];
  const tracks = getCivicTracks(lang);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    setCurrentTime(current);
    if (dur) setProgress((current / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    if (isRepeating) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play();
    } else if (currentIdx < tracks.length - 1) {
      loadTrack(currentIdx + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const loadTrack = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-destructive/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Music size={16} />
            {t.civic.title}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground mb-3">{t.civic.title}</h1>
          <p className="text-lg text-muted-foreground">{t.civic.subtitle}</p>
        </div>

        {/* Player Card */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl shadow-2xl overflow-hidden mb-8 text-primary-foreground">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-destructive/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Vinyl */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-foreground to-foreground/70 flex items-center justify-center shadow-2xl ring-8 ring-primary-foreground/10 ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                  style={{ animation: isPlaying ? 'spin 6s linear infinite' : 'none' }}
                >
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-primary-foreground/10 flex items-center justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-destructive to-destructive/70 flex items-center justify-center shadow-inner">
                      <Disc3 size={36} className="text-primary-foreground/80" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info + controls */}
              <div className="flex-1 w-full text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
                  {isPlaying ? t.civic.playing : t.civic.select}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black mb-1 leading-tight">{tracks[currentIdx].title}</h2>
                <p className="text-sm opacity-80 mb-6">{tracks[currentIdx].artist}</p>

                {/* Progress */}
                <div className="mb-5">
                  <div
                    className="group w-full h-2 bg-primary-foreground/20 rounded-full cursor-pointer overflow-hidden"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-primary-foreground rounded-full transition-all relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-mono opacity-80">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsRepeating(!isRepeating)}
                    className={`p-2.5 rounded-full transition-all ${
                      isRepeating
                        ? 'bg-destructive text-primary-foreground shadow-lg'
                        : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
                    }`}
                    title={t.civic.repeat}
                  >
                    <Repeat size={18} />
                  </button>
                  <button
                    onClick={() => currentIdx > 0 && loadTrack(currentIdx - 1)}
                    disabled={currentIdx === 0}
                    className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <SkipBack size={22} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-foreground text-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
                  </button>
                  <button
                    onClick={() => currentIdx < tracks.length - 1 && loadTrack(currentIdx + 1)}
                    disabled={currentIdx === tracks.length - 1}
                    className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <SkipForward size={22} />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>

                {/* Volume slider */}
                <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                  <Volume2 size={14} className="opacity-70" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-32 sm:w-40 accent-primary-foreground h-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-card rounded-3xl shadow-md border border-border p-6">
          <h3 className="font-extrabold text-lg text-foreground mb-4 flex items-center gap-2">
            <Music size={18} className="text-primary" />
            {t.civic.all}
          </h3>
          <div className="space-y-2">
            {tracks.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => loadTrack(idx)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                  currentIdx === idx
                    ? 'bg-primary/10 border border-primary/20 shadow-sm'
                    : 'hover:bg-muted border border-transparent'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                  currentIdx === idx
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                }`}>
                  {currentIdx === idx && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className={`font-bold truncate ${currentIdx === idx ? 'text-primary' : 'text-foreground'}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                {currentIdx === idx && isPlaying && (
                  <div className="flex items-end gap-0.5 h-5">
                    <span className="w-1 bg-primary rounded-full animate-pulse" style={{ height: '60%' }} />
                    <span className="w-1 bg-primary rounded-full animate-pulse" style={{ height: '100%', animationDelay: '0.15s' }} />
                    <span className="w-1 bg-primary rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0.3s' }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <audio
          ref={audioRef}
          src={tracks[currentIdx].src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default RinconCivico;
