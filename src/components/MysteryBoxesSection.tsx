import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Gift, Sparkles, CheckCircle2, X, Star } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { MysteryBoxItem } from '../types/rakhi';

export const MysteryBoxesSection: React.FC = () => {
  const { config, openedBoxes, openBox, goToStep, completeStep, showToast } = useRakhi();
  const [activeModalBox, setActiveModalBox] = useState<MysteryBoxItem | null>(null);

  const boxes = config.mysteryBoxes;

  const handleBoxClick = (box: MysteryBoxItem) => {
    openBox(box.boxNumber);
    setActiveModalBox(box);
  };

  const handleNextStep = () => {
    if (openedBoxes.length === 0) {
      showToast('🎁 Please open at least 1 mystery box first!', 'info');
      return;
    }
    completeStep('mystery');
    goToStep('things');
  };

  // Color schemes for boxes
  const boxStyles = [
    { bg: 'from-pink-400 to-rose-500', ribbon: 'bg-rose-200', text: 'text-rose-900', shadow: 'shadow-pink-200' },
    { bg: 'from-amber-400 to-orange-500', ribbon: 'bg-amber-200', text: 'text-amber-900', shadow: 'shadow-amber-200' },
    { bg: 'from-purple-400 to-indigo-500', ribbon: 'bg-purple-200', text: 'text-purple-900', shadow: 'shadow-purple-200' },
    { bg: 'from-emerald-400 to-teal-500', ribbon: 'bg-emerald-200', text: 'text-emerald-900', shadow: 'shadow-emerald-200' },
    { bg: 'from-sky-400 to-blue-500', ribbon: 'bg-sky-200', text: 'text-sky-900', shadow: 'shadow-sky-200' },
    { bg: 'from-yellow-400 via-amber-500 to-rose-500', ribbon: 'bg-yellow-200', text: 'text-amber-950', shadow: 'shadow-amber-300' }
  ];

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
          🎁 {openedBoxes.length} of {boxes.length} Unlocked
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#5D4037] text-xs font-bold mb-3 shadow-xs">
          <Gift className="w-3.5 h-3.5 text-[#FF91A4]" />
          <span>Interactive Surprise Boxes</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Pick a Box of Surprise 🎁
        </h2>
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body max-w-md mx-auto mt-2">
          Tap each mystery box to reveal a childhood memory, confession, or sibling coupon!
        </p>
      </div>

      {/* 3x2 Grid of Gift Boxes matching Reference Design with Frosted Glass Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {boxes.map((box, index) => {
          const isOpened = openedBoxes.includes(box.boxNumber);
          const style = boxStyles[index % boxStyles.length];

          return (
            <div
              key={box.id}
              onClick={() => handleBoxClick(box)}
              className={`relative flex flex-col items-center justify-center p-5 rounded-3xl cursor-pointer transition-all duration-300 group hover:-translate-y-1.5 glass-panel-card shadow-[0_8px_25px_rgba(255,182,193,0.18)] hover:shadow-[0_15px_35px_rgba(255,182,193,0.3)] ${
                box.isSpecial
                  ? 'border-2 border-[#FFD700]/70 bg-gradient-to-b from-white/90 to-[#FFF9F5]/90'
                  : ''
              }`}
            >
              {/* Special Star badge */}
              {box.isSpecial && (
                <div className="absolute -top-2.5 bg-gradient-to-r from-[#FFD700] to-[#FF91A4] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                  <Star className="w-3 h-3 fill-yellow-200" /> Special Box
                </div>
              )}

              {/* 3D Gift Box Vector Illustration */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center my-2">
                {/* Box base */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${style.bg} shadow-md flex items-center justify-center relative overflow-hidden transition-transform duration-300 ${
                    isOpened ? 'rotate-3 scale-95 opacity-90' : 'group-hover:scale-105 group-hover:rotate-[-2deg]'
                  }`}
                >
                  {/* Vertical Ribbon */}
                  <div className="absolute w-4 h-full bg-white/40 left-1/2 -translate-x-1/2"></div>
                  {/* Horizontal Ribbon */}
                  <div className="absolute h-4 w-full bg-white/40 top-1/2 -translate-y-1/2"></div>

                  {/* Ribbon Bow on top */}
                  <div className="absolute -top-2 w-8 h-4 bg-white/60 rounded-full border border-white/50 blur-[0.5px]"></div>

                  {/* Center Emblem / State */}
                  {isOpened ? (
                    <span className="text-2xl sm:text-3xl animate-bounce">💌</span>
                  ) : (
                    <span className="text-xl sm:text-2xl opacity-90 group-hover:scale-125 transition-transform">
                      {box.isSpecial ? '⭐' : '🎁'}
                    </span>
                  )}
                </div>

                {/* Opened Checkmark Tag */}
                {isOpened && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Box Label */}
              <span className="font-heading font-bold text-xs sm:text-sm text-[#5D4037] mt-1">
                {box.title || `Box ${box.boxNumber}`}
              </span>

              <span className="text-[10px] text-[#5D4037]/60 mt-0.5">
                {isOpened ? 'Read note ✓' : 'Tap to open ✨'}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[#5D4037]/70 font-sans-body mb-8 italic text-center">
        One box at a time... let the surprises unfold! ✨
      </p>

      {/* Next Step CTA */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleNextStep}
          id="mystery-boxes-next-button"
          className={`px-8 py-3.5 rounded-full font-heading font-bold text-sm transition-all flex items-center gap-2 ${
            openedBoxes.length > 0
              ? 'bg-[#FF91A4] hover:bg-[#ff7b92] text-white shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 active:scale-95'
              : 'bg-white/70 text-[#5D4037]/70 border-2 border-dashed border-[#FF91A4]/60 hover:bg-white hover:text-[#5D4037] shadow-sm'
          }`}
        >
          {openedBoxes.length > 0 ? (
            <>
              <span>CONTINUE TO THINGS I NEVER SAY 💌</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>🎁 OPEN AT LEAST 1 BOX TO PROCEED (0/{boxes.length})</span>
            </>
          )}
        </button>

        {openedBoxes.length === 0 && (
          <p className="text-[11px] text-[#5D4037]/60 italic font-sans-body">
            👆 Tap any box above to uncover its secret and unlock the next step!
          </p>
        )}
      </div>

      {/* Reveal Modal for Opened Box with Frosted Glass */}
      {activeModalBox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalBox(null)}
        >
          <div
            className="glass-panel max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/90 text-center relative overflow-hidden bg-white/95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalBox(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#5D4037] flex items-center justify-center transition-colors border border-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FFDAB9] to-[#FF91A4] mx-auto flex items-center justify-center text-3xl shadow-sm mb-3 text-white">
              {activeModalBox.isSpecial ? '⭐' : '🎁'}
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF91A4] bg-white/80 px-3 py-0.5 rounded-full border border-white">
              {activeModalBox.title}
            </span>

            <h3 className="font-serif-display text-xl sm:text-2xl text-[#5D4037] font-bold mt-2 mb-4">
              A Little Surprise for {config.nickname}!
            </h3>

            <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-white/90 mb-4 text-left shadow-2xs">
              <p className="text-sm sm:text-base text-[#5D4037] font-sans-body leading-relaxed font-medium">
                "{activeModalBox.message}"
              </p>
              {activeModalBox.subMessage && (
                <p className="text-xs text-[#FF91A4] font-sans-body mt-3 pt-2 border-t border-white/80 italic font-semibold">
                  💡 {activeModalBox.subMessage}
                </p>
              )}
            </div>

            <button
              onClick={() => setActiveModalBox(null)}
              className="w-full py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
            >
              Keep This Secret Safe ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
