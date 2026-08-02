import { useState } from "react";
import { launchCelebrationConfetti } from "@/lib/confetti";

type Step = 1 | 2;

export function Game6() {
  const [step, setStep] = useState<Step>(1);
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      className="flex flex-1 flex-col"
      style={
        {
          "--game-accent": "#d9f3df",
          "--game-accent-dark": "#5d8d67",
        } as React.CSSProperties
      }
    >
      {step === 1 && (
        <Card>
          <h1 className="text-3xl">A Little Mixed Up</h1>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Sometimes life feels a little like this puzzle.
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            At first everything can seem messy, confusing, or impossible to
            understand.
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            But somehow, little by little, everything starts making sense.
          </p>

          <p className="max-w-sm leading-relaxed font-medium">
            And no matter how confusing life gets, I know you'll always figure
            things out.
          </p>

          <PrimaryButton onClick={() => setStep(2)}>
            Let's Try ❤️
          </PrimaryButton>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <p className="uppercase text-xs tracking-[0.3em] text-muted-foreground">
            Incohearent
          </p>

          <div
  className="relative w-full max-w-xs rounded-3xl border bg-white p-8 shadow-lg transition-all duration-500"
  style={{
    borderColor: "#d9f3df",
  }}
>
  {!revealed ? (
    <>
      <p className="text-left text-3xl font-bold leading-tight">
        hun
        <br />
        dear
        <br />
        duh
        <br />
        dye
        <br />
        ink
        <br />
        shh
        <br />
        heir
      </p>

      <div
        className="mt-8 h-5 rounded-full"
        style={{
          background:
            "linear-gradient(to right,#ffd6e7,#ffe7b8,#d7f5d0,#d7ecff,#e8d8ff)",
        }}
      />
    </>
  ) : (
    <>
      <p className="text-xs uppercase tracking-[0.3em] text-green-700">
        Answer
      </p>

      <h2 className="mt-6 text-center text-3xl font-bold leading-tight">
        UNDER
        <br />
        THE
        <br />
        DINING
        <br />
        CHAIR
      </h2>

      <p className="mt-8 text-sm text-muted-foreground">
        ❤️ Go see what's waiting for you.
      </p>
    </>
  )}
</div>

          {!revealed ? (
  <PrimaryButton
    onClick={() => {
      setRevealed(true);
      launchCelebrationConfetti();
    }}
  >
    Flip to Reveal
  </PrimaryButton>
) : (
  <PrimaryButton
    onClick={() => {
      launchCelebrationConfetti();
    }}
  >
    I Found It ❤️
  </PrimaryButton>
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
    <section className="surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl border border-green-200 bg-green-50/40 p-8 text-center sm:p-10">
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
      className="rounded-full bg-green-300 px-8 py-3 font-medium transition hover:scale-105"
    >
      {children}
    </button>
  );
}