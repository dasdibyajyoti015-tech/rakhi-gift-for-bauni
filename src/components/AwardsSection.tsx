import React, { useEffect } from 'react';
import { Trophy, Star, ArrowLeft, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

export const AwardsSection: React.FC = () => {
  const { config, goToStep, completeStep } = useRakhi();

  // Non-interaction page: automatically mark completed on visit
  useEffect(() => {
    completeStep('awards');
  }, [completeStep]);

  const handleCardClick = (title: string) => {
    soundManager.playTone(600, 'triangle', 0.2, 0.15);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => goToStep('roadmap')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Roadmap
        </button>
        <span className="text-xs font-bold text-[#5D4037] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-2xs">
          🏆 Sister Honors
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#5D4037] text-xs font-bold mb-3 shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Annual Sibling Hall of Fame</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Sister Achievement Awards 🏆
        </h2>
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body max-w-md mx-auto mt-2">
          Recognizing {config.sisterName}'s lifetime achievements in annoyance, love, and snack theft.
        </p>
      </div>

      {/* Awards Grid with Frosted Glass Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {config.awards.map((award, index) => (
          <div
            key={award.id}
            onClick={() => handleCardClick(award.title)}
            className="glass-panel-card p-5 sm:p-6 shadow-[0_10px_30px_rgba(255,182,193,0.2)] hover:shadow-[0_15px_35px_rgba(255,182,193,0.3)] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/80 border border-white/90 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
                  {award.emoji}
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] font-mono">
                    {award.category || `Award #${index + 1}`}
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#5D4037] leading-tight">
                    {award.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#5D4037]/80 font-sans-body leading-relaxed my-2">
              {award.description}
            </p>

            {/* Bottom Badge */}
            <div className="mt-3 pt-3 border-t border-white/60 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#FFD700]">
                <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
              </div>
              <span className="text-[10px] font-bold text-[#5D4037] bg-white/70 px-2.5 py-0.5 rounded-full border border-white/80">
                {award.badgeText || 'Official Medal'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Frosted Gold Quote Banner */}
      <div className="w-full glass-panel-strong text-[#5D4037] rounded-2xl p-4 shadow-md text-center mb-8 border border-white/90 flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-[#D4AF37] shrink-0" />
        <span className="font-heading font-bold text-sm sm:text-base text-[#5D4037]">
          {config.awardsFooterQuote}
        </span>
        <Trophy className="w-5 h-5 text-[#D4AF37] shrink-0" />
      </div>

      {/* Next Step CTA */}
      <button
        onClick={() => {
          completeStep('awards');
          goToStep('memories');
        }}
        id="awards-next-step-button"
        className="px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <span>CONTINUE TO OUR MEMORIES 📸</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
