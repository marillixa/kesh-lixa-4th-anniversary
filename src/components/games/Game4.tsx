import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { launchCelebrationConfetti } from "@/lib/confetti";

/* ------------------------------------------------------------------ */
/* maze definition — virtual coordinate space, scaled to the container */
/* ------------------------------------------------------------------ */

const VW = 300; // virtual width
const VH = 460; // virtual height

type Rect = { x: number; y: number; w: number; h: number };

type Level = {
  paths: Rect[];
  start: { x: number; y: number };
  finish: Rect;
  /** optional area that fires the jumpscare instead of the finish */
  trigger?: Rect;
};

const LEVEL_1: Level = {
  paths: [
    { x: 20, y: 40, w: 70, h: 400 }, // long vertical hallway
    { x: 20, y: 20, w: 270, h: 70 }, // top hallway to the finish
  ],
  start: { x: 55, y: 405 },
  finish: { x: 240, y: 22, w: 48, h: 46 },
};

const LEVEL_2: Level = {
  paths: [
    { x: 20, y: 20, w: 260, h: 40 }, // row 1
    { x: 20, y: 60, w: 40, h: 60 }, // down (left)
    { x: 20, y: 120, w: 260, h: 40 }, // row 2
    { x: 240, y: 160, w: 40, h: 60 }, // down (right)
    { x: 20, y: 220, w: 260, h: 40 }, // row 3
    { x: 20, y: 260, w: 40, h: 60 }, // down (left)
    { x: 20, y: 320, w: 260, h: 40 }, // row 4
  ],
  start: { x: 262, y: 40 },
  finish: { x: 244, y: 322, w: 36, h: 36 },
  trigger: { x: 52, y: 222, w: 34, h: 36 },
};

const LEVELS = [LEVEL_1, LEVEL_2];

function inRect(x: number, y: number, r: Rect) {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

function onPath(x: number, y: number, level: Level) {
  return level.paths.some((r) => inRect(x, y, r));
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/* ------------------------------------------------------------------ */

type Phase = "intro" | "playing" | "levelComplete" | "jumpscare" | "ending";

export function Game4() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [levelIndex, setLevelIndex] = useState(0);
  const level = LEVELS[levelIndex];

  const [player, setPlayer] = useState(level.start);
  const [dragging, setDragging] = useState(false);
  const [shake, setShake] = useState(false);
  const [oops, setOops] = useState(false);
  const [scale, setScale] = useState(1);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const oopsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* responsive scaling */
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const maxH = Math.max(320, window.innerHeight - 260);
      setScale(Math.min(w / VW, maxH / VH));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [phase]);

  useEffect(
    () => () => {
      if (oopsTimer.current) clearTimeout(oopsTimer.current);
    },
    [],
  );

  const resetPlayer = useCallback(() => setPlayer(LEVELS[levelIndex].start), [levelIndex]);

  const fail = useCallback(() => {
    setDragging(false);
    resetPlayer();
    setShake(true);
    setOops(true);
    window.setTimeout(() => setShake(false), 420);
    if (oopsTimer.current) clearTimeout(oopsTimer.current);
    oopsTimer.current = setTimeout(() => setOops(false), 1400);
  }, [resetPlayer]);

  const startJumpscare = useCallback(() => {
    setDragging(false);
    setPhase("jumpscare");
    const audio = new Audio("/music/puzzle/jumpscare.mp3");
    audioRef.current = audio;
    audio.volume = 1;
    void audio.play().catch(() => {
      /* autoplay blocked — visual only */
    });
    window.setTimeout(() => {
      audio.pause();
      setPhase("ending");
      launchCelebrationConfetti();
    }, 4000);
  }, []);

  function handleMove(clientX: number, clientY: number) {
    if (!dragging || phase !== "playing") return;
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / scale, 0, VW);
    const y = clamp((clientY - rect.top) / scale, 0, VH);

    if (level.trigger && inRect(x, y, level.trigger)) {
      setPlayer({ x, y });
      startJumpscare();
      return;
    }

    if (inRect(x, y, level.finish)) {
      setPlayer({ x, y });
      setDragging(false);
      setPhase("levelComplete");
      return;
    }

    if (!onPath(x, y, level)) {
      fail();
      return;
    }

    setPlayer({ x, y });
  }

  function retry() {
    setDragging(false);
    setOops(false);
    resetPlayer();
    setPhase("playing");
  }

  function nextLevel() {
    const next = levelIndex + 1;
    setLevelIndex(next);
    setPlayer(LEVELS[next].start);
    setPhase("playing");
  }

  return (
    <div className="flex flex-1 flex-col">
      <LocalStyles />

      {/* header — retry only (Back lives in the page shell) */}
      <div className="mt-2 flex justify-end">
        {(phase === "playing" || phase === "levelComplete") && (
          <button
            type="button"
            onClick={retry}
            aria-label="Restart level"
            className="press inline-flex size-10 items-center justify-center rounded-full transition active:scale-90"
            style={{ background: "#F9DFC0" }}
          >
            <RotateCcw className="size-4" strokeWidth={1.75} />
          </button>
        )}
      </div>

      {phase === "intro" && (
        <Card>
          <h1 className="text-3xl">Keep Going</h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Sometimes life asks us to walk through paths we can't completely see.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            We hesitate.
            <br />
            We get lost.
            <br />
            We make wrong turns.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            But every little step still brings us somewhere.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            And no matter how scary things may seem...
            <br />I know you'll always find your way.
          </p>
          <p className="max-w-sm font-medium">❤️ Ready?</p>
          <PrimaryButton onClick={() => setPhase("playing")}>Begin</PrimaryButton>
        </Card>
      )}

      {(phase === "playing" || phase === "levelComplete" || phase === "jumpscare") && (
        <Card>
          <h2 className="text-xl tracking-tight">Level {levelIndex + 1}</h2>
          <p className="text-xs text-muted-foreground">
            Drag the ♥ along the peach path — don't touch the dark.
          </p>

          <div ref={wrapRef} className="w-full">
            <div
              className="mx-auto"
              style={{ width: VW * scale, height: VH * scale }}
            >
              <div
                ref={boardRef}
                className={`relative overflow-hidden rounded-2xl bg-[#151116] touch-none ${
                  shake ? "g4-shake" : ""
                }`}
                style={{
                  width: VW,
                  height: VH,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => dragging && fail()}
                onTouchMove={(e) => {
                  const t = e.touches[0];
                  if (t) handleMove(t.clientX, t.clientY);
                }}
                onTouchEnd={() => setDragging(false)}
              >
                {level.paths.map((r, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: r.x,
                      top: r.y,
                      width: r.w,
                      height: r.h,
                      background: "#F9DFC0",
                    }}
                  />
                ))}

                <div
                  className="absolute rounded-[2px]"
                  style={{
                    left: level.finish.x,
                    top: level.finish.y,
                    width: level.finish.w,
                    height: level.finish.h,
                    background: "#FF8B4C",
                  }}
                />

                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Drag the heart"
                  onMouseDown={() => setDragging(true)}
                  onTouchStart={() => setDragging(true)}
                  className="absolute select-none leading-none"
                  style={{
                    left: player.x - 7,
                    top: player.y - 8,
                    fontSize: 16,
                    color: "#D9536F",
                    cursor: "grab",
                    transition: dragging ? "none" : "left .25s cubic-bezier(.34,1.56,.64,1), top .25s cubic-bezier(.34,1.56,.64,1)",
                  }}
                >
                  ♥
                </div>

                {oops && (
                  <div className="g4-fade pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-[#F9DFC0]">
                    Oops... try again ❤️
                  </div>
                )}
              </div>
            </div>
          </div>

          {phase === "levelComplete" && (
            <div className="g4-pop flex flex-col items-center gap-4">
              <p className="text-lg">Level Complete</p>
              <PrimaryButton onClick={nextLevel}>Continue</PrimaryButton>
            </div>
          )}
        </Card>
      )}

      {phase === "jumpscare" && (
        <div className="g4-shake fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <img
            src="/images/puzzle/game4.webp"
            alt=""
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}

      {phase === "ending" && (
        <Card>
          <div className="g4-fade flex flex-col items-center gap-6">
            <p className="text-sm text-muted-foreground">You made it through. ❤️</p>

            {!envelopeOpen ? (
              <button
                type="button"
                onClick={() => setEnvelopeOpen(true)}
                aria-label="Open the envelope"
                className="g4-bounce relative h-32 w-48 rounded-xl shadow-sm transition active:scale-95"
                style={{ background: "#FFF6E9", border: "1px solid #F1D9BC" }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-16 rounded-t-xl"
                  style={{
                    background: "#F9DFC0",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Tap to open
                </span>
              </button>
            ) : (
              <div
                className="g4-pop w-full max-w-xs rounded-2xl p-6 text-center"
                style={{ background: "#FFF6E9", border: "1px solid #F1D9BC" }}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Your clue
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  Look beneath where you lay your pretty head.
                </p>
                <p className="mt-2 text-lg">❤️</p>
                <button
                  type="button"
                  onClick={() => setEnvelopeOpen(false)}
                  className="press mt-5 rounded-full px-5 py-2 text-xs transition active:scale-95"
                  style={{ background: "#F9DFC0" }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="surface animate-soft-in mt-4 flex flex-1 flex-col items-center justify-center gap-5 rounded-3xl p-6 text-center sm:p-8"
      style={{ background: "#FFF8F0", border: "1px solid #F9DFC0" }}
    >
      {children}
    </section>
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-8 py-3 text-sm font-medium transition duration-300 hover:scale-105 active:scale-95"
      style={{ background: "#F9DFC0" }}
    >
      {children}
    </button>
  );
}

function LocalStyles() {
  return (
    <style>{`
      @keyframes g4-shake {
        0%,100% { transform: translate3d(0,0,0); }
        20% { transform: translate3d(-6px,2px,0); }
        40% { transform: translate3d(5px,-3px,0); }
        60% { transform: translate3d(-4px,3px,0); }
        80% { transform: translate3d(4px,-2px,0); }
      }
      .g4-shake { animation: g4-shake .42s cubic-bezier(.36,.07,.19,.97) both; }

      @keyframes g4-fade {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .g4-fade { animation: g4-fade .45s ease-out both; }

      @keyframes g4-pop {
        0% { opacity: 0; transform: scale(.9); }
        60% { opacity: 1; transform: scale(1.03); }
        100% { opacity: 1; transform: scale(1); }
      }
      .g4-pop { animation: g4-pop .5s cubic-bezier(.34,1.56,.64,1) both; }

      @keyframes g4-bounce {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .g4-bounce { animation: g4-bounce 2.2s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .g4-shake, .g4-bounce, .g4-pop, .g4-fade { animation: none; }
      }
    `}</style>
  );
}
