import { useRef, useState } from "react";
import { launchCelebrationConfetti } from "@/lib/confetti";

type Step = 1 | 2;

export function Game5() {
  const [step, setStep] = useState<Step>(1);

  const ANSWER = "MACARONI";

  const [letters, setLetters] = useState(Array(8).fill(""));
  const [error, setError] = useState(false);

  const [solved, setSolved] = useState(false);
  const [openEnvelope, setOpenEnvelope] = useState(false);

  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function updateLetter(index: number, value: string) {
    const char = value.replace(/[^a-zA-Z]/g, "").slice(-1).toUpperCase();

    const next = [...letters];
    next[index] = char;

    setLetters(next);
    setError(false);

    if (char && index < 7) {
      inputs.current[index + 1]?.focus();
    }
  }

  function checkAnswer() {
    if (letters.join("") === ANSWER) {
      setSolved(true);
      launchCelebrationConfetti();
    } else {
      setError(true);
      setLetters(Array(8).fill(""));
      inputs.current[0]?.focus();
    }
  }

  return (
    <div className="flex flex-1 flex-col">

      {step === 1 && (
        <Card>

          <h1 className="text-3xl">
            Seeing the Bigger Picture
          </h1>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Sometimes one little clue isn't enough.
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            But when you put different pieces together...
          </p>

          <p className="max-w-sm font-medium">
            Everything starts making sense. ❤️
          </p>

          <PrimaryButton
            onClick={() => setStep(2)}
          >
            Begin
          </PrimaryButton>

        </Card>
      )}

      {step === 2 && (

        <Card>

          <p className="uppercase text-xs tracking-[0.35em] text-muted-foreground">
            Game 5
          </p>

          <h2 className="text-3xl">
            4 Pics 1 Word
          </h2>

          <img
            src="/images/puzzle/game5.png"
            alt=""
            className="w-full max-w-sm rounded-2xl shadow-md"
          />

          {!solved && (
            <>
              <div className="flex flex-wrap justify-center gap-2">

                {letters.map((letter, i) => (

                  <input
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={letter}
                    maxLength={1}
                    onChange={(e) =>
                      updateLetter(i, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkAnswer();
                      }
                    }}
                    className="h-12 w-12 border text-center text-xl font-bold uppercase"
                    style={{
                      borderColor: "#eff2f4",
                      background: "white",
                    }}
                  />

                ))}

              </div>

              {error && (
                <p className="text-sm text-muted-foreground">
                  Not quite ❤️
                </p>
              )}

              <PrimaryButton
                onClick={checkAnswer}
              >
                Check Answer
              </PrimaryButton>
            </>
          )}

          {solved && (
            <>

              {!openEnvelope ? (

                <button
                  onClick={() =>
                    setOpenEnvelope(true)
                  }
                  className="animate-bounce text-7xl"
                >
                  ✉️
                </button>

              ) : (

                <button
                  onClick={() =>
                    setOpenEnvelope(false)
                  }
                  className="surface max-w-sm rounded-3xl p-6 text-center"
                >

                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Your next clue
                  </p>

                  <p className="mt-6 text-lg">
                    ❤️
                  </p>

                  <p className="mt-4 leading-relaxed">
                    Find it around the macaroni.
                  </p>

                  <p className="mt-6 text-xs text-muted-foreground">
                    Tap to close
                  </p>

                </button>

              )}

            </>
          )}

        </Card>

      )}

    </div>
  );
}

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl p-8 text-center"
      style={{
        background: "#f9fafb",
        border: "1px solid #eff2f4",
      }}
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
      onClick={onClick}
      className="rounded-full px-8 py-3 font-medium transition hover:scale-105"
      style={{
        background: "#eff2f4",
      }}
    >
      {children}
    </button>
  );
}