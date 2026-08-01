import {
  Heart,
  Music,
  Camera,
  Puzzle,
  Star,
  Moon,
  Feather,
  Key,
  Gift,
  type LucideIcon,
} from "lucide-react";

export type GameMeta = {
  id: number;
  title: string;
  hint: string;
  Icon: LucideIcon;
  /** pastel tint used for the tile icon chip */
  tint: string;
  /** matching deeper tone for the icon stroke */
  tintFg: string;
};

/** Placeholder metadata — each mini game gets built in a later step. */
export const GAMES: GameMeta[] = [
  { id: 1, title: "Game 1", hint: "A soft beginning", Icon: Heart, tint: "oklch(0.93 0.055 95)", tintFg: "oklch(0.52 0.09 85)" },
  { id: 2, title: "Game 2", hint: "Listen closely", Icon: Music, tint: "oklch(0.90 0.050 300)", tintFg: "oklch(0.48 0.10 300)" },
  { id: 3, title: "Game 3", hint: "A moment captured", Icon: Camera, tint: "oklch(0.90 0.055 20)", tintFg: "oklch(0.50 0.12 22)" },
  { id: 4, title: "Game 4", hint: "Pieces of us", Icon: Puzzle, tint: "oklch(0.92 0.055 60)", tintFg: "oklch(0.52 0.11 55)" },
  { id: 5, title: "Game 5", hint: "Make a wish", Icon: Star, tint: "oklch(0.96 0.004 240)", tintFg: "oklch(0.52 0.010 250)" },
  { id: 6, title: "Incohearent", hint: "Late night talks", Icon: Moon, tint: "oklch(0.92 0.050 150)", tintFg: "oklch(0.48 0.08 155)" },
  { id: 7, title: "Game 7", hint: "Little words", Icon: Feather, tint: "oklch(0.91 0.045 240)", tintFg: "oklch(0.50 0.09 245)" },
  { id: 8, title: "Game 8", hint: "Something locked", Icon: Key, tint: "oklch(0.91 0.050 350)", tintFg: "oklch(0.50 0.10 350)" },
  { id: 9, title: "Game 9", hint: "The last surprise", Icon: Gift, tint: "oklch(0.90 0.035 60)", tintFg: "oklch(0.46 0.05 55)" },
];
