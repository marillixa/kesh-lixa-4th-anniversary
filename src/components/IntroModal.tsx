import { X } from "lucide-react";

export function IntroModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-5 py-8 backdrop-blur-sm">
      <div className="surface animate-scale-in relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-card p-7 text-center shadow-[var(--shadow-lift)] sm:p-9">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="press absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground active:scale-95 sm:hover:text-foreground"
        >
          <X className="size-5" strokeWidth={1.75} />
        </button>

        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Four years</p>
        <h2 className="font-display mt-4 text-2xl leading-tight text-foreground sm:text-3xl">
          Happy 4th Anniversary, my love! ❤️
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            Four years with you, and I still feel so lucky that I get to do life with you. I made a
            little scavenger hunt filled with games, clues, memories, and a few surprises along the
            way.
          </p>
          <p>Ready to see where it takes you? 👀</p>
          <p className="font-display text-foreground">Let the adventure begin. 🗝️💕</p>
        </div>
      </div>
    </div>
  );
}
