import { useEffect, useState } from "react";
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
  const [firstCard, setFirstCard] = useState<number | null>(null);

const [secondCard, setSecondCard] = useState<number | null>(null);

const [movesLocked, setMovesLocked] = useState(false);

const [started, setStarted] = useState(false);

const [timeLeft, setTimeLeft] = useState(120);

const [finished, setFinished] = useState(false);

const [openEnvelope, setOpenEnvelope] = useState(false);
const [showEnvelope, setShowEnvelope] = useState(false);
const [gameOver, setGameOver] = useState(false);
  

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

  useEffect(() => {
  if (!started) return;

  if (finished) return;

  if (timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((t) => t - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [started, finished, timeLeft]);

useEffect(() => {
  if (timeLeft > 0) return;

  setStarted(false);
  setGameOver(true);
}, [timeLeft]);

function flipCard(index: number) {
  if (preview) return;

  if (movesLocked) return;

  if (cards[index].matched) return;

  if (cards[index].flipped) return;

  if (!started) setStarted(true);

  const updated = [...cards];

  updated[index].flipped = true;

  setCards(updated);

  if (firstCard === null) {
    setFirstCard(index);
    return;
  }

  setSecondCard(index);
}

useEffect(() => {
  if (firstCard === null || secondCard === null) return;

  setMovesLocked(true);

  const first = cards[firstCard];
  const second = cards[secondCard];

  if (first.emoji === second.emoji) {
    setTimeout(() => {
      const updated = [...cards];

      updated[firstCard].matched = true;
      updated[secondCard].matched = true;

      setCards(updated);

      setFirstCard(null);
      setSecondCard(null);

      setMovesLocked(false);

      if (updated.filter(c => c.matched).length === updated.length) {
        setFinished(true);

launchCelebrationConfetti();

setTimeout(() => {
  setShowEnvelope(true);
}, 1000);
      }
    }, 500);
  } else {
    setTimeout(() => {
      const updated = [...cards];

      updated[firstCard].flipped = false;
      updated[secondCard].flipped = false;

      setCards(updated);

      setFirstCard(null);
      setSecondCard(null);

      setMovesLocked(false);
    }, 800);
  }
}, [secondCard, firstCard, cards]);

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

<p
className="mt-5 text-lg font-semibold transition-colors"
style={{
  color: timeLeft <= 20 ? "#ef4444" : "#222",
  animation:
    timeLeft <= 20
      ? "pulse 1s infinite"
      : undefined,
}}
>
  ⏰ {Math.floor(timeLeft / 60)}:
  {(timeLeft % 60).toString().padStart(2, "0")}
</p>

      {gameOver ? (

  <div className="mt-10 flex flex-col items-center gap-5">

    <div className="text-6xl">
      ⏰
    </div>

    <h3 className="text-2xl font-semibold">
      Time's Up!
    </h3>

    <p className="text-center text-muted-foreground max-w-xs">
      Don't worry...
      every memory deserves another try.
    </p>

    <button
      onClick={() => {

  const shuffled = shuffleCards();

  setCards(
    shuffled.map(card => ({
      ...card,
      flipped: true,
    }))
  );

  setPreview(true);

  setStarted(false);

  setFinished(false);

  setOpenEnvelope(false);
  setShowEnvelope(false);

  setTimeLeft(120);

  setFirstCard(null);

  setSecondCard(null);

  setMovesLocked(false);

  setGameOver(false);

  setTimeout(() => {

    setPreview(false);

    setCards(prev =>
      prev.map(card => ({
        ...card,
        flipped:false,
      }))
    );

  },2000);

}}
      className="rounded-full px-8 py-3 font-medium"
      style={{
        background:"#F6D0E4",
      }}
    >
      Try Again ❤️
    </button>

  </div>

) : (

<div className="mt-7 grid grid-cols-6 gap-2">

{cards.map((card,index)=>(

<CardTile
key={card.id}
card={card}
onClick={()=>flipCard(index)}
/>

))}

</div>

)}

{finished && showEnvelope && (

<>

<div className="mt-6 text-center animate-soft-in">
  <p className="text-2xl font-semibold">
    You did it! ❤️
  </p>

  <p className="text-muted-foreground">
    Every little memory led you here.
  </p>
</div>

{!openEnvelope ? (

<button
onClick={() => setOpenEnvelope(true)}
className="
mt-8
text-7xl
animate-bounce
transition
hover:scale-110
"
>
✉️
</button>

) : (

<button
onClick={() => setOpenEnvelope(false)}
className="surface mt-6 max-w-sm rounded-3xl p-6 text-center"
>

<p className="uppercase text-xs tracking-[0.3em] text-muted-foreground">
Your next clue
</p>

<p className="mt-5 text-2xl">
🪞
</p>

<p className="mt-5 leading-relaxed">
Go where your beautiful smile
looks back at you.
</p>

<p className="mt-6 text-xs text-muted-foreground">
Tap to close
</p>

</button>

)}
</>

)}

    </section>
  );
}

function CardTile({
  card,
  onClick,
}: {
  card: CardType;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
  perspective: "700px",
  opacity: card.matched ? 0 : 1,
  pointerEvents: card.matched ? "none" : "auto",
}}
    >
      <div
  className="relative h-12 w-12 transition-all duration-500"
  style={{
    transformStyle: "preserve-3d",
    transform: card.flipped
      ? "rotateY(180deg)"
      : "rotateY(0deg)",
    opacity: card.matched ? 0 : 1,
    transformOrigin: "center",
    scale: card.matched ? "0.7" : "1",
  }}
>
        {/* FRONT */}

        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl text-xl shadow-sm"
          style={{
            backfaceVisibility: "hidden",
            background: "#F6D0E4",
          }}
        >
          ♥
        </div>

        {/* BACK */}

        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-white text-xl shadow-sm"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {card.emoji}
        </div>
      </div>
    </button>
  );
}

