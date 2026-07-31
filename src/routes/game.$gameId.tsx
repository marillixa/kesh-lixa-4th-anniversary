import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { GAMES } from "@/lib/games";
import { useProgress } from "@/lib/progress";
import { Game3 } from "@/components/games/Game3";

export const Route = createFileRoute("/game/$gameId")({
  head: () => ({
    meta: [
      { title: "A little mystery — Our Little Adventure" },
      { name: "description", content: "One of nine little mysteries in our anniversary adventure." },
      { property: "og:title", content: "A little mystery — Our Little Adventure" },
      {
        property: "og:description",
        content: "One of nine little mysteries in our anniversary adventure.",
      },
    ],
  }),
  component: GamePage,
});

function GamePage() {
  const { gameId } = Route.useParams();
  const navigate = useNavigate();
  const { progress, loaded, completeGame } = useProgress();

  const id = Number(gameId);
  const game = GAMES.find((g) => g.id === id);

  useEffect(() => {
    if (loaded && !progress.unlocked) navigate({ to: "/" });
  }, [loaded, progress.unlocked, navigate]);

  if (!loaded) return <div className="min-h-dvh" />;
  if (!game) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl">This mystery doesn't exist</h1>
        <BackLink />
      </main>
    );
  }

  const completed = progress.completedGames.includes(game.id);
  const { Icon } = game;

  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-16 pt-8 sm:px-8">
      <BackLink />

      <section className="surface animate-fade-up mt-8 flex flex-1 flex-col items-center justify-center gap-5 rounded-3xl p-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-3xl bg-accent/60">
          <Icon className="size-7 text-accent-foreground" strokeWidth={1.5} />
        </span>
        <h1 className="text-3xl">{game.title}</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          {game.hint} — this little mystery is still being written.
        </p>

        <button
          type="button"
          onClick={() => completeGame(game.id)}
          disabled={completed}
          className="press mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground active:scale-95 disabled:opacity-60"
        >
          {completed ? (
            <>
              <Check className="size-4" strokeWidth={2.5} /> Completed
            </>
          ) : (
            "Mark as complete"
          )}
        </button>
      </section>
    </main>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      className="press inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-sm text-muted-foreground active:scale-95"
    >
      <ArrowLeft className="size-4" strokeWidth={1.5} />
      Back
    </Link>
  );
}
