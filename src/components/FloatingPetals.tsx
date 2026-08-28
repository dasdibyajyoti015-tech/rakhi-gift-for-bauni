import React, { useMemo } from 'react';

interface PetalProps {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  emoji: string;
}

export const FloatingPetals: React.FC = () => {
  const petals = useMemo<PetalProps[]>(() => {
    const emojis = ['🌸', '✨', '🌺', '💖', '💮', '⭐'];
    const items: PetalProps[] = [];
    for (let i = 0; i < 18; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 14 + Math.random() * 16,
        rotation: Math.random() * 360,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute select-none opacity-40 transition-opacity"
          style={{
            left: `${petal.left}%`,
            top: '-5%',
            fontSize: `${petal.size}px`,
            animation: `fallAndSway ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          {petal.emoji}
        </span>
      ))}
      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(50vh) translateX(25px) rotate(180deg);
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
