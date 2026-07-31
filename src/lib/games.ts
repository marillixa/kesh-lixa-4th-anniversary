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
};

/** Placeholder metadata — each mini game gets built in a later step. */
export const GAMES: GameMeta[] = [
  { id: 1, title: "Game 1", hint: "A soft beginning", Icon: Heart },
  { id: 2, title: "Game 2", hint: "Listen closely", Icon: Music },
  { id: 3, title: "Game 3", hint: "A moment captured", Icon: Camera },
  { id: 4, title: "Game 4", hint: "Pieces of us", Icon: Puzzle },
  { id: 5, title: "Game 5", hint: "Make a wish", Icon: Star },
  { id: 6, title: "Game 6", hint: "Late night talks", Icon: Moon },
  { id: 7, title: "Game 7", hint: "Little words", Icon: Feather },
  { id: 8, title: "Game 8", hint: "Something locked", Icon: Key },
  { id: 9, title: "Game 9", hint: "The last surprise", Icon: Gift },
];
