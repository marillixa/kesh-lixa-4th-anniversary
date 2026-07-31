import { useRef, useState } from "react";
import { Compass, MoveRight } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

const MOVES = [
  { dir: "E", label: "East", steps: 3 },
  { dir: "S", label: "South", steps: 15 },
  { dir: "W", label: "West", steps: 5 },
  { dir: "N", label: "North", steps: 1 },
];

export function Game3() {
  const [step, setStep] = useState<Step>(1);
  const [letters, setLetters] = useState(["", "", ""]);
  const [error, setError] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function setLetter(i: number, value: string) {
    const char = value.replace(/[^a-zA-Z]/g, "").slice(-1);
    setLetters((prev) => {
      const next = [...prev];
      next[i] = char;
      return next;
    });
    setError(false);
    if (char && i < 2) inputs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !letters[i] && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "Enter") check();
  }

  function check() {
    if (letters.join("").toLowerCase() === "red") {
      setError(false);
      setStep(4);
    } else {
      setError(true);
      setLetters(["", "", ""]);
      inputs.current[0]?.focus();
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {step === 1 && (
        <Card key="s1">
          <span className="flex size-16 items-center justify-center rounded-3xl bg-accent/60">
            <Compass className="size-7 text-accent-foreground" strokeWidth={1.5} />
          </span>
          <h1 className="text-3xl">A Small Direction</h1>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Some answers can only be found when you leave this screen for a moment.
          </p>
          <PrimaryButton onClick={() => setStep(2)}>Begin</PrimaryButton>
        </Card>
      )}

      {step === 2 && (
        <Card key="s2">
          <p className="max-w-sm text-base leading-relaxed text-foreground">
            Stand beneath the object in our home that symbolizes good fortune and prosperity.
          </p>
          <PrimaryButton onClick={() => setStep(3)}>I found it</PrimaryButton>
        </Card>
      )}

      {step === 3 && (
        <Card key="s3">
          <h2 className="text-2xl">What color is it?</h2>
          <div
            className={`flex gap-3 ${error ? "animate-shake-gentle" : ""}`}
            onAnimationEnd={() => undefined}
          >
            {letters.map((letter, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                value={letter}
                onChange={(e) => setLetter(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                inputMode="text"
                autoComplete="off"
                aria-label={`Letter ${i + 1}`}
                maxLength={1}
                className="press size-14 rounded-2xl border border-border/70 bg-card/80 text-center font-display text-2xl lowercase text-foreground shadow-[var(--shadow-soft)] outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/40"
              />
            ))}
          </div>
          {error && (
            <p className="animate-soft-in text-sm text-muted-foreground">
              Not quite. Take another look.
            </p>
          )}
          <PrimaryButton onClick={check}>Check</PrimaryButton>
        </Card>
      )}

      {step === 4 && (
        <Card key="s4" className="items-start text-left">
          <h2 className="animate-fade-up self-center text-center text-2xl">Before We Continue...</h2>
          <div className="space-y-5 text-[0.95rem] leading-[1.9] text-muted-foreground">
            {[
              "There are moments in life when it's easy to feel like everyone else already knows where they're going.",
              "But life isn't a race with one perfect path.",
              "It's completely okay to pause, to wonder, to change direction, and to begin again.",
              "The important thing isn't finding the fastest route.",
              "It's continuing to take small steps, even when you aren't completely sure where they'll lead.",
              "You'll find your way.",
              "And when you do, every step you took to get there will have mattered.",
              "And I'll always be cheering for you, no matter which direction you choose.",
            ].map((line, i) => (
              <p
                key={i}
                className="animate-fade-up"
                style={{ animationDelay: `${200 + i * 220}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
          <div className="animate-fade-up self-center [animation-delay:2000ms]">
            <PrimaryButton onClick={() => setStep(5)}>Continue</PrimaryButton>
          </div>
        </Card>
      )}

      {step === 5 && (
        <Card key="s5">
          <h2 className="text-2xl">Now it's your turn to follow a direction.</h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Stand beneath the red lantern.
            <br />
            Open the Compass app on your phone.
            <br />
            Face East.
          </p>

          <div className="surface w-full max-w-xs rounded-3xl p-5">
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
              1 tile = 1 step
            </p>
            <ul className="space-y-3">
              {MOVES.map((m, i) => (
                <li
                  key={m.dir}
                  className="animate-fade-up flex items-center justify-between rounded-2xl bg-accent/30 px-4 py-2.5"
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="flex items-center gap-2 text-sm text-foreground">
                    <span className="font-display text-lg">{m.dir}</span>
                    <MoveRight className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm text-muted-foreground">{m.steps}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">Good luck ❤️</p>
        </Card>
      )}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl p-8 text-center sm:p-10 ${className}`}
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
      className="press mt-1 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground active:scale-95 sm:hover:shadow-[var(--shadow-lift)]"
    >
      {children}
    </button>
  );
}
