import React, { useState } from 'react';
import { Heart, Laugh, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

interface RunawayButtonProps {
  onCaught?: () => void;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ onCaught }) => {
  const { config, goToStep, completeStep, discoverEasterEgg } = useRakhi();
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasCaught, setHasCaught] = useState<boolean>(false);

  const maxDodges = config.runawayButton.maxDodges || 4;
  const messages = config.runawayButton.evasiveMessages || [
    "Too slow! 😂",
    "Almost got me! 🏃‍♂️",
    "Nice try, sister! 💨",
    "Reflex test failed! 😜",
    "Okay okay, you win! ❤️"
  ];

  const handleEvade = () => {
    if (hasCaught || dodgeCount >= maxDodges) return;

    soundManager.playTone(800 + dodgeCount * 100, 'sawtooth', 0.1, 0.08);

    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);

    if (nextCount < maxDodges) {
      // Random jump offset within safe bounds
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 80;
      setPosition({ x: randomX, y: randomY });
    } else {
      // Return to center so it's easily clicked
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleClick = () => {
    if (dodgeCount < maxDodges) {
      handleEvade();
      return;
    }
    
    // Successfully caught!
    setHasCaught(true);
    soundManager.playFanfare();
    completeStep('letter');
    discoverEasterEgg('egg-runaway');
    onCaught?.();

    // Smooth automatic transition to final gift after a joyful beat
    setTimeout(() => {
      goToStep('gift');
    }, 1400);
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center relative min-h-[120px]">
      <div
        className="transition-transform duration-200 ease-out"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseEnter={handleEvade}
        onTouchStart={handleEvade}
      >
        <button
          onClick={handleClick}
          id="runaway-love-sibling-button"
          aria-label={hasCaught ? "Sibling Love Verified - Opening Gift" : "Catch Me to Open Your Rakhi Gift"}
          className={`px-7 py-3.5 rounded-full font-heading font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2.5 ${
            hasCaught
              ? 'bg-emerald-500 text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] scale-110 animate-bounce'
              : dodgeCount >= maxDodges
              ? 'bg-gradient-to-r from-[#FF91A4] via-rose-500 to-[#FFD700] text-white shadow-[0_10px_30px_rgba(255,145,164,0.5)] animate-pulse scale-105 ring-4 ring-white'
              : 'glass-panel text-[#5D4037] border-2 border-[#FF91A4]/60 hover:border-[#FF91A4] hover:bg-white/90 shadow-md'
          }`}
        >
          {hasCaught ? (
            <>
              <Gift className="w-5 h-5 text-white animate-spin" />
              <span>{config.runawayButton.successText || "I KNEW IT! OPENING GIFT... 🎁✨"}</span>
              <Sparkles className="w-5 h-5 text-yellow-200 animate-pulse" />
            </>
          ) : dodgeCount >= maxDodges ? (
            <>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-bounce" />
              <span>✨ CLICK ME NOW TO CLAIM YOUR GIFT! 🎁❤️</span>
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 text-[#FF91A4] fill-[#FF91A4]" />
              <span>
                {dodgeCount > 0
                  ? messages[dodgeCount % messages.length]
                  : "🏃‍♂️ Catch Me to Unlock Your Rakhi Gift! 🎁"}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Playful hint text */}
      {!hasCaught && (
        <span className="text-xs text-[#5D4037]/70 font-sans-body mt-2.5 flex items-center gap-1.5 font-medium">
          <Laugh className="w-3.5 h-3.5 text-[#D4AF37]" />
          {dodgeCount === 0
            ? "Try to catch this sneaky button! 😜"
            : dodgeCount < maxDodges
            ? `Dodged ${dodgeCount}/${maxDodges} times! Keep trying! 💨`
            : "I surrender! Click the button to proceed to the Grand Finale! 🏆"}
        </span>
      )}
    </div>
  );
};
