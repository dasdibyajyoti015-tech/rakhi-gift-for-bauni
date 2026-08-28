/**
 * Provides graceful fallback illustrations when user hasn't added custom photos yet.
 */

export const getPlaceholderImage = (category: string = 'memory', seed: string | number = 1): string => {
  const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  // High quality SVG data URIs with festive, warm sibling cartoon vibes
  const gradients = [
    { from: '%23FFE4E6', to: '%23FED7AA', icon: '👫', text: 'Sweet Sibling Memory' },
    { from: '%23E0E7FF', to: '%23FCE7F3', icon: '📸', text: 'Childhood Chaos' },
    { from: '%23FEF3C7', to: '%23FDE68A', icon: '✨', text: 'Festive Celebration' },
    { from: '%23DCFCE7', to: '%23E0F2FE', icon: '🍕', text: 'Snack Heist & Fun' },
    { from: '%23F3E8FF', to: '%23FCE7F3', icon: '🌸', text: 'Rakhi Bonding' },
    { from: '%23FFEDD5', to: '%23FECDD3', icon: '🧸', text: 'Partner In Crime' },
  ];

  const item = gradients[seedNum % gradients.length];
  
  // Return an SVG Data URI that looks like a cute scrapbook illustration
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${item.from}"/>
        <stop offset="100%" stop-color="${item.to}"/>
      </linearGradient>
      <pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="%23FFFFFF" opacity="0.4"/>
      </pattern>
    </defs>
    <rect width="600" height="450" fill="url(#g)"/>
    <rect width="600" height="450" fill="url(#p)"/>
    
    <!-- Decorative Frame -->
    <rect x="25" y="25" width="550" height="400" rx="20" fill="none" stroke="%23FFFFFF" stroke-width="4" stroke-dasharray="8 8" opacity="0.6"/>
    
    <!-- Center Sibling Icon / Illustration -->
    <circle cx="300" cy="180" r="70" fill="%23FFFFFF" opacity="0.8"/>
    <text x="300" y="200" font-size="64" text-anchor="middle" font-family="sans-serif">${item.icon}</text>
    
    <!-- Subtitle text -->
    <text x="300" y="290" font-size="22" font-weight="bold" fill="%234A3525" text-anchor="middle" font-family="sans-serif">${item.text}</text>
    <text x="300" y="325" font-size="14" fill="%2378553E" text-anchor="middle" font-family="sans-serif">📸 Place your own photo in public/images/</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${svg.replace(/[\n\r\t]/g, '')}`;
};
