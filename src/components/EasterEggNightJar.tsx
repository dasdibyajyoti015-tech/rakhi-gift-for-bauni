import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, Heart, Star, Moon } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';

export const EasterEggNightJar: React.FC = () => {
  const { isNightJarOpen, setIsNightJarOpen, discoverEasterEgg, config } = useRakhi();

  useEffect(() => {
    if (isNightJarOpen) {
      discoverEasterEgg('egg-nightjar');
    }
  }, [isNightJarOpen, discoverEasterEgg]);

  if (!isNightJarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0D1B] text-amber-100 flex flex-col items-center justify-between p-6 sm:p-10 overflow-y-auto animate-fade-in">
      {/* Starry background sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between z-10">
        <button
          onClick={() => setIsNightJarOpen(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md text-sm font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Surprise
        </button>
        <span className="text-xs text-indigo-300 flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-700/50 px-3 py-1.5 rounded-full">
          <Moon className="w-3.5 h-3.5 text-yellow-300" /> Hidden Midnight Sanctuary
        </span>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center my-auto py-8 max-w-lg z-10">
        <div className="relative mb-6">
          <Moon className="w-12 h-12 text-yellow-200 fill-yellow-200/40 animate-pulse-subtle" />
          <Star className="w-5 h-5 text-amber-300 absolute -top-2 -right-4 animate-bounce" />
          <Sparkles className="w-5 h-5 text-rose-300 absolute -bottom-2 -left-4 animate-pulse" />
        </div>

        <h2 className="font-serif-display text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-indigo-200 font-bold mb-3">
          Psst... You found the hidden page! 🌙✨
        </h2>

        <p className="text-indigo-200 text-sm sm:text-base mb-8 max-w-md font-light leading-relaxed">
          Behind all the jokes, bickering, and stolen snacks... you really are the best sister in the universe, {config.nickname}! ❤️
        </p>

        {/* Glowing Wish Jar Vector Graphic */}
        <div className="relative group cursor-pointer" onClick={() => discoverEasterEgg('egg-nightjar')}>
          {/* Jar glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 to-rose-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
          
          <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-[2.5rem] border-4 border-amber-200/60 bg-gradient-to-b from-indigo-900/40 via-amber-950/30 to-indigo-950/80 backdrop-blur-xl flex flex-col items-center justify-between p-5 shadow-[0_0_50px_rgba(251,191,36,0.35)]">
            {/* Jar Lid */}
            <div className="w-32 h-6 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 rounded-lg border-2 border-amber-400 shadow-md flex items-center justify-center">
              <span className="w-16 h-1 bg-amber-300/40 rounded-full"></span>
            </div>

            {/* Glowing Heart & Fireflies inside */}
            <div className="flex flex-col items-center justify-center my-auto relative">
              <div className="w-20 h-20 rounded-full bg-rose-500/30 blur-md absolute"></div>
              <Heart className="w-16 h-16 text-rose-400 fill-rose-400 animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
              <div className="absolute -top-3 -right-3 text-xs animate-ping">✨</div>
              <div className="absolute -bottom-2 -left-3 text-xs animate-pulse">⭐</div>
            </div>

            {/* Jar Tag */}
            <div className="bg-amber-100/90 text-amber-950 text-[11px] font-bold px-3 py-1 rounded-full shadow border border-amber-300">
              Infinite Sibling Wishes Jar 💌
            </div>
          </div>
        </div>

        <p className="text-xs text-amber-200/70 mt-6 italic">
          (Secret Easter Egg #5 unlocked • Keep this between us! 🤫)
        </p>
      </div>

      {/* Bottom Close */}
      <div className="z-10">
        <button
          onClick={() => setIsNightJarOpen(false)}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg hover:shadow-rose-500/40 hover:scale-105 transition-all"
        >
          Return to Sibling Roadmap ✨
        </button>
      </div>
    </div>
  );
};
