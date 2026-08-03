import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { launchCelebrationConfetti } from "@/lib/confetti";

const IMAGE = "/images/puzzle/game2.jpg";

const SIZE = 3;

function shuffleBoard() {
  const arr = [...Array(9).keys()];

  // random legal shuffle
  for (let i = arr.length - 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function Game2() {
  const [started, setStarted] = useState(false);

  const [board, setBoard] = useState(shuffleBoard());

  const [finished, setFinished] = useState(false);

  function reset() {
    setFinished(false);
    setBoard(shuffleBoard());
  }

  function move(index: number) {
    if (finished) return;

    const empty = board.indexOf(8);

    const row = Math.floor(index / SIZE);
    const col = index % SIZE;

    const erow = Math.floor(empty / SIZE);
    const ecol = empty % SIZE;

    const adjacent =
      Math.abs(row - erow) + Math.abs(col - ecol) === 1;

    if (!adjacent) return;

    const next = [...board];

    [next[index], next[empty]] = [next[empty], next[index]];

    setBoard(next);

    if (next.every((v, i) => v === i)) {
      setFinished(true);
      launchCelebrationConfetti();
    }
  }

  if (!started) {
    return (
      <Card>
        <h1 className="text-3xl">Putting the Pieces Together</h1>

        <p className="max-w-sm leading-relaxed text-muted-foreground">
          Life doesn't always make sense right away.
        </p>

        <p className="max-w-sm leading-relaxed text-muted-foreground">
          Sometimes we have to try different paths, make mistakes, and move one
          little piece at a time.
        </p>

        <p className="max-w-sm leading-relaxed text-muted-foreground">
          But somehow, everything slowly finds its place.
        </p>

        <p className="max-w-sm font-medium">
          Just like you always do. ❤️
        </p>

        <PrimaryButton onClick={() => setStarted(true)}>
          Begin
        </PrimaryButton>
      </Card>
    );
  }

  return (
    <Card>
      <div className="w-full max-w-sm">

        <div className="mb-4 flex justify-end">

          <button
            onClick={reset}
            className="rounded-full p-2 hover:bg-sky-100"
          >
            <RotateCcw size={18} />
          </button>

        </div>

        <PuzzleGrid
          board={board}
          move={move}
        />

        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          Reference
        </p>

        <img
          src={IMAGE}
          alt=""
          className="mx-auto mt-2 h-36 rounded-xl border object-cover opacity-80"
        />

        {finished && (
          <div className="mt-8 animate-soft-in rounded-2xl border bg-white p-6">

            <div className="text-5xl">
              💌
            </div>

            <p className="mt-3 text-sm uppercase tracking-widest text-sky-700">
              Clue
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Painting of Fruits
            </h2>

          </div>
        )}

      </div>
    </Card>
  );
}

function PuzzleGrid({
  board,
  move,
}: {
  board: number[];
  move: (i: number) => void;
}) {
  return (
    <div
      className="grid gap-1 rounded-2xl border bg-sky-50 p-1"
      style={{
        gridTemplateColumns: "repeat(3,1fr)",
      }}
    >
      {board.map((tile, index) => {

        if (tile === 8)
          return (
            <div
              key={index}
              className="aspect-square rounded-lg bg-sky-100"
            />
          );

        const x = (tile % 3) * 50;
        const y = Math.floor(tile / 3) * 50;

        return (
          <button
            key={index}
            onClick={() => move(index)}
            className="aspect-square overflow-hidden rounded-lg"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url(${IMAGE})`,
                backgroundSize: "300% 300%",
                backgroundPosition: `${x}% ${y}%`,
              }}
            />
          </button>
        );
      })}
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
      className="surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl border p-8 text-center sm:p-10"
      style={{
        borderColor: "#C8E1F2",
        background: "#eef8fd",
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
      className="rounded-full bg-sky-200 px-8 py-3 font-medium transition hover:scale-105"
    >
      {children}
    </button>
  );
}
