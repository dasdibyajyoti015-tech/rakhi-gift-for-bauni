import React, { useState } from 'react';
import { Lock, Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

export const LandingPage: React.FC = () => {
  const { config, goToStep, discoverEasterEgg } = useRakhi();
  const [rakhiTapCount, setRakhiTapCount] = useState(0);

  const handleRakhiTap = () => {
    soundManager.playTone(700 + rakhiTapCount * 80, 'sine', 0.15, 0.1);
    const newCount = rakhiTapCount + 1;
    setRakhiTapCount(newCount);
    if (newCount >= 5) {
      discoverEasterEgg('egg-logo');
      soundManager.playEasterEggChime();
    }
  };

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center p-4 sm:p-8 relative">
      {/* Decorative Traditional Rakhi Garlands / Floral Top Accents */}
      <div className="w-full max-w-xl flex justify-between items-start pointer-events-none -mt-4 mb-2 select-none">
        <div className="flex flex-col items-center opacity-80 animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-0.5 h-12 bg-amber-400"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center shadow-md border-2 border-white text-xs">
            🪢
          </div>
          <div className="w-0.5 h-6 bg-rose-300"></div>
          <span className="text-amber-500 text-xs">🌸</span>
        </div>

        <div className="flex flex-col items-center opacity-80 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-0.5 h-14 bg-rose-400"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-yellow-400 flex items-center justify-center shadow-md border-2 border-white text-xs">
            🏵️
          </div>
          <div className="w-0.5 h-5 bg-amber-300"></div>
          <span className="text-rose-500 text-xs">✨</span>
        </div>
      </div>

      {/* Main Hero Card with Frosted Glass styling */}
      <div className="w-full max-w-lg glass-panel p-6 sm:p-10 shadow-[0_20px_50px_rgba(255,182,193,0.25)] text-center relative overflow-hidden transition-all">
        {/* Subtle decorative background blur shapes */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#FFDAB9]/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#FFB6C1]/40 rounded-full blur-2xl pointer-events-none"></div>

        {/* Rakhi Festive Badge (Interactive Easter Egg Trigger) */}
        <div className="inline-flex items-center justify-center mb-4">
          <button
            onClick={handleRakhiTap}
            id="rakhi-floating-badge"
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#5D4037] text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-transform"
            title="Tap me!"
          >
            <span className="text-sm group-hover:rotate-45 transition-transform">🌸</span>
            <span className="tracking-wide">{config.intro.badge}</span>
            <span className="text-[10px] bg-[#FF91A4] text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
              2026
            </span>
          </button>
        </div>

        {/* Salutation & Headline */}
        <h1 className="font-serif-display text-4xl sm:text-5xl text-[#5D4037] font-bold tracking-tight mb-2">
          Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF91A4] via-[#f06292] to-[#D4AF37]">{config.sisterName}</span>! 👀
        </h1>

        <p className="text-[#5D4037]/80 text-sm sm:text-base font-sans-body max-w-sm mx-auto mb-6 leading-relaxed">
          {config.intro.subtitle}
        </p>

        {/* Visual Artwork Box matching reference art (Sibling bond & Rakhi sweets) */}
        <div className="relative mx-auto my-6 max-w-xs">
          <div className="w-full h-56 sm:h-64 rounded-3xl glass-panel-subtle p-4 border border-white/70 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            {/* Cute Sibling Illustration SVG */}
            <div className="relative flex items-center justify-center gap-4 z-10">
              {/* Brother avatar */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/80 border-2 border-[#FFDAB9] shadow-md flex items-center justify-center text-3xl">
                  👦
                </div>
                <span className="text-[11px] font-bold text-[#5D4037] mt-1">{config.siblingName}</span>
              </div>

              {/* Central Rakhi Bond / Thread */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#FF91A4] shadow-md flex items-center justify-center text-white text-lg animate-pulse-subtle">
                  🪢
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-[#FFDAB9] via-[#FFD700] to-[#FF91A4] rounded-full my-1"></div>
                <span className="text-[10px] font-semibold text-[#FF91A4]">Bond of Love</span>
              </div>

              {/* Sister avatar */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/80 border-2 border-[#FFB6C1] shadow-md flex items-center justify-center text-3xl">
                  👧
                </div>
                <span className="text-[11px] font-bold text-[#5D4037] mt-1">{config.nickname || config.sisterName}</span>
              </div>
            </div>

            {/* Sweets & Gift box props */}
            <div className="flex items-center gap-3 mt-3 z-10">
              <span className="text-xl" title="Sweets / Ladoo">🍬</span>
              <span className="text-2xl animate-bounce" title="Gift Box">🎁</span>
              <span className="text-xl" title="Rakhi Sweets">🥮</span>
            </div>

            {/* Decorative soft sparkles */}
            <div className="absolute top-3 left-4 text-xs text-[#FFD700] animate-pulse">✨</div>
            <div className="absolute bottom-3 right-4 text-xs text-[#FF91A4] animate-pulse">💖</div>
          </div>
        </div>

        {/* CTA Unlock Button */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={() => goToStep('unlock')}
            id="unlock-surprise-button"
            className="w-full sm:w-auto min-w-[260px] px-8 py-4 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-base shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:shadow-[0_15px_30px_rgba(255,145,164,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <Lock className="w-5 h-5" />
            <span>{config.intro.unlockButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-xs text-[#5D4037]/70 font-sans-body flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-[#FF91A4] fill-[#FF91A4]" />
            <span>{config.intro.footerHint}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
