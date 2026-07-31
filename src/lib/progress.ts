import { useCallback, useEffect, useState } from "react";

export const TOTAL_GAMES = 9;
const STORAGE_KEY = "anniversary-hunt-progress-v1";

export type Progress = {
  unlocked: boolean;
  completedGames: number[];
  /** free-form per-game state so each mini game can store its own progress later */
  gameState: Record<string, unknown>;
};

const emptyProgress: Progress = {
  unlocked: false,
  completedGames: [],
  gameState: {},
};

function read(): Progress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      unlocked: Boolean(parsed.unlocked),
      completedGames: Array.isArray(parsed.completedGames) ? parsed.completedGames : [],
      gameState: parsed.gameState && typeof parsed.gameState === "object" ? parsed.gameState : {},
    };
  } catch {
    return emptyProgress;
  }
}

function write(progress: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* storage unavailable — ignore */
  }
}

/**
 * Single source of truth for persisted progress.
 * Hydration-safe: starts empty on the server and loads from localStorage after mount.
 */
export function useProgress() {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(read());
    setLoaded(true);
  }, []);

  const update = useCallback((patch: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = patch(prev);
      write(next);
      return next;
    });
  }, []);

  const unlock = useCallback(() => update((p) => ({ ...p, unlocked: true })), [update]);

  const lock = useCallback(() => update((p) => ({ ...p, unlocked: false })), [update]);

  const completeGame = useCallback(
    (id: number) =>
      update((p) =>
        p.completedGames.includes(id)
          ? p
          : { ...p, completedGames: [...p.completedGames, id].sort((a, b) => a - b) },
      ),
    [update],
  );

  const setGameState = useCallback(
    (id: number, state: unknown) =>
      update((p) => ({ ...p, gameState: { ...p.gameState, [`game-${id}`]: state } })),
    [update],
  );

  const reset = useCallback(() => update(() => emptyProgress), [update]);

  return { progress, loaded, unlock, lock, completeGame, setGameState, reset };
}
