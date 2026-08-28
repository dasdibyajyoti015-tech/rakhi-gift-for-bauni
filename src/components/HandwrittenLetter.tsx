import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Stamp, Scroll, Lock, Gift } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { RunawayButton } from './RunawayButton';

export const HandwrittenLetter: React.FC = () => {
  const { config, goToStep, completeStep, isStepCompleted, showToast } = useRakhi();
  const [isCaught, setIsCaught] = useState<boolean>(() => isStepCompleted('letter'));

  const letter = config.letter;
  const isLetterDone = isCaught || isStepCompleted('letter');

  const handleProceedClick = () => {
    if (!isLetterDone) {
      showToast('🏃‍♀️ Catch and click the escaping button above to unlock your gift!', 'lock');
      return;
    }
    completeStep('letter');
    goToStep('gift');
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
        <span className="text-xs font-bold text-[#5D4037] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-2xs">
          📝 Sibling Letter
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#5D4037] text-xs font-bold mb-2 shadow-xs">
          <Scroll className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>A Letter for {config.sisterName}</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Dear {config.nickname || config.sisterName} 💌
        </h2>
      </div>

      {/* Parchment Styled Letter Container with Frosted Glass Glow */}
      <div className="w-full glass-panel-strong rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(255,182,193,0.25)] border-2 border-white/90 relative overflow-hidden mb-8 transform rotate-[-0.3deg] transition-transform hover:rotate-0 bg-white/95">
        {/* Subtle Decorative Floral Background corners */}
        <div className="absolute top-2 left-3 text-2xl opacity-40 select-none">🌸</div>
        <div className="absolute top-2 right-3 text-2xl opacity-40 select-none">🌺</div>
        <div className="absolute bottom-2 left-3 text-2xl opacity-40 select-none">💮</div>

        {/* Date on top right */}
        <div className="text-right text-xs sm:text-sm font-handwriting text-[#5D4037]/70 mb-4 font-bold">
          {letter.date}
        </div>

        {/* Salutation */}
        <div className="font-handwriting text-2xl sm:text-3xl font-bold text-[#5D4037] mb-4">
          {letter.salutation}
        </div>

        {/* Paragraphs */}
        <div className="space-y-4 text-[#5D4037] font-handwriting text-xl sm:text-2xl leading-relaxed tracking-wide">
          {letter.paragraphs.map((p, idx) => (
            <p key={idx} className="indent-4 sm:indent-6">
              {p}
            </p>
          ))}
        </div>

        {/* Closing & Signature */}
        <div className="mt-8 pt-4 border-t border-[#FFDAB9]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-handwriting text-xl text-[#5D4037]/80">
              {letter.closing}
            </p>
            <p className="font-handwriting text-3xl font-bold text-[#FF91A4] mt-1">
              {letter.signature}
            </p>
          </div>

          {/* Sibling Wax Seal Stamp */}
          <div className="flex items-center gap-2 bg-gradient-to-tr from-[#FF91A4] to-[#E57373] text-white px-4 py-2 rounded-2xl shadow-md border-2 border-white transform rotate-[-4deg]">
            <div className="w-8 h-8 rounded-full bg-white/30 border border-white/60 flex items-center justify-center font-serif-display font-bold text-base text-white">
              {config.siblingName.charAt(0)}
            </div>
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold tracking-widest block text-white/80">
                Official Rakhi
              </span>
              <span className="text-xs font-bold font-serif-display text-white">
                Seal of Love
              </span>
            </div>
          </div>
        </div>

        {/* Post Script note if available */}
        {letter.postscript && (
          <div className="mt-6 p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 font-handwriting text-lg sm:text-xl text-[#5D4037] italic">
            {letter.postscript}
          </div>
        )}
      </div>

      {/* Playful Escaping Interactive Button (Gateway to Gift) */}
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5D4037]/70 bg-white/60 px-3.5 py-1 rounded-full border border-white/80 mb-2 shadow-2xs">
          <Gift className="w-3.5 h-3.5 text-[#FF91A4]" />
          <span>Catch the button below to unlock your gift!</span>
        </div>
        <RunawayButton onCaught={() => setIsCaught(true)} />
      </div>

      {/* Next Step CTA to Final Gift */}
      <button
        onClick={handleProceedClick}
        id="letter-next-step-button"
        className={`px-8 py-4 rounded-full font-heading font-extrabold text-sm sm:text-base transition-all flex items-center gap-2 ${
          isLetterDone
            ? 'bg-[#FF91A4] hover:bg-[#ff7b92] text-white shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 active:scale-95'
            : 'bg-white/60 text-[#5D4037]/60 border-2 border-dashed border-[#FF91A4]/50 hover:bg-white hover:text-[#5D4037] cursor-pointer'
        }`}
      >
        {isLetterDone ? (
          <>
            <Sparkles className="w-5 h-5" />
            <span>OPEN YOUR RAKHI GIFT 🎁✨</span>
            <ArrowRight className="w-5 h-5" />
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 text-gray-400" />
            <span>CATCH THE ESCAPING BUTTON TO UNLOCK GIFT 🏃‍♂️</span>
          </>
        )}
      </button>
    </div>
  );
};
