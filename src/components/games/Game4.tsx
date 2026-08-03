import { useRef, useState } from "react";

type Step = 1 | 2 | 3 | 4;

export function Game4() {
  const [step, setStep] = useState<Step>(1);
  const [player, setPlayer] = useState({ x: 30, y: 30 });
  const [dragging, setDragging] = useState(false);
  const MAZE_WIDTH = 320;
  const MAZE_HEIGHT = 500;

  const FINISH = {
    x: 250,
    y: 20,
    width: 50,
    height: 40,
};

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

          <div
            className="relative bg-black"
            style={{
              width: MAZE_WIDTH,
              height: MAZE_HEIGHT,
            }}
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
              if (!dragging) return;

              const rect = e.currentTarget.getBoundingClientRect();

              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              if (hitWall(x, y)) {
                alert("Oops! Try again ❤️");
                setPlayer({
                  x: 30,
                  y: 30,
                });
                return;
              }

              if (
                x > FINISH.x &&
                x < FINISH.x + FINISH.width &&
                y > FINISH.y &&
                y < FINISH.y + FINISH.height
              ) {
                alert("Level Complete!");
              }

              setPlayer({
                x,
                y,
              });
            }}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 40,
                height: MAZE_HEIGHT,
                background: "#F9DFC0",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: FINISH.x,
                top: FINISH.y,
                width: FINISH.width,
                height: FINISH.height,
                background: "#ff8b5e",
              }}
            />

            <div
              onMouseDown={() => setDragging(true)}
              style={{
                position: "absolute",
                left: player.x,
                top: player.y,
                cursor: "grab",
                fontSize: 20,
                userSelect: "none",
              }}
            >
              ♥
            </div>
          </div>

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

function hitWall(x: number, y: number) {
  const walls = [
    {
      x: 40,
      y: 0,
      width: 220,
      height: 460,
    },
  ];

  return walls.some(
    (wall) =>
      x > wall.x &&
      x < wall.x + wall.width &&
      y > wall.y &&
      y < wall.y + wall.height
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
        background: "#ffe6c8",
      }}
    >
      {children}
    </button>
  );
}