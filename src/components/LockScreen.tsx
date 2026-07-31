import { useEffect, useState } from "react";
import { Heart, Lock } from "lucide-react";
import { Keypad } from "./Keypad";

const PASSCODE = "0811";
const LENGTH = 4;

type HintStage = "none" | "kiss" | "revealed";

export function LockScreen({ onUnlocked }: { onUnlocked: () => void }) {
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);
  const [hintStage, setHintStage] = useState<HintStage>("none");
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    if (code.length !== LENGTH) return;
    if (code === PASSCODE) {
      setWrong(false);
      setUnlocking(true);
      const t = setTimeout(onUnlocked, 950);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setWrong(true);
      setCode("");
    }, 180);
    return () => clearTimeout(t);
  }, [code, onUnlocked]);

  const handleDigit = (d: string) => {
    if (unlocking) return;
    setWrong(false);
    setCode((c) => (c.length >= LENGTH ? c : c + d));
  };

  return (
    <main
      className={`flex min-h-dvh flex-col items-center justify-center px-6 py-12 ${
        unlocking ? "animate-unlock-bloom" : "animate-soft-in"
      }`}
    >
      <div className="flex w-full max-w-sm flex-col items-center">
        <div className="surface mb-7 flex size-14 items-center justify-center rounded-full">
          {unlocking ? (
            <Heart className="size-6 text-primary" strokeWidth={1.5} fill="currentColor" />
          ) : (
            <Lock className="size-5 text-primary" strokeWidth={1.5} />
          )}
        </div>

        <h1 className="text-center text-xl text-foreground">Enter the 4-digit passcode</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Some things are worth unlocking.
        </p>

        <div className={`my-9 flex gap-4 ${wrong ? "animate-shake-gentle" : ""}`}>
          {Array.from({ length: LENGTH }).map((_, i) => (
            <span
              key={i}
              className={`size-3.5 rounded-full border transition-all duration-300 ${
                i < code.length
                  ? "scale-110 border-transparent bg-primary"
                  : "border-border bg-transparent"
              }`}
            />
          ))}
        </div>

        <Keypad onDigit={handleDigit} onDelete={() => setCode((c) => c.slice(0, -1))} disabled={unlocking} />

        <div className="mt-8 min-h-28 w-full text-center">
          {wrong && (
            <div className="animate-fade-up space-y-3">
              <p className="text-sm text-destructive">Incorrect passcode.</p>

              {hintStage === "none" && (
                <HintButton onClick={() => setHintStage("kiss")}>Need a hint?</HintButton>
              )}

              {hintStage === "kiss" && (
                <div className="animate-fade-up space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Kiss me first before I give you the hint ❤️
                  </p>
                  <HintButton onClick={() => setHintStage("revealed")}>I did 😌</HintButton>
                </div>
              )}

              {hintStage === "revealed" && (
                <p className="animate-fade-up font-display text-base text-foreground">
                  The date we officially became us.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function HintButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="surface press rounded-full px-5 py-2.5 text-sm text-secondary-foreground active:scale-95 sm:hover:shadow-[var(--shadow-lift)]"
    >
      {children}
    </button>
  );
}
