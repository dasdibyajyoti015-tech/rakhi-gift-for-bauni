import React, { createContext, useContext, useState, useEffect } from 'react';
import { RakhiConfig } from '../types/rakhi';
import { defaultRakhiConfig } from '../config/rakhiConfig';
import { soundManager } from '../utils/sound';

export type JourneyStep =
  | 'landing'
  | 'unlock'
  | 'roadmap'
  | 'quiz'
  | 'awards'
  | 'memories'
  | 'gallery'
  | 'mystery'
  | 'things'
  | 'letter'
  | 'gift'
  | 'celebration';

export type ActiveTab =
  | 'home'
  | 'memories'
  | 'gallery'
  | 'letter'
  | 'about'
  | 'customize';

export const JOURNEY_ORDER: {
  step: JourneyStep;
  number: number;
  name: string;
}[] = [
  { step: 'quiz', number: 1, name: 'Mini Quiz' },
  { step: 'awards', number: 2, name: 'Sister Awards' },
  { step: 'memories', number: 3, name: 'Our Memories' },
  { step: 'mystery', number: 4, name: 'Mystery Boxes' },
  { step: 'things', number: 5, name: 'Things I Never Say' },
  { step: 'letter', number: 6, name: 'Handwritten Letter' },
  { step: 'gift', number: 7, name: 'Final Surprise' },
];

export interface ToastMessage {
  id: number;
  message: string;
  type: 'lock' | 'success' | 'info';
}

interface RakhiContextType {
  config: RakhiConfig;
  currentStep: JourneyStep;
  activeTab: ActiveTab;
  isUnlocked: boolean;
  completedSteps: JourneyStep[];
  quizAnswers: Record<string, number>;
  quizScore: number;
  quizCompleted: boolean;
  openedBoxes: number[];
  foundEasterEggs: string[];
  isMusicPlaying: boolean;
  isEasterEggModalOpen: boolean;
  isNightJarOpen: boolean;
  hugSent: boolean;
  toast: ToastMessage | null;

  isStepUnlocked: (step: JourneyStep) => boolean;
  isStepCompleted: (step: JourneyStep) => boolean;
  getNextActiveStep: () => JourneyStep;
  getPrerequisiteName: (step: JourneyStep) => string | null;

  goToStep: (step: JourneyStep) => boolean;
  completeStep: (step: JourneyStep) => void;
  setTab: (tab: ActiveTab) => boolean;
  unlockSurprise: () => void;
  answerQuizQuestion: (questionId: string, optionIndex: number) => void;
  resetQuiz: () => void;
  openBox: (boxNumber: number) => void;
  discoverEasterEgg: (eggId: string) => void;
  toggleMusic: () => void;
  setIsEasterEggModalOpen: (open: boolean) => void;
  setIsNightJarOpen: (open: boolean) => void;
  sendDigitalHug: () => void;
  showToast: (message: string, type?: 'lock' | 'success' | 'info') => void;
  clearToast: () => void;
  updateConfig: (newConfig: RakhiConfig) => void;
  resetToDefaultConfig: () => void;
  restartJourney: () => void;
}

const STORAGE_KEY = 'rakhi_2026_custom_config_v1';
const UNLOCK_STORAGE_KEY = 'rakhi_2026_unlocked_v1';
const COMPLETED_STEPS_KEY = 'rakhi_2026_completed_steps_v2';
const EGGS_STORAGE_KEY = 'rakhi_2026_eggs_v1';

const RakhiContext = createContext<RakhiContextType | undefined>(undefined);

export const RakhiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<RakhiConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return {
          ...defaultRakhiConfig,
          ...JSON.parse(saved),
        };
      }
    } catch {
      // fallback
    }

    return defaultRakhiConfig;
  });

  const [currentStep, setCurrentStep] =
    useState<JourneyStep>('landing');

  const [activeTab, setActiveTab] =
    useState<ActiveTab>('home');

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(UNLOCK_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [completedSteps, setCompletedSteps] =
    useState<JourneyStep[]>(() => {
      try {
        const saved = localStorage.getItem(COMPLETED_STEPS_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    });

  const [quizAnswers, setQuizAnswers] =
    useState<Record<string, number>>({});

  const [quizScore, setQuizScore] =
    useState<number>(0);

  const [quizCompleted, setQuizCompleted] =
    useState<boolean>(false);

  const [openedBoxes, setOpenedBoxes] =
    useState<number[]>([]);

  const [foundEasterEggs, setFoundEasterEggs] =
    useState<string[]>(() => {
      try {
        const saved = localStorage.getItem(EGGS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    });

  // IMPORTANT:
  // Start as false because the browser may block autoplay.
  const [isMusicPlaying, setIsMusicPlaying] =
    useState<boolean>(false);

  const [isEasterEggModalOpen, setIsEasterEggModalOpen] =
    useState<boolean>(false);

  const [isNightJarOpen, setIsNightJarOpen] =
    useState<boolean>(false);

  const [hugSent, setHugSent] =
    useState<boolean>(false);

  const [toast, setToast] =
    useState<ToastMessage | null>(null);

  // ============================================================
  // SYNC COMPLETED STEPS
  // ============================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        COMPLETED_STEPS_KEY,
        JSON.stringify(completedSteps)
      );
    } catch {
      // ignore
    }
  }, [completedSteps]);

  // ============================================================
  // SYNC EASTER EGGS
  // ============================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        EGGS_STORAGE_KEY,
        JSON.stringify(foundEasterEggs)
      );
    } catch {
      // ignore
    }
  }, [foundEasterEggs]);

  // ============================================================
  // BACKGROUND MUSIC
  // ============================================================
  //
  // 1. Try to play the uploaded Rakhi music immediately.
  // 2. NEVER use ambient/default music.
  // 3. If autoplay is blocked, wait for a real click.
  // 4. Do NOT use touchstart because it can consume the
  //    mobile interaction before the browser allows audio.
  //
  // NOTE:
  // Mobile browsers may still block unmuted autoplay.
  // This cannot be bypassed by JavaScript.
  // ============================================================

  useEffect(() => {
    let isMounted = true;
    let musicStarted = false;

    const cleanupListeners = () => {
      window.removeEventListener(
        'click',
        startMusicOnInteraction
      );

      window.removeEventListener(
        'keydown',
        startMusicOnInteraction
      );
    };

    const startMusicOnInteraction = () => {
      if (!isMounted || musicStarted) return;

      const playPromise = soundManager.playMusic(
        config.music.src,
        config.music.volume
      );

      if (playPromise) {
        playPromise
          .then(() => {
            if (!isMounted) return;

            musicStarted = true;
            setIsMusicPlaying(true);
            cleanupListeners();
          })
          .catch(() => {
            // Keep listeners alive.
            // The browser may still not allow playback.
            setIsMusicPlaying(false);
          });
      }
    };

    // Register a normal click listener.
    //
    // Do NOT use touchstart here.
    window.addEventListener(
      'click',
      startMusicOnInteraction
    );

    window.addEventListener(
      'keydown',
      startMusicOnInteraction
    );

    // Try autoplay immediately.
    const playPromise = soundManager.playMusic(
      config.music.src,
      config.music.volume
    );

    if (playPromise) {
      playPromise
        .then(() => {
          if (!isMounted) return;

          musicStarted = true;
          setIsMusicPlaying(true);
          cleanupListeners();
        })
        .catch(() => {
          // Autoplay was blocked.
          //
          // This is expected on many mobile browsers.
          // The click listener remains active.
          setIsMusicPlaying(false);
        });
    }

    return () => {
      isMounted = false;
      cleanupListeners();
    };
  }, [config.music.src, config.music.volume]);

  // ============================================================
  // TOAST
  // ============================================================

  const showToast = (
    message: string,
    type: 'lock' | 'success' | 'info' = 'info'
  ) => {
    const id = Date.now();

    setToast({
      id,
      message,
      type,
    });
  };

  const clearToast = () => {
    setToast(null);
  };

  // ============================================================
  // STEP HELPERS
  // ============================================================

  const isStepCompleted = (
    step: JourneyStep
  ): boolean => {
    return completedSteps.includes(step);
  };

  const getPrerequisiteName = (
    step: JourneyStep
  ): string | null => {
    const targetStep =
      step === 'gallery'
        ? 'memories'
        : step;

    const index = JOURNEY_ORDER.findIndex(
      s => s.step === targetStep
    );

    if (index <= 0) return null;

    return JOURNEY_ORDER[index - 1].name;
  };

  const isStepUnlocked = (
    step: JourneyStep
  ): boolean => {
    if (
      step === 'landing' ||
      step === 'unlock'
    ) {
      return true;
    }

    if (!isUnlocked) return false;

    if (step === 'roadmap') return true;

    const targetStep =
      step === 'gallery'
        ? 'memories'
        : step;

    const index = JOURNEY_ORDER.findIndex(
      s => s.step === targetStep
    );

    if (index === 0) return true;

    if (index === -1) return true;

    const prevStep =
      JOURNEY_ORDER[index - 1].step;

    return completedSteps.includes(prevStep);
  };

  const getNextActiveStep = (): JourneyStep => {
    for (const item of JOURNEY_ORDER) {
      if (!completedSteps.includes(item.step)) {
        return item.step;
      }
    }

    return 'gift';
  };

  // ============================================================
  // COMPLETE STEP
  // ============================================================

  const completeStep = (
    step: JourneyStep
  ) => {
    if (!completedSteps.includes(step)) {
      const nextCompleted = [
        ...completedSteps,
        step,
      ];

      setCompletedSteps(nextCompleted);
    }
  };

  // ============================================================
  // GO TO STEP
  // ============================================================

  const goToStep = (
    step: JourneyStep
  ): boolean => {
    if (
      !isUnlocked &&
      step !== 'landing' &&
      step !== 'unlock'
    ) {
      showToast(
        '🔒 Please enter the secret code first to unlock!',
        'lock'
      );

      soundManager.playWrongSound();

      setCurrentStep('unlock');

      return false;
    }

    if (!isStepUnlocked(step)) {
      const prereq =
        getPrerequisiteName(step);

      showToast(
        `🔒 Locked: Complete "${prereq || 'the previous step'}" first!`,
        'lock'
      );

      soundManager.playWrongSound();

      return false;
    }

    soundManager.playChime();

    setCurrentStep(step);

    if (step === 'memories') {
      setActiveTab('memories');
    } else if (step === 'gallery') {
      setActiveTab('gallery');
    } else if (step === 'letter') {
      setActiveTab('letter');
    } else if (
      step === 'roadmap' ||
      step === 'landing' ||
      step === 'quiz'
    ) {
      setActiveTab('home');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    return true;
  };

  // ============================================================
  // TABS
  // ============================================================

  const setTab = (
    tab: ActiveTab
  ): boolean => {
    if (tab === 'home') {
      soundManager.playChime();

      setActiveTab('home');

      if (
        isUnlocked &&
        (
          currentStep === 'landing' ||
          currentStep === 'unlock'
        )
      ) {
        setCurrentStep('roadmap');
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return true;
    }

    if (tab === 'memories') {
      if (!isStepUnlocked('memories')) {
        const prereq =
          getPrerequisiteName('memories');

        showToast(
          `🔒 Locked: Complete "${prereq}" first to unlock Memories!`,
          'lock'
        );

        soundManager.playWrongSound();

        return false;
      }

      soundManager.playChime();

      setActiveTab('memories');
      setCurrentStep('memories');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return true;
    }

    if (tab === 'gallery') {
      if (!isStepUnlocked('gallery')) {
        const prereq =
          getPrerequisiteName('memories');

        showToast(
          `🔒 Locked: Complete "${prereq}" first to unlock Photo Gallery!`,
          'lock'
        );

        soundManager.playWrongSound();

        return false;
      }

      soundManager.playChime();

      setActiveTab('gallery');
      setCurrentStep('gallery');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return true;
    }

    if (tab === 'letter') {
      if (!isStepUnlocked('letter')) {
        const prereq =
          getPrerequisiteName('letter');

        showToast(
          `🔒 Locked: Complete "${prereq}" first to read the Letter!`,
          'lock'
        );

        soundManager.playWrongSound();

        return false;
      }

      soundManager.playChime();

      setActiveTab('letter');
      setCurrentStep('letter');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return true;
    }

    if (tab === 'customize') {
      soundManager.playChime();

      setActiveTab('customize');

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return true;
    }

    return true;
  };

  // ============================================================
  // UNLOCK
  // ============================================================

  const unlockSurprise = () => {
    setIsUnlocked(true);

    try {
      localStorage.setItem(
        UNLOCK_STORAGE_KEY,
        'true'
      );
    } catch {
      // ignore
    }

    soundManager.playUnlockSound();

    setCurrentStep('roadmap');
  };

  // ============================================================
  // QUIZ
  // ============================================================

  const answerQuizQuestion = (
    questionId: string,
    optionIndex: number
  ) => {
    const nextAnswers = {
      ...quizAnswers,
      [questionId]: optionIndex,
    };

    setQuizAnswers(nextAnswers);

    let score = 0;

    config.quiz.forEach(q => {
      if (
        nextAnswers[q.id] ===
        q.correctAnswer
      ) {
        score += 1;
      }
    });

    setQuizScore(score);

    if (
      Object.keys(nextAnswers).length ===
      config.quiz.length
    ) {
      setQuizCompleted(true);

      completeStep('quiz');

      discoverEasterEgg('egg-quiz');
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizScore(0);
    setQuizCompleted(false);
  };

  // ============================================================
  // MYSTERY BOXES
  // ============================================================

  const openBox = (
    boxNumber: number
  ) => {
    if (
      !openedBoxes.includes(boxNumber)
    ) {
      const updated = [
        ...openedBoxes,
        boxNumber,
      ];

      setOpenedBoxes(updated);

      soundManager.playBoxOpen();

      completeStep('mystery');

      if (
        updated.length >=
        config.mysteryBoxes.length
      ) {
        discoverEasterEgg('egg-boxes');
      }
    }
  };

  // ============================================================
  // EASTER EGGS
  // ============================================================

  const discoverEasterEgg = (
    eggId: string
  ) => {
    if (
      !foundEasterEggs.includes(eggId)
    ) {
      const updated = [
        ...foundEasterEggs,
        eggId,
      ];

      setFoundEasterEggs(updated);

      soundManager.playEasterEggChime();
    }
  };

  // ============================================================
  // MUSIC TOGGLE
  // ============================================================

  const toggleMusic = () => {
    const isPlaying =
      soundManager.toggleMusic(
        config.music.src,
        config.music.volume
      );

    setIsMusicPlaying(isPlaying);
  };

  // ============================================================
  // DIGITAL HUG
  // ============================================================

  const sendDigitalHug = () => {
    setHugSent(true);

    completeStep('gift');

    soundManager.playFanfare();

    discoverEasterEgg('egg-hug');
  };

  // ============================================================
  // CONFIG
  // ============================================================

  const updateConfig = (
    newConfig: RakhiConfig
  ) => {
    setConfig(newConfig);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(newConfig)
      );
    } catch {
      // ignore
    }
  };

  const resetToDefaultConfig = () => {
    setConfig(defaultRakhiConfig);

    try {
      localStorage.removeItem(
        STORAGE_KEY
      );
    } catch {
      // ignore
    }
  };

  // ============================================================
  // RESTART
  // ============================================================

  const restartJourney = () => {
    setCurrentStep('roadmap');

    setHugSent(false);

    resetQuiz();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <RakhiContext.Provider
      value={{
        config,
        currentStep,
        activeTab,
        isUnlocked,
        completedSteps,
        quizAnswers,
        quizScore,
        quizCompleted,
        openedBoxes,
        foundEasterEggs,
        isMusicPlaying,
        isEasterEggModalOpen,
        isNightJarOpen,
        hugSent,
        toast,

        isStepUnlocked,
        isStepCompleted,
        getNextActiveStep,
        getPrerequisiteName,

        goToStep,
        completeStep,
        setTab,
        unlockSurprise,
        answerQuizQuestion,
        resetQuiz,
        openBox,
        discoverEasterEgg,
        toggleMusic,
        setIsEasterEggModalOpen,
        setIsNightJarOpen,
        sendDigitalHug,
        showToast,
        clearToast,
        updateConfig,
        resetToDefaultConfig,
        restartJourney,
      }}
    >
      {children}
    </RakhiContext.Provider>
  );
};

export const useRakhi = () => {
  const context =
    useContext(RakhiContext);

  if (!context) {
    throw new Error(
      'useRakhi must be used within a RakhiProvider'
    );
  }

  return context;
};
