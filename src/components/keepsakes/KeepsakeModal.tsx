import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import type { Keepsake } from "@/lib/keepsakes";
import { PhotoCarousel } from "./PhotoCarousel";

export function KeepsakeModal({
  keepsake,
  onClose,
}: {
  keepsake: Keepsake | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!keepsake) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [keepsake, onClose]);

  if (!keepsake) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={keepsake.title}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-foreground/25 p-4 backdrop-blur-sm duration-300 animate-in fade-in sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="surface relative my-auto w-full max-w-sm rounded-[1.75rem] p-6 text-center duration-300 animate-in fade-in slide-in-from-bottom-6 zoom-in-95"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="press absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-muted-foreground active:scale-90 sm:hover:text-foreground"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>

        <span className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          {keepsake.category}
        </span>
        <h2 className="mt-2 font-display text-2xl leading-tight text-foreground">
          {keepsake.title}
        </h2>

        <PhotoCarousel
          images={keepsake.images ?? []}
          alt={keepsake.title}
          tint={keepsake.tint}
          tintFg={keepsake.tintFg}
          index={photo}
          onIndexChange={setPhoto}
        />

        <p className="mt-5 text-sm italic leading-relaxed text-foreground/70">
          {keepsake.shortDescription}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {keepsake.fullMessage}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-[0.7rem] text-muted-foreground">
          <Heart className="size-3" style={{ color: keepsake.tintFg }} strokeWidth={2} />
          Keepsake {keepsake.id}
        </span>
      </div>
    </div>
  );
}
