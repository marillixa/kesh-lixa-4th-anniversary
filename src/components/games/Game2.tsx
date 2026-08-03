import { useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { launchCelebrationConfetti } from "@/lib/confetti";

const IMAGE = "/images/puzzle/game2.jpg";

const SIZE = 3;

function shuffleBoard() {
  let board = [...Array(9).keys()];

  for (let i = 0; i < 200; i++) {
    const empty = board.indexOf(8);

    const neighbors: number[] = [];

    const row = Math.floor(empty / SIZE);
    const col = empty % SIZE;

    if (row > 0) neighbors.push(empty - SIZE);
    if (row < SIZE - 1) neighbors.push(empty + SIZE);
    if (col > 0) neighbors.push(empty - 1);
    if (col < SIZE - 1) neighbors.push(empty + 1);

    const swap = neighbors[Math.floor(Math.random() * neighbors.length)];

    [board[empty], board[swap]] = [board[swap], board[empty]];
  }

  return board;
}

export function Game2() {
  const [started, setStarted] = useState(false);

  const [board, setBoard] = useState(shuffleBoard());

  const [finished, setFinished] = useState(false);

  const [openedEnvelope, setOpenedEnvelope] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);

  function reset() {
    setFinished(false);
    setShowEnvelope(false);
    setOpenedEnvelope(false);
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

        setTimeout(() => {
            launchCelebrationConfetti();
        }, 500);

        setTimeout(() => {
            setShowEnvelope(true);
        }, 1100);
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
      <div
        className={`w-full max-w-sm transition-all duration-700 ${
          finished
            ? "scale-110 shadow-2xl"
            : ""
        }`}
      >
        <div className="mb-4 flex justify-end">
          <button
            onClick={reset}
            className="rounded-full p-2 hover:bg-[#EEE7FA]"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <PuzzleGrid
          board={board}
          move={move}
          finished={finished}
        />

        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          Reference
        </p>

        <img
          src={IMAGE}
          alt=""
          className="mx-auto mt-2 h-36 border object-cover opacity-80"
        />

        {showEnvelope && (
          <div
            className={`mt-8 flex justify-center transition-all duration-500 ${
              finished
                ? "opacity-100 scale-100 delay-500"
                : "opacity-0 scale-50"
            }`}
          >
            <button
              onClick={() => setOpenedEnvelope(!openedEnvelope)}
              className={`text-6xl transition-all duration-500 hover:scale-110 active:scale-95 ${
                openedEnvelope ? "rotate-12 scale-95" : ""
              }`}
            >
              <span
                className={`text-6xl transition-all duration-500 ${
                  openedEnvelope ? "rotate-12 scale-95" : ""
                }`}
              >
                {openedEnvelope ? "📨" : "💌"}
              </span>
            </button>
          </div>
        )}

        {finished && openedEnvelope && (
          <div className="animate-soft-in mt-6 rounded-3xl border border-[#DCD2F0] bg-white/90 p-6 shadow-xl backdrop-blur">
            <p className="uppercase tracking-widest text-xs text-violet-700">
              Clue
            </p>

            <h2 className="mt-3 text-3xl font-display text-violet-800">
              Painting of Fruits
            </h2>

            <p className="mt-4 text-muted-foreground">
              ❤️ Go see what's waiting for you.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

function PuzzleGrid({
  board,
  move,
  finished,
}: {
  board: number[];
  move: (i: number) => void;
  finished: boolean;
}) {
  return (
    <div
      className="grid overflow-hidden rounded-2xl border border-[#DCD2F0]"
      style={{
        gridTemplateColumns: "repeat(3,1fr)",
      }}
    >
      {board.map((tile, index) => {
        const isEmpty = tile === 8;
        const x = (tile % 3) * 50;
        const y = Math.floor(tile / 3) * 50;

        if (isEmpty && !finished) {
          return (
            <div
              key={index}
              className="aspect-square bg-[#EEE7FA]"
            />
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => {
            if (!finished) move(index);
            }}
            disabled={finished}
            className={`aspect-square ${isEmpty ? "bg-violet-100" : ""}`}
            style={
              !isEmpty || finished
                ? {
                    backgroundImage: `url(${IMAGE})`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${x}% ${y}%`,
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}

function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      className="surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl border p-8 text-center sm:p-10"
      style={{
        borderColor: "#DCD2F0",
        background: "#F7F4FC",
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
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-[#DCD2F0] px-8 py-3 font-medium transition hover:scale-105 hover:bg-[#d3c5ec]"
    >
      {children}
    </button>
  );
}
