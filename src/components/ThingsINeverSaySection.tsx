import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

export const ThingsINeverSaySection: React.FC = () => {
  const { config, goToStep, completeStep } = useRakhi();
  const [revealedIndex, setRevealedIndex] = useState<number>(config.thingsINeverSay.length);

  // Non-interaction page: automatically mark completed on visit
  useEffect(() => {
    completeStep('things');
  }, [completeStep]);

  const messages = config.thingsINeverSay;

  const handleCardClick = (idx: number) => {
    soundManager.playTone(550 + idx * 40, 'sine', 0.2, 0.12);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => goToStep('roadmap')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Roadmap
        </button>
        <span className="text-xs font-bold text-[#FF91A4] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-2xs">
          💌 Sibling Truths
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#5D4037] text-xs font-bold mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#FF91A4] text-[#FF91A4]" />
          <span>Straight from the Heart</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Things I Never Say Out Loud ❤️
        </h2>
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body max-w-md mx-auto mt-2">
          Because Indian siblings only express true emotions once a year on Rakhi! 😂
        </p>
      </div>

      {/* Stack of Heartfelt Parchment Cards with Frosted Glass */}
      <div className="w-full space-y-4 mb-8">
        {messages.map((text, index) => {
          const num = String(index + 1).padStart(2, '0');
          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="glass-panel-card p-5 sm:p-6 shadow-[0_8px_25px_rgba(255,182,193,0.18)] hover:shadow-[0_15px_35px_rgba(255,182,193,0.3)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-start gap-4 sm:gap-5 group"
            >
              {/* Number Badge Pill */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#FF91A4] to-[#FFB6C1] text-white flex items-center justify-center font-heading font-extrabold text-sm sm:text-base shadow-sm shrink-0 group-hover:scale-105 transition-transform border border-white">
                {num}
              </div>

              {/* Heartfelt Note Text */}
              <div className="flex-1">
                <p className="text-sm sm:text-base text-[#5D4037] font-sans-body leading-relaxed font-medium">
                  {text}
                </p>
              </div>

              <span className="text-[#FF91A4]/60 group-hover:text-[#FF91A4] transition-colors text-lg">
                💖
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Step CTA */}
      <button
        onClick={() => {
          completeStep('things');
          goToStep('letter');
        }}
        id="things-next-step-button"
        className="px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <span>READ HANDWRITTEN LETTER 📝</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
