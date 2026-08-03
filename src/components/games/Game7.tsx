import { useCallback, useEffect, useRef, useState } from "react";
import { Lightbulb, RotateCcw, X } from "lucide-react";
import { launchCelebrationConfetti } from "@/lib/confetti";

const ACCENT = "#C8E1F2";
const ACCENT_DEEP = "#7FA8C4";
const CODE = "1219";
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const STEP = 360 / DIGITS.length;

/* ---------- helpers ---------- */

function normalize(angle: number) {
  return ((angle % 360) + 360) % 360;
}

/** angle (deg) from dial centre to a pointer position */
function pointerAngle(el: HTMLElement, clientX: number, clientY: number) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
}

/** which digit sits under the top marker for a given rotation */
function digitAtTop(rotation: number) {
  const index = Math.round(normalize(-rotation) / STEP) % DIGITS.length;
  return DIGITS[(index + DIGITS.length) % DIGITS.length];
}

/** nearest rotation that snaps a digit exactly under the marker */
function snapRotation(rotation: number) {
  return Math.round(rotation / STEP) * STEP;
}

/* ---------- small building blocks ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="g7-fade surface mt-6 w-full rounded-[1.75rem] p-7 text-center">{children}</div>
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
      className="press inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm text-foreground shadow-sm transition active:scale-95"
      style={{ background: ACCENT }}
    >
      {children}
    </button>
  );
}

function Styles() {
  return (
    <style>{`
      @keyframes g7-fade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      .g7-fade { animation: g7-fade .5s cubic-bezier(.22,1,.36,1) both; }
      @keyframes g7-pop { 0% { opacity: 0; transform: scale(.9); } 60% { transform: scale(1.02); } 100% { opacity: 1; transform: scale(1); } }
      .g7-pop { animation: g7-pop .45s cubic-bezier(.22,1.4,.36,1) both; }
      @keyframes g7-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(3px); } }
      .g7-shake { animation: g7-shake .45s ease-in-out; }
      @keyframes g7-digit { from { opacity: 0; transform: translateY(-8px) scale(.8); } to { opacity: 1; transform: none; } }
      .g7-digit { animation: g7-digit .3s cubic-bezier(.22,1.4,.36,1) both; }
      @keyframes g7-float-in { 0% { opacity: 0; transform: translateY(40px) scale(.9); } 70% { transform: translateY(-8px) scale(1.02); } 100% { opacity: 1; transform: none; } }
      @keyframes g7-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      .g7-envelope { animation: g7-float-in .9s cubic-bezier(.22,1,.36,1) both, g7-bounce 2.6s ease-in-out 1s infinite; }
    `}</style>
  );
}

/* ---------- dial ---------- */

function Dial({
  onPick,
  onClose,
}: {
  onPick: (digit: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef<{ pointer: number; rotation: number } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);

  const begin = (x: number, y: number) => {
    if (!ref.current) return;
    start.current = { pointer: pointerAngle(ref.current, x, y), rotation };
    setDragging(true);
  };

  const move = (x: number, y: number) => {
    if (!ref.current || !start.current) return;
    const delta = pointerAngle(ref.current, x, y) - start.current.pointer;
    setRotation(start.current.rotation + delta);
  };

  const end = () => {
    if (!start.current) return;
    const moved = Math.abs(rotation - start.current.rotation) > 4;
    start.current = null;
    setDragging(false);
    const snapped = snapRotation(rotation);
    setRotation(snapped);
    if (moved) onPick(digitAtTop(snapped));
  };

  const current = digitAtTop(snapRotation(rotation));

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-foreground/40 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Combination dial"
    >
      <p className="g7-fade text-center text-sm text-background/90 sm:text-base">
        Drag the dial — release on a number to enter it.
      </p>

      <div className="g7-pop relative">
        {/* top marker */}
        <div
          className="absolute left-1/2 top-[-14px] z-10 size-0 -translate-x-1/2 border-x-8 border-t-[14px] border-x-transparent"
          style={{ borderTopColor: ACCENT }}
        />
        <div
          ref={ref}
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            begin(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => dragging && move(e.clientX, e.clientY)}
          onPointerUp={end}
          onPointerCancel={end}
          className="relative size-[17rem] touch-none select-none rounded-full sm:size-80"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #f4f7fa 0%, #c9d2da 45%, #8e99a4 100%)",
            boxShadow:
              "0 18px 40px -14px rgba(0,0,0,.55), inset 0 2px 4px rgba(255,255,255,.7), inset 0 -6px 14px rgba(0,0,0,.28)",
            transform: `rotate(${rotation}deg)`,
            transition: dragging ? "none" : "transform .45s cubic-bezier(.22,1.3,.36,1)",
          }}
        >
          {DIGITS.map((d, i) => (
            <span
              key={d}
              className="absolute left-1/2 top-1/2 text-lg font-semibold text-slate-700"
              style={{
                transform: `rotate(${i * STEP}deg) translateY(-6.4rem) rotate(${-i * STEP - rotation}deg) translate(-50%, -50%)`,
              }}
            >
              {d}
            </span>
          ))}
          <span
            className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xl font-semibold text-slate-700"
            style={{
              background: "radial-gradient(circle at 35% 30%, #ffffff, #dfe6ec 60%, #aab4bd)",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,.8), 0 6px 14px rgba(0,0,0,.25)",
              transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
            }}
          >
            {current}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="press inline-flex items-center gap-2 rounded-full bg-background px-6 py-2.5 text-sm text-foreground active:scale-95"
      >
        <X className="size-4" strokeWidth={1.5} /> Close dial
      </button>
    </div>
  );
}

/* ---------- hint modal ---------- */

function HintModal({
  stage,
  onAck,
  onClose,
}: {
  stage: 1 | 2;
  onAck: () => void;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => setDone(false), [stage]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Hint"
    >
      <div className="surface g7-pop w-full max-w-xs rounded-[1.75rem] p-7 text-center">
        {!done ? (
          <>
            <span className="text-3xl">{stage === 1 ? "💧" : "💪"}</span>
            <p className="mt-4 text-base text-foreground">
              {stage === 1 ? "Before your next clue..." : "Do one full push-up."}
            </p>
            {stage === 1 && (
              <p className="mt-2 text-sm text-muted-foreground">
                Take a short break and hydrate.
              </p>
            )}
            <div className="mt-6">
              <PrimaryButton
                onClick={() => {
                  setDone(true);
                  onAck();
                }}
              >
                {stage === 1 ? "I'm hydrated" : "I Did It"}
              </PrimaryButton>
            </div>
          </>
        ) : (
          <>
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              {stage === 1 ? "Hint" : "Reward"}
            </p>
            <p className="mt-3 text-lg text-foreground">
              {stage === 1 ? "Yosef + Bella's special day" : "**** + ***"}
            </p>
            {stage === 2 && (
              <p className="mt-2 text-xs text-muted-foreground">Code revealed</p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="press mt-6 rounded-full border border-border/70 px-6 py-2.5 text-sm text-muted-foreground active:scale-95"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- main ---------- */

export function Game7() {
  const [phase, setPhase] = useState<"intro" | "vault" | "open">("intro");
  const [entry, setEntry] = useState<number[]>([]);
  const [dialOpen, setDialOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [hintStage, setHintStage] = useState<1 | 2>(1);
  const [hintUsed, setHintUsed] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  const succeed = useCallback(() => {
    setDialOpen(false);
    setPhase("open");
    launchCelebrationConfetti();
  }, []);

  const pick = useCallback(
    (digit: number) => {
      setMessage(null);
      setEntry((prev) => {
        if (prev.length >= 4) return prev;
        const next = [...prev, digit];
        if (next.length === 4) {
          const guess = next.join("");
          window.setTimeout(() => {
            if (guess === CODE) {
              succeed();
            } else {
              setShake(true);
              setMessage("Not quite... try another");
              window.setTimeout(() => setShake(false), 460);
              window.setTimeout(() => setEntry([]), 700);
            }
          }, 420);
        }
        return next;
      });
    },
    [succeed],
  );

  const openHint = () => {
    const stage: 1 | 2 = hintUsed === 0 ? 1 : 2;
    setHintStage(stage);
    setHintUsed((n) => n + 1);
    setHintOpen(true);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Styles />

      {phase !== "intro" && (
        <div className="mt-2 flex w-full items-center justify-end">
          <button
            type="button"
            onClick={openHint}
            aria-label="Hint"
            className="press inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs text-muted-foreground active:scale-95"
          >
            <Lightbulb className="size-4" strokeWidth={1.5} /> Hint
          </button>
        </div>
      )}

      {phase === "intro" && (
        <Card>
          <h1 className="font-display text-2xl leading-snug text-foreground">
            Every little memory unlocks something.
          </h1>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>Sometimes the answers aren't hidden.</p>
            <p>They're quietly waiting inside memories we've shared.</p>
            <p>
              Little moments.
              <br />
              Little dates.
              <br />
              Little pieces that become something bigger.
            </p>
            <p>And I know you'll figure this one out.</p>
            <p className="text-base">❤️</p>
          </div>
          <div className="mt-7">
            <PrimaryButton onClick={() => setPhase("vault")}>Begin</PrimaryButton>
          </div>
        </Card>
      )}

      {phase === "vault" && (
        <div className="g7-fade mt-4 flex w-full flex-col items-center">
          <img
            src="/images/puzzle/game7.png"
            alt="A safe waiting to be opened"
            loading="lazy"
            decoding="async"
            className="w-40 max-w-full drop-shadow-md sm:w-48"
          />

          <div
            className={`mt-5 w-full max-w-sm rounded-[1.6rem] p-5 ${shake ? "g7-shake" : ""}`}
            style={{
              background: "linear-gradient(160deg, #4a5259 0%, #2f353b 55%, #23282d 100%)",
              boxShadow:
                "0 22px 44px -20px rgba(0,0,0,.6), inset 0 1px 2px rgba(255,255,255,.18)",
            }}
          >
            <div
              className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "linear-gradient(180deg, #10161b, #1c242b)",
                boxShadow: "inset 0 2px 6px rgba(0,0,0,.8)",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-6 text-center font-mono text-2xl ${entry[i] !== undefined ? "g7-digit" : ""}`}
                  style={{ color: entry[i] !== undefined ? ACCENT : "#5b6a76" }}
                >
                  {entry[i] !== undefined ? entry[i] : "_"}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDialOpen(true)}
              aria-label="Open the combination dial"
              className="mx-auto mt-6 block size-40 rounded-full transition active:scale-95 sm:size-44"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, #f6f8fa 0%, #c7d0d8 45%, #8a949e 100%)",
                boxShadow:
                  "0 14px 28px -10px rgba(0,0,0,.7), inset 0 2px 4px rgba(255,255,255,.7), inset 0 -6px 14px rgba(0,0,0,.3)",
              }}
            >
              <span
                className="mx-auto flex size-20 items-center justify-center rounded-full text-[0.6rem] uppercase tracking-[0.2em] text-slate-600"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #ffffff, #dfe6ec 60%, #aab4bd)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,.8), 0 6px 12px rgba(0,0,0,.25)",
                }}
              >
                Turn
              </span>
            </button>

            <div className="mt-5 flex items-center justify-between px-1">
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-400">
                Combination
              </span>
              <button
                type="button"
                onClick={() => {
                  setEntry([]);
                  setMessage(null);
                }}
                aria-label="Reset the code"
                className="press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.65rem] text-slate-300 active:scale-95"
              >
                <RotateCcw className="size-3.5" strokeWidth={1.5} /> Reset
              </button>
            </div>
          </div>

          <p
            className="mt-4 h-5 text-sm"
            style={{ color: ACCENT_DEEP, opacity: message ? 1 : 0 }}
          >
            {message ?? "‎"}
          </p>
        </div>
      )}

      {phase === "open" && (
        <div className="g7-fade mt-8 flex w-full flex-col items-center gap-6">
          <p className="text-sm text-muted-foreground">The vault clicks open. ❤️</p>

          {!letterOpen ? (
            <button
              type="button"
              onClick={() => setLetterOpen(true)}
              aria-label="Open the envelope"
              className="g7-envelope relative h-32 w-48 rounded-xl shadow-sm transition active:scale-95"
              style={{ background: "#EAF3FA", border: `1px solid ${ACCENT}` }}
            >
              <span
                className="absolute inset-x-0 top-0 h-16 rounded-t-xl"
                style={{
                  background: ACCENT,
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Tap to open
              </span>
            </button>
          ) : (
            <div className="surface g7-pop w-full max-w-sm rounded-[1.75rem] p-7 text-center">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
                Your next clue
              </p>
              <p className="mt-4 text-2xl">❤️</p>
              <p className="mt-3 text-base leading-relaxed text-foreground">
                Look where morning light loves to say hello.
              </p>
              <button
                type="button"
                onClick={() => setLetterOpen(false)}
                className="press mt-6 rounded-full border border-border/70 px-6 py-2.5 text-sm text-muted-foreground active:scale-95"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {dialOpen && <Dial onPick={pick} onClose={() => setDialOpen(false)} />}
      {hintOpen && (
        <HintModal stage={hintStage} onAck={() => {}} onClose={() => setHintOpen(false)} />
      )}
    </div>
  );
}
