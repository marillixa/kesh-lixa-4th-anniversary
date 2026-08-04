import { useEffect, useRef, useState } from "react";
import { launchCelebrationConfetti } from "@/lib/confetti";

const ACCENT = "#FBEFC2";
const RING = "#D7A977";

/** difference locations as % of the image box, taken from the reference sheet */
const SPOTS: { id: number; x: number; y: number }[] = [
  { id: 1, x: 7.6, y: 5.2 },
  { id: 2, x: 17.1, y: 18.3 },
  { id: 3, x: 35.9, y: 24.4 },
  { id: 4, x: 88.4, y: 16.9 },
  { id: 5, x: 68.6, y: 3.3 },
  { id: 6, x: 15.0, y: 48.7 },
  { id: 7, x: 72.2, y: 40.5 },
  { id: 8, x: 30.9, y: 78.0 },
  { id: 9, x: 44.7, y: 97.9 },
  { id: 10, x: 66.2, y: 97.5 },
];

const TOTAL = SPOTS.length;

type Ripple = { key: number; x: number; y: number; top: boolean };

function Styles() {
  return (
    <style>{`
      @keyframes g1-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      .g1-fade { animation: g1-fade .5s cubic-bezier(.22,1,.36,1) both; }
      @keyframes g1-pop { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.4); } 60% { opacity: 1; transform: translate(-50%,-50%) scale(1.18); } 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
      .g1-pop { animation: g1-pop .45s cubic-bezier(.22,1.4,.36,1) both; }
      @keyframes g1-ripple { 0% { opacity: .7; transform: translate(-50%,-50%) scale(.3); } 100% { opacity: 0; transform: translate(-50%,-50%) scale(1.4); } }
      .g1-ripple { animation: g1-ripple .5s ease-out forwards; }
      @keyframes g1-float-in { 0% { opacity: 0; transform: translateY(40px) scale(.9); } 70% { transform: translateY(-8px) scale(1.02); } 100% { opacity: 1; transform: none; } }
      @keyframes g1-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .g1-envelope { animation: g1-float-in .9s cubic-bezier(.22,1,.36,1) both, g1-bounce 2.2s ease-in-out 1s infinite; }
    `}</style>
  );
}

function PuzzleImage({
  src,
  alt,
  found,
  onTap,
}: {
  src: string;
  alt: string;
  found: number[];
  onTap: (xPct: number, yPct: number, rect: DOMRect) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handle = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const key = Date.now() + Math.random();
    setRipples((r) => [...r, { key, x: xPct, y: yPct, top: true }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.key !== key)), 520);
    onTap(xPct, yPct, rect);
  };

  return (
    <div
      ref={ref}
      onClick={handle}
      role="presentation"
      className="relative w-full cursor-pointer select-none overflow-hidden rounded-2xl bg-card shadow-sm"
    >
      <img src={src} alt={alt} className="block w-full" draggable={false} />
      {SPOTS.filter((s) => found.includes(s.id)).map((s) => (
        <span
          key={s.id}
          className="g1-pop pointer-events-none absolute block rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: "13%",
            aspectRatio: "1",
            border: `3px solid ${RING}`,
            background: "rgba(215,169,119,0.18)",
          }}
        />
      ))}
      {ripples.map((r) => (
        <span
          key={r.key}
          className="g1-ripple pointer-events-none absolute block rounded-full"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            width: "12%",
            aspectRatio: "1",
            border: `2px solid ${RING}`,
          }}
        />
      ))}
    </div>
  );
}

export function Game1() {
  const [started, setStarted] = useState(false);
  const [found, setFound] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const complete = found.length === TOTAL;

  useEffect(() => {
    if (!complete) return;
    launchCelebrationConfetti();
    const t = setTimeout(() => setDone(true), 1000);
    return () => clearTimeout(t);
  }, [complete]);

  const handleTap = (xPct: number, yPct: number, rect: DOMRect) => {
    const tolerance = Math.max(34, rect.width * 0.07);
    for (const spot of SPOTS) {
      if (found.includes(spot.id)) continue;
      const dx = ((xPct - spot.x) / 100) * rect.width;
      const dy = ((yPct - spot.y) / 100) * rect.height;
      if (Math.hypot(dx, dy) <= tolerance) {
        setFound((f) => (f.includes(spot.id) ? f : [...f, spot.id]));
        return;
      }
    }
  };

  if (!started) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Styles />
        <div
          className="g1-fade surface w-full rounded-[1.75rem] p-8 text-center"
          style={{ background: "#FFFDF6" }}
        >
          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">Game 1</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-foreground">
            Spot the Difference
          </h1>
          <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Every little detail tells a story.
            <br />
            Let's see how closely you've been paying attention to ours. ❤️
          </p>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="press mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm text-foreground shadow-sm transition active:scale-95"
            style={{ background: ACCENT }}
          >
            Begin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="g1-fade flex w-full flex-col items-center">
      <Styles />

      <header className="mt-4 text-center">
        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">Game 1</p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-foreground">
          Spot the Difference
        </h1>
        <p
          className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-foreground"
          style={{ background: ACCENT }}
        >
          ❤️ {found.length} / {TOTAL} Found
        </p>
      </header>

      <div className="mt-6 flex w-full flex-col gap-3">
        <PuzzleImage
          src="/images/puzzle/game1.1.jpeg"
          alt="First cozy bedroom scene"
          found={found}
          onTap={handleTap}
        />
        <PuzzleImage
          src="/images/puzzle/game1.2.png"
          alt="Second cozy bedroom scene with small differences"
          found={found}
          onTap={handleTap}
        />
      </div>

      {done && (
        <div className="g1-fade mt-8 flex w-full flex-col items-center gap-6">
          <p className="text-center text-sm text-muted-foreground">
            You found every little detail. ❤️
          </p>

          {!letterOpen ? (
            <button
              type="button"
              onClick={() => setLetterOpen(true)}
              aria-label="Open the envelope"
              className="g1-envelope relative h-32 w-48 rounded-xl shadow-sm transition active:scale-95"
              style={{ background: "#FFFDF6", border: `1px solid ${ACCENT}` }}
            >
              <span
                className="absolute inset-x-0 top-0 h-16 rounded-t-xl"
                style={{ background: ACCENT, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Tap to open
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLetterOpen(false)}
              className="surface g1-pop w-full max-w-sm rounded-[1.75rem] p-7 text-center"
              style={{ animationName: "g1-fade", transform: "none" }}
            >
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                Your next clue
              </p>
              <p className="mt-4 text-2xl">📱</p>
              <p className="mt-3 text-base leading-relaxed text-foreground">
                Look where I always end up when I'm watching TikTok. ❤️
              </p>
              <p className="mt-6 text-xs text-muted-foreground">Tap to close</p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
