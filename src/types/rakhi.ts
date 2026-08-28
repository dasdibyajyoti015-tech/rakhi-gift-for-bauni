export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation?: string;
  reactionCorrect?: string;
  reactionWrong?: string;
}

export interface QuizScoreTier {
  minScore: number;
  maxScore: number;
  title: string;
  message: string;
  badge: string;
  emoji: string;
}

export interface SisterAward {
  id: string;
  title: string;
  category?: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  emoji: string;
  badgeText?: string;
}

export interface MemoryItem {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  location?: string;
  emoji?: string;
  caption?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  image: string;
  date?: string;
  category?: string;
}

export interface MysteryBoxItem {
  id: string;
  boxNumber: number;
  title: string;
  message: string;
  isSpecial?: boolean;
  subMessage?: string;
  colorGradient?: string;
}

export interface EasterEgg {
  id: string;
  name: string;
  hint: string;
  revealMessage: string;
  icon?: string;
}

export interface RakhiConfig {
  sisterName: string;
  nickname: string;
  siblingName: string;
  relationship: string; // "brother" | "sister" | "sibling"
  secretCode: string;
  secretHint: string;
  
  intro: {
    badge: string;
    title: string;
    subtitle: string;
    unlockButtonText: string;
    footerHint: string;
  };

  unlockSuccess: {
    title: string;
    subtitle: string;
    buttonText: string;
  };

  quiz: QuizQuestion[];
  quizResults: QuizScoreTier[];

  awards: SisterAward[];
  awardsFooterQuote: string;

  memories: MemoryItem[];
  gallery: GalleryPhoto[];

  mysteryBoxes: MysteryBoxItem[];

  thingsINeverSay: string[];

  letter: {
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postscript?: string;
  };

  runawayButton: {
    initialText: string;
    successText: string;
    evasiveMessages: string[];
    maxDodges: number;
  };

  finalGift: {
    badge: string;
    title: string;
    subtitle: string;
    boxCta: string;
    giftTitle: string;
    giftMessage: string;
    voucherCode?: string;
    giftNote?: string;
    hugButtonText: string;
    hugResponseText: string;
    signature: string;
  };

  easterEggs: EasterEgg[];

  music: {
    enabled: boolean;
    src: string;
    volume: number;
    title: string;
  };
}
