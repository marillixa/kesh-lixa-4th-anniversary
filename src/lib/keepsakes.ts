/**
 * Keepsakes — the emotional reward system.
 * One Keepsake per game: completing game N unlocks keepsake with gameId N.
 *
 * To add real content later, only edit this file:
 * swap the placeholder title / shortDescription / fullMessage / image.
 */

export type KeepsakeCategory =
  | "Favorite Memory"
  | "Reason I Love You"
  | "Future Dream"
  | "Little Things"
  | "Letter";

export type Keepsake = {
  id: number;
  /** the game that unlocks this keepsake */
  gameId: number;
  title: string;
  category: KeepsakeCategory;
  shortDescription: string;
  fullMessage: string;
  /** optional image placeholder — a URL or imported asset */
  image?: string;
  /** pastel tint used for the card + modal accent */
  tint: string;
  tintFg: string;
};

export const KEEPSAKES: Keepsake[] = [
  {
    id: 1,
    gameId: 1,
    title: "The First Hello",
    category: "Favorite Memory",
    shortDescription: "Where all of this quietly began.",
    fullMessage:
      "Placeholder message — a memory from the very beginning of us will live here.",
    tint: "oklch(0.93 0.055 95)",
    tintFg: "oklch(0.52 0.09 85)",
  },
  {
    id: 2,
    gameId: 2,
    title: "Your Laugh",
    category: "Reason I Love You",
    shortDescription: "The sound I'd recognise anywhere.",
    fullMessage: "Placeholder message — a reason I love you will live here.",
    tint: "oklch(0.90 0.050 300)",
    tintFg: "oklch(0.48 0.10 300)",
  },
  {
    id: 3,
    gameId: 3,
    title: "A Small Direction",
    category: "Little Things",
    shortDescription: "The tiny moments nobody else notices.",
    fullMessage: "Placeholder message — a little thing about you will live here.",
    tint: "oklch(0.90 0.055 20)",
    tintFg: "oklch(0.50 0.12 22)",
  },
  {
    id: 4,
    gameId: 4,
    title: "A House With Warm Light",
    category: "Future Dream",
    shortDescription: "Something I picture when I picture us.",
    fullMessage: "Placeholder message — a dream for our future will live here.",
    tint: "oklch(0.92 0.055 60)",
    tintFg: "oklch(0.52 0.11 55)",
  },
  {
    id: 5,
    gameId: 5,
    title: "Slow Mornings",
    category: "Favorite Memory",
    shortDescription: "Nothing planned, everything perfect.",
    fullMessage: "Placeholder message — a favourite memory will live here.",
    tint: "oklch(0.96 0.004 240)",
    tintFg: "oklch(0.52 0.010 250)",
  },
  {
    id: 6,
    gameId: 6,
    title: "Late Night Talks",
    category: "Little Things",
    shortDescription: "The hours that never felt long.",
    fullMessage: "Placeholder message — a little thing we always do will live here.",
    tint: "oklch(0.92 0.050 150)",
    tintFg: "oklch(0.48 0.08 155)",
  },
  {
    id: 7,
    gameId: 7,
    title: "How You Stay",
    category: "Reason I Love You",
    shortDescription: "Even on the difficult days.",
    fullMessage: "Placeholder message — a reason I love you will live here.",
    tint: "oklch(0.91 0.045 240)",
    tintFg: "oklch(0.50 0.09 245)",
  },
  {
    id: 8,
    gameId: 8,
    title: "Somewhere Far Away",
    category: "Future Dream",
    shortDescription: "A place we still have to see together.",
    fullMessage: "Placeholder message — a future dream will live here.",
    tint: "oklch(0.91 0.050 350)",
    tintFg: "oklch(0.50 0.10 350)",
  },
  {
    id: 9,
    gameId: 9,
    title: "A Letter For You",
    category: "Letter",
    shortDescription: "The words I saved for last.",
    fullMessage: "Placeholder message — the final letter will live here.",
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
