import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';

export const MusicPlayer: React.FC = () => {
  const { isMusicPlaying, toggleMusic, config } = useRakhi();

  return (
    <div className="relative group">
      <button
        onClick={toggleMusic}
        id="music-toggle-button"
        aria-label={isMusicPlaying ? "Mute Background Music" : "Play Background Music"}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs transition-all duration-300 backdrop-blur-md border ${
          isMusicPlaying
            ? 'bg-[#FF91A4] text-white border-white shadow-[#FF91A4]/30'
            : 'bg-white/70 text-[#5D4037] border-white/80 hover:bg-white/90'
        }`}
      >
        {isMusicPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Music: ON</span>
            <div className="flex items-center gap-0.5 ml-0.5">
              <span className="w-1 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-3.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-2 bg-white rounded-full animate-bounce"></span>
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5" />
            <span>Music: OFF 🎵</span>
          </>
        )}
      </button>

      {/* Hover Info Tooltip */}
      <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block w-48 p-2.5 glass-panel text-[11px] text-[#5D4037] shadow-lg border border-white/90 z-50 pointer-events-none bg-white/95">
        <p className="font-medium text-[#FF91A4] flex items-center gap-1 mb-0.5">
          <Music className="w-3 h-3" /> {config.music.title}
        </p>
        <p className="text-[10px] text-[#5D4037]/70">
          Place your MP3 at <code className="text-[#FF91A4]">/audio/rakhi.mp3</code> or enjoy built-in ambient melodies!
        </p>
      </div>
    </div>
  );
};
