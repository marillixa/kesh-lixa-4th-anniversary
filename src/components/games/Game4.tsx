import { useRef, useState } from "react";

type Step = 1 | 2 | 3 | 4;

export function Game4() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="flex flex-1 flex-col">

      {step === 1 && (
        <Card>

          <h1 className="text-3xl">
            Keep Going
          </h1>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Life isn't always a straight path.
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Sometimes we take wrong turns...
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Sometimes things surprise us.
          </p>

          <p className="max-w-sm font-medium">
            But I know you'll always find your way. ❤️
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

          <h2 className="text-2xl">
            Level 1
          </h2>

          <MazePlaceholder />

        </Card>

      )}

    </div>
  );
}

function MazePlaceholder() {
    const mazeRef = useRef<HTMLDivElement>(null);

const [player, setPlayer] = useState({
  x: 255,
  y: 22,
});

function moveHeart(e: React.MouseEvent<HTMLDivElement>) {
  if (!mazeRef.current) return;

  const rect = mazeRef.current.getBoundingClientRect();

  setPlayer({
    x: e.clientX - rect.left - 8,
    y: e.clientY - rect.top - 8,
  });
}
  return (
    <div
        ref={mazeRef}
        onMouseMove={moveHeart}
      className="relative mt-6 h-[520px] w-[320px] overflow-hidden rounded-2xl border-4 bg-white"
      style={{
        borderColor: "#F9DFC0",
      }}
    >
      {/* LEFT WALL */}
      <div
        className="absolute left-0 top-0"
        style={{
          width: 60,
          height: 520,
          background: "#F9DFC0",
        }}
      />

      {/* TOP WALL */}
      <div
        className="absolute left-60 top-0"
        style={{
          width: 180,
          height: 60,
          background: "#F9DFC0",
        }}
      />

      {/* FINISH */}
      <div
        className="absolute"
        style={{
          right: 0,
          top: 0,
          width: 80,
          height: 60,
          background: "#E6B76D",
        }}
      />

      <p
        className="absolute right-2 top-16 text-xs font-bold"
      >
        FINISH
      </p>

      {/* PLAYER */}
      <div
        className="absolute"
        style={{
          left: player.x,
          top: player.y,
          fontSize: 18,
          color: "#D96B8A",
        }}
      >
        ♥
      </div>
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
      className="surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl p-8 text-center sm:p-10"
      style={{
        background: "#FFF8F0",
        border: "1px solid #F9DFC0",
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
        background: "#F9DFC0",
      }}
    >
      {children}
    </button>
  );
}