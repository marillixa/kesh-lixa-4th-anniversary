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
  const step = finished && !together ? TOTAL - 1 : done;
  const travel = together ? 46 : (step / (TOTAL - 1)) * 40;

  const style = (dir: 1 | -1) => ({
    transform: `translateX(${dir * travel}%)`,
    transition: "transform 500ms ease-in-out",
  });

  return (
    <div className="animate-fade-up mx-auto mt-6 flex w-full max-w-xs items-center justify-between [animation-delay:80ms]">
      <img
        src={lixabella.url}
        alt="Lixa and Bella"
        className="h-10 w-auto select-none"
        style={style(1)}
        draggable={false}
      />
      <span
        aria-hidden
        className="text-sm"
        style={{
          color: "oklch(0.72 0.12 0)",
          opacity: together ? 0 : 1,
          transform: popped && !together ? "scale(1.25)" : "scale(1)",
          transition: "transform 300ms ease-in-out, opacity 300ms ease-in-out",
        }}
      >
        ❤︎
      </span>
      <img
        src={keshyosef.url}
        alt="Kesh and Yosef"
        className="h-10 w-auto select-none"
        style={style(-1)}
        draggable={false}
      />
    </div>
  );
}
