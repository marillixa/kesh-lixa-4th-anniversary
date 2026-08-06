import { useEffect } from "react";

/**
 * Plays a looping background track while the component is mounted.
 * Fades in on enter, fades out on unmount, and recovers from autoplay blocks
 * by starting on the first user interaction.
 */
export function useBackgroundMusic(
  src: string,
  { volume = 0.35, fadeMs = 2000 }: { volume?: number; fadeMs?: number } = {},
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    let raf = 0;
    let cancelled = false;

    const fade = (from: number, to: number, done?: () => void) => {
      cancelAnimationFrame(raf);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / fadeMs);
        audio.volume = Math.max(0, Math.min(1, from + (to - from) * t));
        if (t < 1) raf = requestAnimationFrame(step);
        else done?.();
      };
      raf = requestAnimationFrame(step);
    };

    const removeInteractionListeners = () => {
      for (const ev of ["pointerdown", "touchstart", "keydown"] as const) {
        window.removeEventListener(ev, onInteract);
      }
    };

    function onInteract() {
      removeInteractionListeners();
      void start();
    }

    const start = async () => {
      if (cancelled) return;
      try {
        await audio.play();
        if (cancelled) return;
        fade(0, volume);
      } catch {
        for (const ev of ["pointerdown", "touchstart", "keydown"] as const) {
          window.addEventListener(ev, onInteract, { once: true });
        }
      }
    };

    void start();

    return () => {
      cancelled = true;
      removeInteractionListeners();
      fade(audio.volume, 0, () => {
        audio.pause();
        audio.src = "";
      });
      setTimeout(() => {
        cancelAnimationFrame(raf);
        audio.pause();
        audio.src = "";
      }, fadeMs + 100);
    };
  }, [src, volume, fadeMs]);
}
