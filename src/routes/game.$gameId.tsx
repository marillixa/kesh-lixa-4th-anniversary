import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { GAMES } from "@/lib/games";
import { useProgress } from "@/lib/progress";
import { getKeepsakeForGame, type Keepsake } from "@/lib/keepsakes";
import { CelebrationModal } from "@/components/keepsakes/CelebrationModal";
import { KeepsakeModal } from "@/components/keepsakes/KeepsakeModal";
import { Game3 } from "@/components/games/Game3";
import { Game6 } from "@/components/games/Game6";
import { Game2 } from "@/components/games/Game2";
import { Game4 } from "@/components/games/Game4";
import { Game7 } from "@/components/games/Game7";
import { Game5 } from "@/components/games/Game5";
import { Game9 } from "@/components/games/Game9";
import { Game8 } from "@/components/games/Game8";
import { Game1 } from "@/components/games/Game1";


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
  const { progress, loaded, toggleGame } = useProgress();
  const [celebrating, setCelebrating] = useState<Keepsake | null>(null);
  const [viewing, setViewing] = useState<Keepsake | null>(null);

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

  const handleToggle = () => {
    toggleGame(game.id);
    if (completed) return; // was completed → just un-marked, stay put
    const keepsake = getKeepsakeForGame(game.id);
    if (keepsake) setCelebrating(keepsake);
    else navigate({ to: "/" });
  };

  const overlays = (
    <>
      <CelebrationModal
        keepsake={viewing ? null : celebrating}
        onViewKeepsake={() => setViewing(celebrating)}
        onReturnHome={() => {
          setCelebrating(null);
          navigate({ to: "/" });
        }}
      />
      <KeepsakeModal
        keepsake={viewing}
        onClose={() => {
          setViewing(null);
          setCelebrating(null);
          navigate({ to: "/" });
        }}
      />
    </>
  );

  if (game.id === 1) {
    return (
      <main
        className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8"
        style={{ background: "#FBEFC2" }}
      >
        <BackLink />
        <Game1 />
        <button
          type="button"
          onClick={handleToggle}
          className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
        >
          {completed && <Check className="size-3.5 text-primary" strokeWidth={2.5} />}
          {completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        {overlays}
      </main>
    );
  }

  if (game.id === 3) {

    return (
      <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
        <BackLink />
        <Game3 />
        <button
          type="button"
          onClick={handleToggle}
          className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
        >
          {completed && <Check className="size-3.5 text-primary" strokeWidth={2.5} />}
          {completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        {overlays}
      </main>
    );
  }

  if (game.id === 9) {
  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
      <BackLink />

      <Game9 />

      <button
        type="button"
        onClick={handleToggle}
        className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
      >
        {completed && (
          <Check className="size-3.5 text-primary" strokeWidth={2.5} />
        )}
        {completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>

      {overlays}
    </main>
  );
}

if (game.id === 8) {
  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
      <BackLink />

      <Game8 />

      <button
        type="button"
        onClick={handleToggle}
        className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
      >
        {completed && (
          <Check
            className="size-3.5 text-primary"
            strokeWidth={2.5}
          />
        )}

        {completed
          ? "Mark as Incomplete"
          : "Mark as Complete"}
      </button>

      {overlays}
    </main>
  );
}

if (game.id === 5) {
  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
      <BackLink />

      <Game5 />

      <button
        type="button"
        onClick={handleToggle}
        className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
      >
        {completed && (
          <Check
            className="size-3.5 text-primary"
            strokeWidth={2.5}
          />
        )}

        {completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>

      {overlays}
    </main>
  );
}

  if (game.id === 4) {
  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">

      <BackLink />

      <Game4 />

      <button
        type="button"
        onClick={handleToggle}
        className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground"
      >
        {completed
          ? "Mark as Incomplete"
          : "Mark as Complete"}
      </button>

      {overlays}

    </main>
  );
}

  if (game.id === 2) {
  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
      <BackLink />

      <Game2 />

      <button
        type="button"
        onClick={handleToggle}
        className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
      >
        {completed && (
          <Check
            className="size-3.5 text-primary"
            strokeWidth={2.5}
          />
        )}

        {completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>

      {overlays}
    </main>
  );
}

  if (game.id === 7) {
    return (
      <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
        <BackLink />
        <Game7 />
        <button
          type="button"
          onClick={handleToggle}
          className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
        >
          {completed && <Check className="size-3.5 text-primary" strokeWidth={2.5} />}
          {completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        {overlays}
      </main>
    );
  }

  if (game.id === 6) {
  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-8 pt-8 sm:px-8">
      <BackLink />

      <Game6 />

      <button
        type="button"
        onClick={handleToggle}
        className="press mt-6 inline-flex items-center gap-2 self-start rounded-full px-3 py-2 text-xs text-muted-foreground active:scale-95 sm:hover:text-foreground"
      >
        {completed && (
          <Check
            className="size-3.5 text-primary"
            strokeWidth={2.5}
          />
        )}

        {completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>

      {overlays}
    </main>
  );
}

  return (
    <main className="animate-soft-in mx-auto flex min-h-dvh w-full max-w-xl flex-col px-6 pb-16 pt-8 sm:px-8">
      <BackLink />

      <section className="surface animate-fade-up mt-8 flex flex-1 flex-col items-center justify-center gap-5 rounded-3xl p-10 text-center">
        <span
          className="flex size-16 items-center justify-center rounded-3xl"
          style={{ backgroundColor: game.tint }}
        >
          <Icon className="size-7" style={{ color: game.tintFg }} strokeWidth={1.5} />
        </span>
        <h1 className="text-3xl">{game.title}</h1>
        <p className="max-w-xs text-sm text-muted-foreground">
          {game.hint} — this little mystery is still being written.
        </p>

        <button
          type="button"
          onClick={handleToggle}
          className="press mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground active:scale-95 disabled:opacity-60"
        >
          {completed ? (
            <>
              <Check className="size-4" strokeWidth={2.5} /> Completed — tap to undo
            </>
          ) : (
            "Mark as complete"
          )}
        </button>
      </section>
      {overlays}
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