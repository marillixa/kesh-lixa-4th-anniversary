import { useState } from "react";

type Step = 1 | 2;

export function Game6() {
  const [step, setStep] = useState<Step>(1);

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
            className="w-full max-w-xs rounded-3xl border p-8 shadow-lg"
            style={{
              background: "#ffffff",
              borderColor: "#d9f3df",
            }}
          >
            <p className="text-left text-3xl leading-tight font-bold">
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
          </div>

          <PrimaryButton onClick={() => {}}>
            Flip to Reveal
          </PrimaryButton>
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