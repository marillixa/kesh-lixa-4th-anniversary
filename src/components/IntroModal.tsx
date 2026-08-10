import { X } from "lucide-react";

export function IntroModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8">
      <div className="animate-soft-in absolute inset-0 bg-foreground/25 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Anniversary message"
        className="animate-fade-up relative w-full max-w-md rounded-[2rem] border border-border/70 bg-card px-6 py-9 text-center shadow-[var(--shadow-lift)] sm:px-9 sm:py-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close message"
          className="press absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground transition-colors active:scale-95 sm:hover:text-foreground"
        >
          <X className="size-5" strokeWidth={1.75} />
        </button>

        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Four years</p>

        <h2 className="mt-4 font-display text-2xl leading-snug text-foreground sm:text-3xl">
          Happy 4th Anniversary, my love! ❤️
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>Four years with you, and I still feel so lucky that I get to do life with you.</p>
          <p>
            I made a little scavenger hunt filled with games, clues, memories, and a few surprises
            along the way.
          </p>
          <p>Ready to see where it takes you?</p>
        </div>

        <p className="mt-6 font-display text-base text-foreground sm:text-lg">
          Let the adventure begin 🗝️
        </p>
      </div>
    </div>
  );
}
