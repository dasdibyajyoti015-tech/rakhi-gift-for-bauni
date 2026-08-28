import React, { useState, useRef, useEffect } from 'react';
import { Lock, KeyRound, Sparkles, HelpCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

export const UnlockScreen: React.FC = () => {
  const { config, unlockSurprise, goToStep } = useRakhi();
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const codeLength = 4;
  const expectedCode = (config.secretCode || '2007').trim();

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    setErrorMessage(null);
    const char = value.slice(-1);
    const newPin = [...pin];
    newPin[index] = char;
    setPin(newPin);

    // Play subtle keystroke tone
    soundManager.playTone(400 + index * 60, 'sine', 0.1, 0.1);

    // Auto-advance
    if (char && index < codeLength - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entered = pin.join('');

    if (entered.toLowerCase() === expectedCode.toLowerCase() || entered === expectedCode.slice(0, 4)) {
      setIsSuccess(true);
      setErrorMessage(null);
      soundManager.playUnlockSound();
      setTimeout(() => {
        unlockSurprise();
      }, 1200);
    } else {
      soundManager.playWrongSound();
      setIsShaking(true);
      setErrorMessage("Hmm... nice try 😂 That's not the secret code!");
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  const handleQuickFill = () => {
    const chars = expectedCode.padEnd(4, '0').slice(0, 4).split('');
    setPin(chars);
    soundManager.playTone(600, 'sine', 0.15, 0.15);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Back button */}
      <div className="w-full max-w-md flex justify-start mb-4">
        <button
          onClick={() => goToStep('landing')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-white/80 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Landing
        </button>
      </div>

      {/* Main Unlock Card with Frosted Glass Theme */}
      <div className={`w-full max-w-md glass-panel p-6 sm:p-10 shadow-[0_20px_50px_rgba(255,182,193,0.25)] text-center relative overflow-hidden transition-all duration-300 ${
        isShaking ? 'animate-bounce' : ''
      }`}>
        {/* Decorative Leaf Silhouette SVGs */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none text-[#FF91A4]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M20,80 Q40,40 80,20 Q60,60 20,80 Z" />
            <path d="M50,90 Q70,50 90,30 Q80,70 50,90 Z" />
          </svg>
        </div>

        {/* Lock Icon in Frosted Coral Circle */}
        <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FF91A4] to-[#FFB6C1] flex items-center justify-center shadow-lg shadow-[#FF91A4]/30 text-white mb-4">
          {isSuccess ? (
            <CheckCircle2 className="w-8 h-8 animate-bounce text-[#FFD700]" />
          ) : (
            <Lock className="w-7 h-7" />
          )}
        </div>

        {/* Title */}
        <h2 className="font-serif-display text-2xl sm:text-3xl text-[#5D4037] font-bold mb-1">
          Enter the Secret Code 🌸
        </h2>

        {/* Hint text */}
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body mb-6 px-2">
          (Hint: {config.secretHint || 'Something only you and your sibling know 👀'})
        </p>

        {/* PIN Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2.5 sm:gap-3.5">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                id={`pin-input-${index}`}
                aria-label={`Digit ${index + 1}`}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold font-heading rounded-2xl bg-white/70 backdrop-blur-sm border-2 transition-all outline-none shadow-sm ${
                  digit
                    ? 'border-[#FF91A4] text-[#5D4037] shadow-[#FF91A4]/20 scale-105 bg-white/90'
                    : 'border-white/80 text-[#5D4037] hover:border-[#FFB6C1]'
                } focus:border-[#FF91A4] focus:ring-4 focus:ring-[#FFB6C1]/30`}
              />
            ))}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50/80 backdrop-blur-sm border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold animate-fade-in">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="p-3 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-bold flex items-center justify-center gap-2 animate-bounce">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>🎉 Code Accepted! Opening surprise journey...</span>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            id="unlock-submit-button"
            disabled={isSuccess}
            className={`w-full py-4 rounded-2xl font-heading font-bold text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isSuccess
                ? 'bg-emerald-500 text-white shadow-emerald-200'
                : 'bg-[#FF91A4] hover:bg-[#ff7b92] text-white shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <KeyRound className="w-5 h-5" />
            <span>{isSuccess ? 'UNLOCKED ✨' : 'UNLOCK SURPRISE ✨'}</span>
          </button>
        </form>

        {/* Helpful Assistant Link for Brother / Testing */}
        <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-between text-xs text-[#5D4037]/75">
          <button
            type="button"
            onClick={() => setShowHintModal(true)}
            className="hover:text-[#FF91A4] font-medium flex items-center gap-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Need a clue?
          </button>

          <button
            type="button"
            onClick={handleQuickFill}
            className="text-[11px] underline text-[#5D4037]/60 hover:text-[#FF91A4] transition-colors"
            title="Auto-fill code for testing"
          >
            (Secret bypass)
          </button>
        </div>
      </div>

      {/* Clue Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel max-w-xs w-full p-6 shadow-2xl border border-white/90 text-center bg-white/85">
            <span className="text-3xl mb-2 block">💡</span>
            <h4 className="font-heading font-bold text-[#5D4037] mb-2">Secret Code Clue</h4>
            <p className="text-xs text-[#5D4037]/80 mb-4 leading-relaxed">
              {config.secretHint || `Ask ${config.siblingName} for the secret code!`}
            </p>
            <div className="bg-white/90 border border-[#FFDAB9] p-2.5 rounded-xl text-xs font-mono font-bold text-[#5D4037] mb-4">
              Password is: {config.secretCode}
            </div>
            <button
              onClick={() => {
                handleQuickFill();
                setShowHintModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#FF91A4] hover:bg-[#ff7b92] text-white text-xs font-bold transition-colors"
            >
              Fill Code & Unlock
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
