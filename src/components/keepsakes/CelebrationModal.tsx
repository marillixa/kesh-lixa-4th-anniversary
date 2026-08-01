import { useEffect } from "react";
import { Heart, Home } from "lucide-react";
import type { Keepsake } from "@/lib/keepsakes";
import { launchCelebrationConfetti } from "@/lib/confetti";

export function CelebrationModal({
  keepsake,
  onViewKeepsake,
  onReturnHome,
}: {
  keepsake: Keepsake | null;
  onViewKeepsake: () => void;
  onReturnHome: () => void;
}) {
  useEffect(() => {
    if (keepsake) launchCelebrationConfetti();
  }, [keepsake]);

  if (!keepsake) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keepsake unlocked"
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/25 p-5 backdrop-blur-sm duration-300 animate-in fade-in"
    >
      <div className="surface w-full max-w-xs rounded-[1.75rem] p-7 text-center duration-500 animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
        <span className="text-3xl">🎉</span>
        <h2 className="mt-3 font-display text-2xl leading-tight text-foreground">
          Keepsake Unlocked!
        </h2>
        <p className="mt-3 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          {keepsake.category}
        </p>
        <p className="mt-1 text-base text-foreground">{keepsake.title}</p>

        <div className="mt-7 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onViewKeepsake}
            className="press inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground active:scale-95"
          >
            <Heart className="size-4" strokeWidth={2} /> View Keepsake
          </button>
          <button
            type="button"
            onClick={onReturnHome}
            className="press inline-flex items-center justify-center gap-2 rounded-full border border-border/70 px-6 py-3 text-sm text-muted-foreground active:scale-95 sm:hover:text-foreground"
          >
            <Home className="size-4" strokeWidth={1.5} /> Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
