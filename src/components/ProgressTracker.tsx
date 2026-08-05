import { useEffect, useState } from "react";
import lixabella from "@/assets/lixabella.png.asset.json";
import keshyosef from "@/assets/keshyosef.png.asset.json";

const TOTAL = 9;

/**
 * Lixabella walks in from the left, Kesh & Yosef from the right.
 * Each completed game moves both a step closer. At 9/9 the heart pops,
 * then both take a final step and meet in the middle.
 */
export function ProgressTracker({ completed }: { completed: number }) {
  const done = Math.min(completed, TOTAL);
  const finished = done >= TOTAL;

  const [popped, setPopped] = useState(false);
  const [together, setTogether] = useState(false);

  useEffect(() => {
    if (!finished) {
      setPopped(false);
      setTogether(false);
      return;
    }
    setPopped(true);
    const t = window.setTimeout(() => setTogether(true), 300);
    return () => window.clearTimeout(t);
  }, [finished]);

  // 0 → 0% travel, 8 → ~40% travel, final step closes the gap
  // Gap shrinks every completed game.
// Starts around 180px apart and gradually closes.

const gap = together
  ? 4
  : Math.max(20, 180 - done * 20);

  return (
    <div className="animate-fade-up mx-auto mt-6 flex items-center justify-center">
      <img
  src={lixabella.url}
  alt="Lixa and Bella"
  className="h-10 w-auto select-none transition-all duration-500 ease-in-out"
  draggable={false}
/>

<div
  className="flex items-center justify-center transition-all duration-500 ease-in-out"
  style={{
    width: together ? 0 : gap,
  }}
>
  <span
    className="text-sm"
    style={{
      opacity: together ? 0 : 1,
      transform:
        popped && !together
          ? "scale(1.3)"
          : "scale(1)",
      transition:
        "transform 300ms ease, opacity 300ms ease",
    }}
  >
    ❤️
  </span>
</div>

<img
  src={keshyosef.url}
  alt="Kesh and Yosef"
  className="h-10 w-auto select-none transition-all duration-500 ease-in-out"
  draggable={false}
/>
    </div>
  );
}
