import { useEffect, useMemo, useState } from "react";
import { launchCelebrationConfetti } from "@/lib/confetti";

type Step = 1 | 2;

const EMOJIS = [
  "❤️",
  "🌸",
  "🐶",
  "4️⃣",
  "👓",
  "🍷",
  "🥩",
  "🍊",
  "🧶",
  "🎨",
  "💧",
  "😍",
  "👩‍❤️‍👩",
  "☀️",
  "🎂",
];

type CardType = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

function shuffleCards() {
  const cards: CardType[] = [];

  EMOJIS.forEach((emoji, i) => {
    cards.push({
      id: i * 2,
      emoji,
      flipped: false,
      matched: false,
    });

    cards.push({
      id: i * 2 + 1,
      emoji,
      flipped: false,
      matched: false,
    });
  });

  return cards.sort(() => Math.random() - 0.5);
}

export function Game8() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="flex flex-1 flex-col">
      {step === 1 ? (
        <Intro onBegin={() => setStep(2)} />
      ) : (
        <MemoryGame />
      )}
    </div>
  );
}

function Intro({
  onBegin,
}: {
  onBegin: () => void;
}) {
  return (
    <section
      className="surface mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl p-8 text-center"
      style={{
        background: "#FFF7FB",
        border: "1px solid #F6D0E4",
      }}
    >
      <h1 className="text-3xl">
        Pieces of Us
      </h1>

      <p className="max-w-sm leading-relaxed text-muted-foreground">
        Some memories are easy to remember.
      </p>

      <p className="max-w-sm leading-relaxed text-muted-foreground">
        Others become special simply because we shared them together.
      </p>

      <p className="max-w-sm leading-relaxed text-muted-foreground">
        Little by little, we've collected so many tiny pieces of us.
      </p>

      <p className="font-medium">
        Let's see how many you can remember. ❤️
      </p>

      <button
        onClick={onBegin}
        className="rounded-full px-8 py-3 font-medium transition hover:scale-105"
        style={{
          background: "#F6D0E4",
        }}
      >
        Begin
      </button>
    </section>
  );
}

function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>(() => shuffleCards());

  // Show all cards for the first 2 seconds
  const [preview, setPreview] = useState(true);

  useEffect(() => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        flipped: true,
      }))
    );

    const timer = setTimeout(() => {
      setPreview(false);

      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          flipped: false,
        }))
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="surface mt-8 mx-auto w-full max-w-md flex flex-col items-center rounded-3xl p-5"
      style={{
        background: "#FFF7FB",
        border: "1px solid #F6D0E4",
      }}
    >
      <p className="uppercase text-xs tracking-[0.35em] text-muted-foreground">
        Game 8
      </p>

      <h2 className="mt-2 text-3xl">
        Pieces of Us
      </h2>

      {preview && (
        <p className="mt-2 text-sm text-pink-500 font-medium animate-pulse">
          Take a good look... ❤️
        </p>
      )}

      <div className="mt-7 grid grid-cols-6 gap-2">
        {cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </section>
  );
}

function CardTile({
  card,
}: {
  card: CardType;
}) {
  return (
    <button
      className={`
  flex
  h-12
  w-12
  items-center
  justify-center
  rounded-xl
  text-xl
  transition-all
  duration-300
  shadow-sm
`}
      style={{
        background: card.flipped
          ? "#ffffff"
          : "#F6D0E4",
      }}
    >
      {card.flipped ? card.emoji : "♥"}
    </button>
  );
}

