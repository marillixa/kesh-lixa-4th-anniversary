import { Link } from "@tanstack/react-router";
import { GAMES } from "@/lib/games";
import { GameTile } from "./GameTile";
import { KEEPSAKES, TOTAL_KEEPSAKES, isKeepsakeUnlocked } from "@/lib/keepsakes";
import { ProgressTracker } from "./ProgressTracker";



export function Home({ completedGames }: { completedGames: number[] }) {
  const done = new Set(completedGames).size;
  const collected = KEEPSAKES.filter((k) => isKeepsakeUnlocked(k, completedGames)).length;


  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 pb-16 pt-16 sm:px-8">
      <header className="animate-fade-up text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Happy anniversary</p>
        <h1 className="mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
          Our Little Adventure
        </h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Nine little mysteries await you.
        </p>
      </header>

      <ProgressTracker completed={done} />

      <div className="animate-fade-up mx-auto mt-3 flex items-center gap-3 rounded-full border border-border/70 px-4 py-2 text-xs text-muted-foreground [animation-delay:120ms]">
        <span className="size-1.5 rounded-full bg-primary" />
        {done} of {GAMES.length} discovered
      </div>


      <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {GAMES.map((game, i) => (
          <GameTile
            key={game.id}
            game={game}
            index={i}
            completed={completedGames.includes(game.id)}
          />
        ))}
      </section>

      <Link
        to="/keepsakes"
        className="animate-fade-up mt-10 flex items-center justify-center gap-3 rounded-3xl border border-border/70 bg-card/70 px-6 py-5 text-center shadow-sm transition-transform duration-300 hover:-translate-y-0.5 [animation-delay:600ms]"
      >
        <span className="text-lg">❤️</span>
        <span className="flex flex-col items-start">
          <span className="font-display text-base text-foreground">Keepsakes</span>
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
            {collected} / {TOTAL_KEEPSAKES} Collected
          </span>
        </span>
        <span className="ml-1 text-muted-foreground">→</span>
      </Link>



      <p className="animate-fade-up mt-12 text-center text-xs text-muted-foreground [animation-delay:700ms]">
        Take your time. There's no rush with us.
      </p>
    </main>
  );
}
