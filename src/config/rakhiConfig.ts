import { RakhiConfig } from '../types/rakhi';

/**
 * ==============================================================================
 * 🌸 RAKSHA BANDHAN 2026 — MASTER CUSTOMIZATION CONFIGURATION 🌸
 * ==============================================================================
 * 
 * Hey there! Welcome to the easiest way to personalize this entire Rakhi website.
 * YOU DO NOT NEED ANY CODING KNOWLEDGE!
 * 
 * Simply edit the text, names, memories, and questions between the quotes ("...").
 * 
 * 📸 PHOTOS:
 * Put your photos into the `public/images/` folder:
 * e.g., `public/images/childhood.jpg`, `public/images/memory-1.jpg`
 * and reference them like `image: "/images/memory-1.jpg"`.
 * If an image file isn't found, the site displays a beautiful fallback illustration!
 * 
 * 🎵 BACKGROUND MUSIC:
 * Place your favorite song or instrumental audio at `public/audio/rakhi.mp3`.
 * If no file is provided, an ambient Indian acoustic chime automatically plays!
 * ==============================================================================
 */

export const defaultRakhiConfig: RakhiConfig = {
  // ---------------------------------------------------------------------------
  // 1. SIBLING DETAILS & SECRET CODE
  // ---------------------------------------------------------------------------
  sisterName: "Bauni",
  nickname: "Baishali",
  siblingName: "Shivam",
  relationship: "brother", // "brother", "sister", or "sibling"

  // The 4-digit code (or custom phrase) she needs to enter to unlock the surprise!
  secretCode: "2019",
  secretHint: "The year of our legendary metup",

  // ---------------------------------------------------------------------------
  // 2. LANDING PAGE
  // ---------------------------------------------------------------------------
  intro: {
    badge: "Rakhi 2026 🌸",
    title: "Hey, Sis! 👀",
    subtitle: "Someone has prepared something really special, funny & emotional just for you...",
    unlockButtonText: "UNLOCK YOUR SURPRISE ✨",
    footerHint: "Hint: You will definitely smile. Promise! 😊",
  },

  // ---------------------------------------------------------------------------
  // 3. UNLOCK SCREEN SUCCESS
  // ---------------------------------------------------------------------------
  unlockSuccess: {
    title: "It's Unlocked! 🎉",
    subtitle: "Get ready for a journey full of our memories, inside jokes, secret awards, and a final surprise ❤️",
    buttonText: "LET'S START THE JOURNEY →",
  },

  // ---------------------------------------------------------------------------
  // 4. SIBLING TRIVIA MINI-QUIZ 🎮
  // ---------------------------------------------------------------------------
  quiz: [
    {
      id: "q1",
      question: "What is my most-used phrase whenever you ask me for a favor?",
      options: [
        "Wait 5 minutes...",
        "I'm busy right now.",
        "What will I get in return? 🤔",
        "Ask Mom first!"
      ],
      correctAnswer: 2,
      explanation: "Classic sibling negotiation tactic since day 1! 😂",
      reactionCorrect: "Spot on! You know me way too well 🤣",
      reactionWrong: "Nice guess, but rule #1 of siblings is always negotiation! 😂"
    },
    {
      id: "q2",
      question: "Who starts 90% of our arguments?",
      options: [
        "Obviously you (100%)",
        "Me (a complete saint 😇)",
        "A rendom convo",
        "You not finding a good girlfrien for me"
      ],
      correctAnswer: 3,
      explanation: "Its your job to protect me from those chudails out and find a good bhabhi.",
      reactionCorrect: "Exactly! Atlest you Admit it",
      reactionWrong: "We both know it is your job"
    },
    {
      id: "q3",
      question: "If we were in a zombie apocalypse, what would be your role?",
      options: [
        "The fearless warrior leader",
        "Using me as human bait while escaping 🏃‍♀️",
        "Searching for WiFi and snacks",
        "Negotiating peace with the zombies"
      ],
      correctAnswer: 1,
      explanation: "You'd totally push me in front and run to safety! 😂",
      reactionCorrect: "Haha I knew it! Survival of the fastest sister 🏃‍♀️",
      reactionWrong: "Don't lie, you would definitely sacrifice me for a pizza! 🍕"
    },
    {
      id: "q4",
      question: "What is your undisputed superpower as my not-by-blood sister?",
      options: [
        "Giving advice like you know everything 😌",
        "Showing up in my life whenever you feel like causing chaos 😂",
        "Roasting me like we've known each other forever 😂",
        "All of the above (Sister by Choice) 🏆"
      ],
      correctAnswer: 3,
      explanation: "We may have met in college, but somewhere along the way, you became family. ❤️",
      reactionCorrect: "Sister by choice, champion by default! 🥇🧿",
      reactionWrong: "Really? After all these years, you still don't know your sister? 😂"
    },
    {
      id: "q5",
      question: "If we weren't related by blood, then how did you become my sister?",
      options: [
        "College decided it for us 🎓",
        "You adopted me 😂",
        "We just chose each other as siblings ❤️",
        "I had no choice in the matter 😭"
      ],
      correctAnswer: 2,
      explanation: "Exactly! We may not share blood, but somewhere along the way, we chose to be family. ❤️",
      reactionCorrect: "That's my sister! Choice made, no take-backs. 🫶😂",
      reactionWrong: "Wrong answer! Apparently you forgot who chose whom. 😂❤️"
    }
  ],

  quizResults: [
    {
      minScore: 5,
      maxScore: 5,
      title: "Soulmate Sibling Status! 🏆",
      message: "You scored 5/5! Okay... you actually know me better than anyone. Maybe having you as a sister isn't so bad after all ❤️",
      badge: "Certified Favorite Sister",
      emoji: "👑"
    },
    {
      minScore: 3,
      maxScore: 4,
      title: "Pretty Solid Sibling Connection! 🌟",
      message: "Great job! You know the chaotic lore well. A few revisions needed, but I'll still give you a high five and sweets!",
      badge: "Official Crime Partner",
      emoji: "⭐"
    },
    {
      minScore: 0,
      maxScore: 2,
      title: "Selective Memory Queen! 😂",
      message: "Did you guess with your eyes closed? Don't worry, Rakhi gift is still safe... probably!",
      badge: "Chaotic Mastermind",
      emoji: "🍕"
    }
  ],

  // ---------------------------------------------------------------------------
  // 5. SISTER ACHIEVEMENT AWARDS 🏆
  // ---------------------------------------------------------------------------
  awards: [
    {
      id: "a1",
      title: "Professional Roaster",
      category: "Comedy & Chaos",
      description: "For having the incredible ability to roast me with perfect timing and absolutely zero mercy.",
      icon: "Megaphone",
      emoji: "😂",
      badgeText: "Roasting Champion"
    },
    {
      id: "a2",
      title: "Sibling Privilege Expert",
      category: "Unofficial Sister Rights",
      description: "For somehow earning the right to question my decisions, give unsolicited advice, and still get away with it.",
      icon: "BadgeCheck",
      emoji: "😌",
      badgeText: "Privileges Unlocked"
    },
    {
      id: "a3",
      title: "Drama Department Head",
      category: "Theatrical Excellence",
      description: "For turning even the most normal conversation into a full-blown episode worth watching. 🎭",
      icon: "Crown",
      emoji: "👑",
      badgeText: "Drama Champion"
    },
    {
      id: "a4",
      title: "Random Text Specialist",
      category: "Communication & Chaos",
      description: "For sending completely random messages, starting unexpected conversations, and keeping the chaos alive.",
      icon: "MessageCircle",
      emoji: "📱",
      badgeText: "Certified Menace"
    },
    {
      id: "a5",
      title: "Secret Keeper Supreme",
      category: "Trust & Loyalty",
      description: "For knowing way too many things about me and somehow still choosing to remain my sister. 😂❤️",
      icon: "LockKeyhole",
      emoji: "🔐",
      badgeText: "Top Secret"
    },
    {
      id: "a6",
      title: "Best Sister by Choice",
      category: "Heart & Soul",
      description: "We started as college friends, but somewhere along the way you became family. No blood relation required. ❤️",
      icon: "HeartHandshake",
      emoji: "🧿",
      badgeText: "Forever Champion"
    }
  ],
  awardsFooterQuote: "🏆 Official Title: Sister by Choice, Partner-in-Crime by Destiny & Permanent Member of My Life!",

  // ---------------------------------------------------------------------------
  // 6. OUR MEMORIES TIMELINE 📸
  // ---------------------------------------------------------------------------
  memories: [
    {
      id: "m1",
      year: "2026",
      title: "And Somehow, We Became Sisters 🫶",
      description: "College gave me a lot of things, but meeting you was definitely one of the best accidents.",
      image: "images/rakhi-2026-1.jpg",
      location: "College",
      emoji: "🌸",
      caption: "Not related by blood. Still stuck with each other."
    },
    {
      id: "m2",
      year: "2026",
      title: "The 'Just One Photo' Lie 📸",
      description: "One photo somehow becomes twenty, and obviously we still need another one because this one wasn't perfect.",
      image: "images/rakhi-2026-2.jpg",
      location: "College",
      emoji: "😂",
      caption: "Our camera roll has officially given up on us."
    },
    {
      id: "m3",
      year: "2026",
      title: "Certified Partners in Crime 🤝",
      description: "From random conversations to random plans, somehow everything is more fun when you're around.",
      image: "images/rakhi-2026-3.jpg",
      location: "Our College Days",
      emoji: "🤭",
      caption: "Zero planning. Maximum memories."
    },
    {
      id: "m4",
      year: "2026",
      title: "The Memories I Didn't Expect 💗",
      description: "Some people enter your life as classmates and quietly become the people you know you'll miss the most.",
      image: "images/rakhi-2026-4.jpg",
      location: "College",
      emoji: "🥹",
      caption: "Some friendships just feel like they were supposed to happen."
    },
    {
      id: "m5",
      year: "2026",
      title: "My Favourite College Plot Twist ✨",
      description: "If someone had told me I'd find a sister in college, I probably wouldn't have believed them.",
      image: "images/rakhi-2026-5.jpg",
      location: "College",
      emoji: "🫂",
      caption: "Best plot twist of my college story."
    },
    {
      id: "m6",
      year: "2026",
      title: "Okay Fine, You're Family Now 🫶",
      description: "Somewhere between the laughs, nonsense, photos and everything in between, you became more than just a college friend.",
      image: "images/rakhi-2026-6.jpg",
      location: "Us",
      emoji: "💗",
      caption: "College introduced us. Life better not separate us."
    }
  ],
  
  
  // ---------------------------------------------------------------------------
  // 7. PHOTO GALLERY 🖼️
  // ---------------------------------------------------------------------------
  gallery: [
    {
      id: "g1",
      title: "Our Kind of Chaos",
      caption: "Honestly, I wouldn't want my college memories any other way.",
      image: "images/rakhi-2026-1.jpg",
      date: "2026",
      category: "Us"
    },
    {
      id: "g2",
      title: "Just Us Being Us",
      caption: "No explanation required. This picture already feels like us.",
      image: "images/rakhi-2026-2.jpg",
      date: "2026",
      category: "Us"
    },
    {
      id: "g3",
      title: "Camera Roll Evidence",
      caption: "Keeping photographic evidence of the nonsense was apparently important.",
      image: "images/rakhi-2026-3.jpg",
      date: "2026",
      category: "Fun"
    },
    {
      id: "g4",
      title: "One Of Those Days",
      caption: "A completely normal day that somehow became a memory I'll keep.",
      image: "images/rakhi-2026-4.jpg",
      date: "2026",
      category: "Memories"
    },
    {
      id: "g5",
      title: "My College Person",
      caption: "Out of everyone I could've met here, I'm really glad it was you.",
      image: "images/rakhi-2026-5.jpg",
      date: "2026",
      category: "Sister",
    },
    {
      id: "g6",
      title: "Forever On My Team 🫶",
      caption: "Different days, different photos, same person I can always count on.",
      image: "images/rakhi-2026-6.jpg",
      date: "2026",
      category: "Sisterhood"
    }
  ],

  // ---------------------------------------------------------------------------
  // 8. MYSTERY SURPRISE BOXES 🎁
  // ---------------------------------------------------------------------------
  mysteryBoxes: [
    {
      id: "b1",
      boxNumber: 1,
      title: "A College Memory 🎓",
      message: "Who knew that somewhere between all those college conversations, random plans, and endless laughs, I would end up finding a sister for life? 😂",
      subMessage: "Secret unlocked: The best bonds are sometimes the unexpected ones. ❤️",
      colorGradient: "from-pink-400 to-rose-500"
    },
    {
      id: "b2",
      boxNumber: 2,
      title: "Sister Coupon 🎟️",
      message: "FREE COUPON: Valid for ONE coffee, chai, food outing, or random meetup whenever either of us decides it's time to catch up! ☕✨",
      subMessage: "Valid forever. No questions asked!",
      colorGradient: "from-amber-400 to-orange-500"
    },
    {
      id: "b3",
      boxNumber: 3,
      title: "Unspoken Confession 💌",
      message: "I may not say it often, but I'm genuinely lucky that college gave me a person I can call my sister even though we're not related by blood. ❤️",
      subMessage: "Some friendships quietly turn into family.",
      colorGradient: "from-purple-400 to-indigo-500"
    },
    {
      id: "b4",
      boxNumber: 4,
      title: "Forever Sister Pact 🤝",
      message: "College may be over, but the sisterhood isn't. No matter how busy life gets, you can always count on me for a conversation, a laugh, or just someone to listen.",
      subMessage: "Sister status: Permanent. 🧿",
      colorGradient: "from-emerald-400 to-teal-500"
    },
    {
      id: "b5",
      boxNumber: 5,
      title: "An Embarrassing Fact 😂",
      message: "I have collected enough embarrassing moments, random conversations, and questionable decisions from our time together to keep roasting you for years to come.",
      subMessage: "Your secrets are safe... mostly. 😌",
      colorGradient: "from-sky-400 to-blue-500"
    },
    {
      id: "b6",
      boxNumber: 6,
      title: "⭐ The Golden Surprise Box",
      message: "We didn't grow up together, we don't share the same home, and we aren't related by blood. But somewhere along the way, you became family—and that's something I'll always be grateful for. Happy Rakhi, sister! ❤️🧿",
      subMessage: "Ready for the big reveal? Head to the next step! 💌",
      isSpecial: true,
      colorGradient: "from-yellow-400 via-amber-400 to-red-500"
    }
  ],
  
  // ---------------------------------------------------------------------------
  // 9. "THINGS I NEVER SAY OUT LOUD" 💌
  // ---------------------------------------------------------------------------
  thingsINeverSay: [
    "I don't say it often, but I'm genuinely grateful that college brought you into my life.",
    "Somewhere along the way, you stopped being just a friend and became my sister by choice.",
    "Even when you annoy me, I wouldn't trade this crazy bond for anything. 😂",
    "I'm genuinely proud of the person you've become, even if I don't always say it.",
    "Some of my favorite memories from college became better simply because you were part of them.",
    "No matter how much life changes after college, I hope you always know that you'll have a sister in me. ❤️"
  ],
  
  // ---------------------------------------------------------------------------
  // 10. HANDWRITTEN SIBLING LETTER 📝
  // ---------------------------------------------------------------------------
  letter: {
    date: "August 2026 • Raksha Bandhan",
    salutation: "Dearest Sister,",
    paragraphs: [
      "It's funny how life works. We met in college without knowing that one day I'd be calling you my sister. Somewhere between the random conversations, countless laughs, teasing, and all the memories we made, our friendship became something much more special.",
      "Thank you for being the kind of person who can make an ordinary day memorable, who can roast me without mercy, and who somehow earned permanent sister privileges without ever officially applying for them. 😂",
      "College is over now, and life will keep getting busier, but that doesn't change what you mean to me. You don't have to live with me or even see me every day for me to consider you family.",
      "This Rakhi is a reminder that some relationships aren't created by blood—they're created by choice, memories, trust, and a whole lot of madness. I'm really glad I got to choose you as my sister. ❤️",
      "Stay the same amazing, crazy, caring person you are. And remember, no matter where life takes us, your annoying brother is always going to be somewhere around to support you, roast you, and occasionally disturb you. 😌"
    ],
    closing: "With lots of love, laughter, and sibling-level annoyance,",
    signature: "Rahul ❤️",
    postscript: "P.S. College may be over, but unfortunately for you, your lifetime membership as my sister has already been activated. No cancellations allowed. 😂"
  },

  // ---------------------------------------------------------------------------
  // 11. PLAYFUL RUNAWAY BUTTON 😂
  // ---------------------------------------------------------------------------
  runawayButton: {
    initialText: "❤️ Click if you love your brother",
    successText: "I KNEW IT! YOU LOVE ME! ❤️🎉😂",
    evasiveMessages: [
      "Too slow! 😂",
      "Almost got me! 🏃‍♂️",
      "Nice try, sister! 💨",
      "Are your reflexes okay? 😜",
      "Okay okay, you earned it! ❤️"
    ],
    maxDodges: 4
  },

  // ---------------------------------------------------------------------------
  // 12. FINAL SURPRISE & GIFT 🎁
  // ---------------------------------------------------------------------------
  finalGift: {
    badge: "🌸 Rakhi 2026 • Sister by Choice 🌸",
    title: "Happy Raksha Bandhan, Sis! ❤️",
    subtitle: "We may not be related by blood, but somehow life decided I needed a sister like you.",
    boxCta: "🎁 CLICK TO UNWRAP YOUR RAKHI SURPRISE",
    giftTitle: "Your Official Rakhi 2026 Sister Voucher 💳✨",
    giftMessage: "One special treat on me! Pick the place, pick the food, and let's finally make another memory together. Plus unlimited sibling privileges, random calls, and lifetime roasting rights! 😂❤️",
    voucherCode: "RAKHI-2026-SISTER-BY-CHOICE",
    giftNote: "Screenshot this card and send it to me to officially claim your sister voucher! 📲❤️",
    hugButtonText: "Send a Digital Hug Back 🤗",
    hugResponseText: "Hug received! Distance doesn't matter when the sister bond is this strong. Happy Raksha Bandhan! 🌸✨",
    signature: "Your Brother by Choice, Rahul ❤️"
  },
  
  // ---------------------------------------------------------------------------
  // 13. HIDDEN EASTER EGGS 🧩
  // ---------------------------------------------------------------------------
  easterEggs: [
    {
      id: "egg-logo",
      name: "Rakhi Emblem Tap",
      hint: "Tap the floating Rakhi emblem at the top 5 times in a row!",
      revealMessage: "🎉 Secret Found! You discovered the Sister by Choice blessing! Sister Luck +100 ✨",
      icon: "Sparkles"
    },
    {
      id: "egg-quiz",
      name: "Quiz Champion Badge",
      hint: "Answer all quiz questions to unlock a secret about your very questionable brother. 😂",
      revealMessage: "🎮 Secret Found! Quiz Champion! You clearly know your brother way too well!",
      icon: "Gamepad2"
    },
    {
      id: "egg-boxes",
      name: "Mystery Box Master",
      hint: "Open all 6 mystery surprise boxes.",
      revealMessage: "🎁 Secret Found! Mystery Box Master! You unlocked all the little memories and messages made just for you. ❤️",
      icon: "Gift"
    },
    {
      id: "egg-hug",
      name: "Digital Hug Sender",
      hint: "Send a digital hug back at the end of the celebration.",
      revealMessage: "🤗 Secret Found! Virtual hug successfully delivered! Sister bond officially upgraded. ❤️",
      icon: "Heart"
    },
    {
      id: "egg-nightjar",
      name: "Secret Wish Jar",
      hint: "Find the glowing starry wish jar on the special hidden page!",
      revealMessage: "✨ Secret Found! Secret Wish Jar unlocked! One special wish for your year ahead—may it be filled with happiness, success, and amazing memories. 🌟",
      icon: "Moon"
    }
  ],
  
  // ---------------------------------------------------------------------------
  // 14. MUSIC SETTINGS 🎵
  // ---------------------------------------------------------------------------
  music: {
    enabled: true,
    src: "audio/rakhi.mp3",
    volume: 0.70,
    title: "Our Rakhi Memory Melody"
  }
};
