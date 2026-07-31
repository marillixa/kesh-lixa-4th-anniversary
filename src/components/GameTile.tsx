import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { GameMeta } from "@/lib/games";

export function GameTile({
  game,
  completed,
  index,
}: {
  game: GameMeta;
  completed: boolean;
  index: number;
}) {
  const { Icon } = game;
  return (
    <Link
      to="/game/$gameId"
      params={{ gameId: String(game.id) }}
      style={{ animationDelay: `${80 + index * 55}ms` }}
      className="surface press animate-fade-up relative flex aspect-square flex-col items-center justify-center gap-2.5 rounded-3xl p-3 text-center active:scale-[0.96] sm:hover:-translate-y-1 sm:hover:shadow-[var(--shadow-lift)]"
    >
      {completed && (
        <span className="absolute right-2.5 top-2.5 flex size-5 items-center justify-center rounded-full bg-primary">
          <Check className="size-3 text-primary-foreground" strokeWidth={3} />
        </span>
      )}
      <span className="flex size-11 items-center justify-center rounded-2xl bg-accent/60">
        <Icon className="size-5 text-accent-foreground" strokeWidth={1.5} />
      </span>
      <span className="text-sm font-medium text-foreground">{game.title}</span>
      <span className="px-1 text-[0.68rem] leading-tight text-muted-foreground">{game.hint}</span>
    </Link>
  );
}
