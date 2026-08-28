import React from 'react';
import { Sparkles, Trophy, CheckCircle2, Lock, X, HelpCircle, Moon } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';

export const EasterEggTracker: React.FC = () => {
  const {
    config,
    foundEasterEggs,
    isEasterEggModalOpen,
    setIsEasterEggModalOpen,
    setIsNightJarOpen
  } = useRakhi();

  const total = config.easterEggs.length;
  const count = foundEasterEggs.length;
  const isAllFound = count >= total;

  return (
    <>
      <button
        onClick={() => setIsEasterEggModalOpen(true)}
        id="easter-egg-indicator-button"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-2xs transition-all duration-300 backdrop-blur-md border ${
          isAllFound
            ? 'bg-[#FF91A4] text-white border-white animate-pulse'
            : 'bg-white/70 text-[#5D4037] border-white/80 hover:bg-white/90'
        }`}
        title="Hidden Sibling Secrets Tracker"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FF91A4]" />
        <span className="font-heading tracking-wide">
          {count === 0 ? '🧩 Secrets' : `🧩 ${count} / ${total}`}
        </span>
      </button>

      {/* Modal Dialog */}
      {isEasterEggModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in"
          onClick={() => setIsEasterEggModalOpen(false)}
        >
          <div
            className="glass-panel max-w-md w-full p-6 shadow-2xl border border-white/90 relative overflow-hidden bg-white/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background sparkle accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFDAB9]/40 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#FFB6C1]/40 rounded-full blur-2xl opacity-60"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-white/80 text-[#FF91A4] flex items-center justify-center border border-white">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#5D4037] text-lg">
                    Hidden Easter Eggs & Secrets
                  </h3>
                  <p className="text-xs text-[#5D4037]/70">
                    Found {count} of {total} sibling surprises
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEasterEggModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#5D4037] flex items-center justify-center transition-colors border border-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Secret Hunter Status Badge */}
            {isAllFound ? (
              <div className="mb-4 p-3 bg-gradient-to-r from-[#FFD700] to-[#FF91A4] text-white rounded-2xl flex items-center gap-3 shadow-md border border-white">
                <span className="text-2xl">🏆</span>
                <div>
                  <h4 className="font-bold text-sm">SECRET HUNTER MASTER!</h4>
                  <p className="text-xs text-white/90">You discovered every single hidden surprise on the site!</p>
                </div>
              </div>
            ) : (
              <div className="mb-4 p-3 bg-white/70 backdrop-blur-sm border border-white/90 rounded-2xl flex items-center justify-between text-xs text-[#5D4037]">
                <span className="font-medium">Can you hunt and unlock all 5 secrets? 👀</span>
                <span className="font-bold text-[#FF91A4]">{Math.round((count / total) * 100)}%</span>
              </div>
            )}

            {/* List of Easter Eggs */}
            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {config.easterEggs.map((egg) => {
                const isFound = foundEasterEggs.includes(egg.id);
                return (
                  <div
                    key={egg.id}
                    className={`p-3.5 rounded-2xl transition-all border ${
                      isFound
                        ? 'bg-white/85 border-white text-[#5D4037] shadow-2xs'
                        : 'bg-white/50 border-white/60 text-[#5D4037]/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {isFound ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-[#5D4037]/40 shrink-0" />
                        )}
                        <h4 className="font-heading font-semibold text-sm">
                          {egg.name}
                        </h4>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isFound ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isFound ? 'Found ✨' : 'Locked'}
                      </span>
                    </div>

                    <p className="text-xs mt-1.5 pl-6 text-[#5D4037]/80 leading-relaxed">
                      {isFound ? (
                        <span className="font-medium text-[#FF91A4]">{egg.revealMessage}</span>
                      ) : (
                        <span className="italic flex items-center gap-1 text-[#5D4037]/60">
                          <HelpCircle className="w-3 h-3 shrink-0" /> {egg.hint}
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Night Jar Quick Link */}
            <div className="mt-4 pt-3 border-t border-white/80 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsEasterEggModalOpen(false);
                  setIsNightJarOpen(true);
                }}
                className="text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] flex items-center gap-1.5 transition-colors"
              >
                <Moon className="w-3.5 h-3.5 text-[#FFD700]" /> Open Secret Starry Wish Room ✨
              </button>
              <button
                onClick={() => setIsEasterEggModalOpen(false)}
                className="px-4 py-1.5 bg-[#FF91A4] hover:bg-[#ff7b92] text-white rounded-full text-xs font-bold transition-colors shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
