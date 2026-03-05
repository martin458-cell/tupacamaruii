import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Repeat, Volume2, Square, Music } from 'lucide-react';
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
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

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

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden mb-8">
          {/* Now Playing */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
            <p className="text-xs font-bold opacity-80 mb-1">
              {isPlaying ? t.civic.playing : t.civic.select}
            </p>
            <h2 className="text-2xl font-black">{tracks[currentIdx].title}</h2>
            <p className="text-sm opacity-80">{tracks[currentIdx].artist}</p>
          </div>

          {/* Controls */}
          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="w-full h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsRepeating(!isRepeating)}
                className={`p-2 rounded-full transition-colors ${isRepeating ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'}`}
                title={t.civic.repeat}
              >
                <Repeat size={20} />
              </button>
              <button
                onClick={() => currentIdx > 0 && loadTrack(currentIdx - 1)}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                <SkipBack size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              <button
                onClick={() => currentIdx < tracks.length - 1 && loadTrack(currentIdx + 1)}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                <SkipForward size={24} />
              </button>
              <button
                onClick={stopAll}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                title={t.civic.stop}
              >
                <Square size={20} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Volume2 size={16} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-32 accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-card rounded-3xl shadow-md border border-border p-6">
          <h3 className="font-extrabold text-lg text-foreground mb-4">{t.civic.all}</h3>
          <div className="space-y-2">
            {tracks.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => loadTrack(idx)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  currentIdx === idx
                    ? 'bg-primary/10 border border-primary/20 shadow-sm'
                    : 'hover:bg-muted'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  currentIdx === idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentIdx === idx && isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
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
        />
      </div>
    </div>
  );
};

export default RinconCivico;
