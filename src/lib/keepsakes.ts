/**
 * Keepsakes — the emotional reward system.
 * One Keepsake per game: completing game N unlocks keepsake with gameId N.
 *
 * To add or change content later, only edit this file:
 * titles, messages and the `images` arrays (files live in public/images/keepsakes/<id>/).
 */

export type KeepsakeCategory =
  | "Family"
  | "Food Dates"
  | "Our Adventures"
  | "Our Future"
  | "Patience"
  | "Thoughtfulness"
  | "Through Everything"
  | "Yosef & Bella"
  | "Your Strength";


export type Keepsake = {
  id: number;
  /** the game that unlocks this keepsake */
  gameId: number;
  title: string;
  category: KeepsakeCategory;
  shortDescription: string;
  fullMessage: string;
  /** photo album for this keepsake — any number of local images */
  images?: string[];
  /** pastel tint used for the card + modal accent */
  tint: string;
  tintFg: string;
};

export const KEEPSAKES: Keepsake[] = [
  {
    id: 1,
    gameId: 1,
    title: "Love in the Little Things",
    category: "Thoughtfulness",
    shortDescription: "The quiet ways you remind me I'm loved every single day.",
    fullMessage:
      "I love how thoughtful you are. You always remember the little things, your sweet notes, making coffee before my shift, bringing me pasalubong just because it reminded you of me, patiently removing tinik from fish because you know I'm scared of accidentally swallowing one, your homemade meals, reminding me to eat when I'm too lazy, and always encouraging me to love myself more. You make me feel so cared for in ways both big and small. Thank you for loving me so intentionally.",
    images: [
      "/images/keepsakes/1/1.1.jpg",
      "/images/keepsakes/1/1.2.jpg",
      "/images/keepsakes/1/1.3.1.jpg",
      "/images/keepsakes/1/1.3.jpg",
      "/images/keepsakes/1/1.4.1.jpg",
      "/images/keepsakes/1/1.4.2.jpg",
      "/images/keepsakes/1/1.5.jpg",
      "/images/keepsakes/1/1.6.jpg",
      "/images/keepsakes/1/1.7.jpg",
      "/images/keepsakes/1/1.8.jpg",
      "/images/keepsakes/1/1.9.jpg",
      "/images/keepsakes/1/1.10.jpg",
      "/images/keepsakes/1/1.11.jpg",
      "/images/keepsakes/1/1.12.jpg",
      "/images/keepsakes/1/1.13.jpg",
      "/images/keepsakes/1/1.14.jpg",
      "/images/keepsakes/1/IMG_1673.jpg",
    ],
    tint: "oklch(0.93 0.055 95)",
    tintFg: "oklch(0.52 0.09 85)",
  },
  {
    id: 2,
    gameId: 2,
    title: "Passport to Forever",
    category: "Our Adventures",
    shortDescription: "Every destination is better because it's with you.",
    fullMessage:
      "I love being your travel buddy. Whether it's discovering new places, new activities, enjoying nature, or experiencing different cultures, every trip is better because I'm sharing it with you. Here's to many more adventures together.",
    images: [
      "/images/keepsakes/2/2.1.jpg",
      "/images/keepsakes/2/2.2.jpg",
      "/images/keepsakes/2/2.3.jpg",
      "/images/keepsakes/2/2.4.jpg",
      "/images/keepsakes/2/2.5.jpg",
      "/images/keepsakes/2/2.6.jpg",
      "/images/keepsakes/2/2.7.jpg",
      "/images/keepsakes/2/2.8.jpg",
      "/images/keepsakes/2/2.9.jpg",
      "/images/keepsakes/2/2.10.jpg",
      "/images/keepsakes/2/2.11.jpg",
      "/images/keepsakes/2/2.12.jpg",
      "/images/keepsakes/2/2.13.jpg",
      "/images/keepsakes/2/2.14.jpg",
      "/images/keepsakes/2/2.16.jpg",
      "/images/keepsakes/2/2.17.jpg",
    ],
    tint: "oklch(0.90 0.050 300)",
    tintFg: "oklch(0.48 0.10 300)",
  },
  {
    id: 3,
    gameId: 3,
    title: "Our Little Family",
    category: "Yosef & Bella",
    shortDescription: "Home is wherever the four of us are together.",
    fullMessage:
      "I love how deeply you care for Yosef and Bella. You always make sure they're fed, healthy, and loved. Seeing us together as a little family, even on simple mall trips, makes my heart so happy.",
    images: [
      "/images/keepsakes/3/3.1.jpg",
      "/images/keepsakes/3/3.2.jpg",
      "/images/keepsakes/3/3.3.jpg",
      "/images/keepsakes/3/3.4.jpg",
      "/images/keepsakes/3/3.5.jpg",
      "/images/keepsakes/3/3.6.jpg",
      "/images/keepsakes/3/3.7.jpg",
      "/images/keepsakes/3/3.8.jpg",
      "/images/keepsakes/3/3.9.jpg",
      "/images/keepsakes/3/3.10.jpg",
      "/images/keepsakes/3/3.11.jpg",
      "/images/keepsakes/3/3.12.jpg",
    ],
    tint: "oklch(0.90 0.055 20)",
    tintFg: "oklch(0.50 0.12 22)",
  },
  {
    id: 4,
    gameId: 4,
    title: "One Family",
    category: "Family",
    shortDescription: "The people I love became the people you love too.",
    fullMessage:
      "I love how you've embraced my family as your own. Thank you for making the effort to know them, spend time with them, and love the people I love. It means more to me than I can ever express.",
    images: [
      "/images/keepsakes/4/4.1.jpg",
      "/images/keepsakes/4/4.2.jpg",
      "/images/keepsakes/4/4.3.jpg",
      "/images/keepsakes/4/4.4.jpg",
      "/images/keepsakes/4/4.5.jpg",
      "/images/keepsakes/4/4.6.jpg",
      "/images/keepsakes/4/4.7.jpg",
      "/images/keepsakes/4/4.8.jpg",
      "/images/keepsakes/4/4.9.jpg",
      "/images/keepsakes/4/4.10.jpg",
    ],
    tint: "oklch(0.92 0.055 60)",
    tintFg: "oklch(0.52 0.11 55)",
  },
  {
    id: 5,
    gameId: 5,
    title: "Unbreakable",
    category: "Your Strength",
    shortDescription: "Your resilience inspires me every single day.",
    fullMessage:
      "I admire your strength more than you know. You've faced so many challenges, yet you continue to move forward with courage and kindness. I'm so proud of the resilient woman you are.",
    images: [
      "/images/keepsakes/5/5.1.jpg",
      "/images/keepsakes/5/5.2.jpg",
      "/images/keepsakes/5/5.3.jpg",
      "/images/keepsakes/5/5.4.jpg",
      "/images/keepsakes/5/5.5.jpg",
      "/images/keepsakes/5/5.6.jpg",
      "/images/keepsakes/5/5.7.jpg",
      "/images/keepsakes/5/5.8.jpg",
      "/images/keepsakes/5/5.9.jpg",
      "/images/keepsakes/5/5.10.jpg",
      "/images/keepsakes/5/5.11.jpg",
      "/images/keepsakes/5/5.12.jpg",
      "/images/keepsakes/5/5.13.jpg",
      "/images/keepsakes/5/5.14.jpg",
      "/images/keepsakes/5/5.15.jpg",
    ],
    tint: "oklch(0.96 0.004 240)",
    tintFg: "oklch(0.52 0.010 250)",
  },
  {
    id: 6,
    gameId: 6,
    title: "Taste Testing Partners",
    category: "Food Dates",
    shortDescription: "Every meal becomes a memory with you.",
    fullMessage:
      "I love trying new restaurants and foods with you. Every meal turns into an adventure, especially when we end up rating everything together. I can't wait for all the food dates still waiting for us.",
    images: [
      "/images/keepsakes/6/6.1.jpg",
      "/images/keepsakes/6/6.2.jpg",
      "/images/keepsakes/6/6.3.jpg",
      "/images/keepsakes/6/6.4.jpg",
      "/images/keepsakes/6/6.5.jpg",
      "/images/keepsakes/6/6.6.jpg",
      "/images/keepsakes/6/6.7.jpg",
      "/images/keepsakes/6/6.8.jpg",
      "/images/keepsakes/6/6.9.jpg",
      "/images/keepsakes/6/6.10.jpg",
      "/images/keepsakes/6/6.11.jpg",
      "/images/keepsakes/6/6.12.jpg",
      "/images/keepsakes/6/6.13.jpg",
      "/images/keepsakes/6/6.14.jpg",
    ],
    tint: "oklch(0.92 0.050 150)",
    tintFg: "oklch(0.48 0.08 155)",
  },
  {
    id: 7,
    gameId: 7,
    title: "Thank You for Choosing Me",
    category: "Patience",
    shortDescription: "For loving me, even on my hardest days.",
    fullMessage:
      "Thank you for being so patient and understanding with me. Through my flaws, worries, and difficult days, you've always chosen kindness. Thank you for loving me gently, even when I'm not at my best.",
    images: [
      "/images/keepsakes/7/7.1.jpg",
      "/images/keepsakes/7/7.2.jpg",
      "/images/keepsakes/7/7.3.jpg",
      "/images/keepsakes/7/7.4.jpg",
      "/images/keepsakes/7/7.5.jpg",
      "/images/keepsakes/7/7.6.jpg",
    ],
    tint: "oklch(0.91 0.045 240)",
    tintFg: "oklch(0.50 0.09 245)",
  },
  {
    id: 8,
    gameId: 8,
    title: "I'll Always Choose You",
    category: "Through Everything",
    shortDescription: "No matter what life brings, I'll be by your side.",
    fullMessage:
      "I love experiencing life with you. We've celebrated victories, faced challenges, laughed together, and held each other through difficult days. No matter what season we're in, I want you to know you'll never have to face it alone. I'll always be here for you, just as you've always been there for me. Every single day, I'll choose you.",
    images: [
      "/images/keepsakes/8/8.1.jpg",
      "/images/keepsakes/8/8.2.jpg",
      "/images/keepsakes/8/8.3.jpg",
      "/images/keepsakes/8/8.4.jpg",
      "/images/keepsakes/8/8.6.jpg",
      "/images/keepsakes/8/8.7.jpg",
      "/images/keepsakes/8/8.8.jpg",
      "/images/keepsakes/8/8.9.jpg",
      "/images/keepsakes/8/8.10.jpg",
    ],
    tint: "oklch(0.91 0.050 350)",
    tintFg: "oklch(0.50 0.10 350)",
  },
  {
    id: 9,
    gameId: 9,
    title: "Our Forever",
    category: "Our Future",
    shortDescription: "The best chapters of our story are still ahead of us.",
    fullMessage:
      "I love seeing you happy because your smile makes everything brighter. I truly believe we have an amazing future ahead of us. I know we'll build a beautiful life together, achieve our dreams, and be successful in our own way. We'll keep working hard so we can have a comfortable life filled with adventures, laughter, and peace. No matter what the future holds, I hope we face it hand in hand. I love you, and I can't wait to spend forever with you.",
    images: [
      "/images/keepsakes/9/9.1.jpg",
      "/images/keepsakes/9/9.2.jpg",
      "/images/keepsakes/9/9.3.jpg",
      "/images/keepsakes/9/9.4.jpg",
      "/images/keepsakes/9/9.5.jpg",
      "/images/keepsakes/9/9.6.jpg",
      "/images/keepsakes/9/9.7.jpg",
    ],
    tint: "oklch(0.90 0.035 60)",
    tintFg: "oklch(0.46 0.05 55)",
  },
];

export const TOTAL_KEEPSAKES = KEEPSAKES.length;

export function getKeepsakeForGame(gameId: number): Keepsake | undefined {
  return KEEPSAKES.find((k) => k.gameId === gameId);
}

export function isKeepsakeUnlocked(keepsake: Keepsake, completedGames: number[]) {
  return completedGames.includes(keepsake.gameId);
}

export function unlockedKeepsakes(completedGames: number[]) {
  return KEEPSAKES.filter((k) => isKeepsakeUnlocked(k, completedGames));
}
