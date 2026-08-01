import { Lock, Heart } from "lucide-react";
import type { Keepsake } from "@/lib/keepsakes";

export function KeepsakeCard({
  keepsake,
  unlocked,
  index,
  onOpen,
}: {
  keepsake: Keepsake;
  unlocked: boolean;
  index: number;
  onOpen: (k: Keepsake) => void;
}) {
  if (!unlocked) {
    return (
      <div
        style={{ animationDelay: `${60 + index * 45}ms` }}
        className="surface animate-fade-up relative flex aspect-[4/5] select-none flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl p-3 text-center opacity-70"
        aria-label="Locked keepsake"
      >
        <div
          className="absolute inset-0 blur-md"
          style={{ backgroundColor: keepsake.tint, opacity: 0.5 }}
        />
        <span className="relative flex size-9 items-center justify-center rounded-2xl bg-background/70">
          <Lock className="size-4 text-muted-foreground" strokeWidth={1.5} />
        </span>
        <span className="relative select-none text-[0.7rem] leading-tight text-muted-foreground blur-[3px]">
          {keepsake.title}
        </span>
        <span className="relative text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
          Locked
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(keepsake)}
      style={{ animationDelay: `${60 + index * 45}ms` }}
      className="surface press animate-fade-up relative flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-3xl p-3 text-center active:scale-[0.96] sm:hover:-translate-y-1 sm:hover:shadow-[var(--shadow-lift)]"
    >
      <span
        className="flex size-10 items-center justify-center rounded-2xl"
        style={{ backgroundColor: keepsake.tint }}
      >
        <Heart className="size-4" style={{ color: keepsake.tintFg }} strokeWidth={1.5} />
      </span>
      <span className="text-[0.78rem] font-medium leading-tight text-foreground">
        {keepsake.title}
      </span>
      <span className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
        {keepsake.category}
      </span>
    </button>
  );
}
