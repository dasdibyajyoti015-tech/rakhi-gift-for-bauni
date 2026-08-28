# 🌸 Rakhi 2026 Interactive Surprise Website — Template Edition

A polished, emotional, playful, and interactive **Raksha Bandhan 2026 surprise website** designed for a brother or sister to surprise their sibling with an unforgettable digital story experience.

---

# How to Personalize This Website — No Coding Required ❤️

This project is built from the ground up as a **100% reusable template**. You do **NOT** need to know React, JavaScript, CSS, or backend programming to customize everything for your sister or sibling!

---

### 🚀 Step 1: Open the Main Configuration File

Open the single configuration file:
```text
src/config/rakhiConfig.ts
```

All text, names, password codes, trivia questions, awards, memories, letters, and gift messages live in this one file.

---

### ✍️ Step 2: Change the Personal Names & Secret Code

In `src/config/rakhiConfig.ts`, update the first section:

```typescript
export const defaultRakhiConfig: RakhiConfig = {
  sisterName: "Priya",        // Your sister's name
  nickname: "Piku",           // Her childhood or cute nickname
  siblingName: "Rahul",       // Your name (Brother / Sibling)
  relationship: "brother",    // "brother", "sister", or "sibling"

  // The 4-digit code (or year) she enters to unlock the surprise:
  secretCode: "2007",

  // The funny or nostalgic clue:
  secretHint: "The year of our legendary Maggie heist 👀🍜",
  ...
};
```

---

### 📸 Step 3: Add Your Personal Photos

Put your personal childhood, festival, and funny photos in:
```text
public/images/
```

Example directory layout:
```text
public/images/
├── memory-1.jpg
├── memory-2.jpg
├── memory-3.jpg
├── memory-4.jpg
├── memory-5.jpg
├── gallery-1.jpg
├── gallery-2.jpg
└── childhood.jpg
```

Then in `src/config/rakhiConfig.ts`, simply reference their filenames:
```typescript
memories: [
  {
    id: "m1",
    year: "2012",
    title: "The Beginning of Chaos",
    description: "Two tiny humans plotting daily mischief.",
    image: "/images/memory-1.jpg",
    location: "Childhood Home",
    emoji: "🧸",
    caption: "Proof that we've been causing trouble together since the start."
  },
  ...
]
```

> 💡 **Graceful Fallback**: If you haven't added photos yet or an image is missing, the site automatically renders an adorable festive watercolor illustration so nothing looks broken!

---

### 🎵 Step 4: Add Background Music (Optional)

Place your favorite festive song or instrumental track at:
```text
public/audio/rakhi.mp3
```

In `rakhiConfig.ts`:
```typescript
music: {
  enabled: true,
  src: "/audio/rakhi.mp3",
  volume: 0.35,
  title: "Festive Rakhi Acoustic Melody"
}
```

> 💡 **Built-in Ambient Chime**: If you don't provide an MP3 file, the website includes a built-in acoustic Web Audio synthesizer that generates a calming, relaxing festive ambient melody out-of-the-box!

---

### 🎮 Step 5: Customize the Sibling Mini-Quiz

In `src/config/rakhiConfig.ts`, edit or add your own trivia questions:

```typescript
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
    correctAnswer: 2, // 0 = first option, 1 = second, 2 = third, 3 = fourth
    explanation: "Classic sibling negotiation tactic! 😂",
    reactionCorrect: "Spot on! You know me way too well 🤣",
    reactionWrong: "Nice guess, but rule #1 is always negotiation! 😂"
  }
]
```

---

### 🏆 Step 6: Customize the Sister Achievement Awards

Edit or add funny awards in `rakhiConfig.ts`:

```typescript
awards: [
  {
    id: "a1",
    title: "Best Professional Annoyer",
    category: "Daily Excellence",
    description: "For disturbing me at precisely the wrong moment with surgical accuracy.",
    icon: "BellRing",
    emoji: "📢",
    badgeText: "Grand Champion"
  },
  {
    id: "a2",
    title: "Snack Tax Collector",
    category: "Culinary Crimes",
    description: "For confiscating 'just one bite' of every treat I ever opened.",
    icon: "Utensils",
    emoji: "🍕",
    badgeText: "Unpaid Bounty"
  }
]
```

---

### 🎁 Step 7: Customize Mystery Surprise Boxes

Edit the 6 surprise box cards:

```typescript
mysteryBoxes: [
  {
    id: "b1",
    boxNumber: 1,
    title: "A Sweet Memory",
    message: "Remember when we got caught eating sweets before the puja? Mom definitely knew! 😂",
    subMessage: "Secret unlocked: You are still my favorite accomplice.",
    colorGradient: "from-pink-400 to-rose-500"
  },
  {
    id: "b2",
    boxNumber: 2,
    title: "Sibling Coupon 🎟️",
    message: "FREE COUPON: Valid for ONE (1) late-night coffee/chai on demand without questions! ☕✨",
    subMessage: "No expiration date. Non-transferable!"
  },
  ...
]
```

---

### 💌 Step 8: Customize the Handwritten Letter & Final Gift

```typescript
letter: {
  date: "August 2026 • Raksha Bandhan",
  salutation: "Dearest Piku,",
  paragraphs: [
    "Every year when Raksha Bandhan comes around, I look back at how far we have come...",
    "Thank you for being my constant cheerleader and loudest critic...",
    "I promise to always have your back and celebrate your biggest wins."
  ],
  closing: "With endless love and tightest hugs,",
  signature: "Rahul ❤️",
  postscript: "P.S. You still owe me 100 rupees from 2018, but today I'll waive the interest! 😉"
},

finalGift: {
  badge: "🌸 Rakhi 2026 Special Gift 🌸",
  title: "Happy Raksha Bandhan, Sis!",
  subtitle: "Thank you for being my sister, my biggest supporter, and my forever best friend.",
  boxCta: "🎁 CLICK TO UNWRAP YOUR SPECIAL GIFT",
  giftTitle: "Your Official Rakhi 2026 Gift & Voucher 💳✨",
  giftMessage: "A special shopping spree & celebration treat on me! Plus unlimited sibling favors forever!",
  voucherCode: "RAKHI-2026-BEST-SISTER",
  giftNote: "Screenshot this card and send it to me right now to claim your gift! 📲❤️",
  hugButtonText: "Send a Digital Hug Back 🤗",
  hugResponseText: "Hug received across the screen! Wishing you the happiest Raksha Bandhan ever! 🌸✨",
  signature: "Always by your side, Rahul ❤️"
}
```

---

## 🎨 Alternative: Visual Customizer (In-Browser CMS)

You can also customize everything visually directly in the browser!
1. Click the **"Customize"** tab in the bottom navigation dock.
2. Type in your names, letters, and questions.
3. Click **"Save Changes"** to preview instantly in your browser.
4. Click **"Export Code 📋"** to copy the generated configuration code directly into `src/config/rakhiConfig.ts`.

---

## 🧩 Hidden Easter Eggs & Sibling Secrets

The site includes 5 fun hidden secrets for the recipient to discover:
1. **Rakhi Emblem Tap**: Tap the floating Rakhi badge 5 times on the landing page.
2. **Sibling Lore Champion**: Complete all questions in the mini-quiz.
3. **Box Collector**: Open all 6 mystery surprise boxes.
4. **Digital Hug Sender**: Send a digital hug back at the end of the celebration.
5. **Night Mode Wish Jar**: Open the secret starry midnight wish jar room.

---

## 📱 Mobile-First Responsive Design & Accessibility

* Perfectly responsive on iPhones, Android phones, tablets, and desktop displays.
* Touch targets sized > 44px for smooth mobile navigation.
* Full keyboard navigation and accessible color contrast.
* Respects `prefers-reduced-motion` settings.

---

## 🚀 Running & Deploying Locally

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
The static website files will be generated in `dist/`, ready to deploy to **GitHub Pages, Vercel, Netlify, or Firebase Hosting** with zero backend or database required!
