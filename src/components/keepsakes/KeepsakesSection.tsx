import { useState } from "react";
import { KEEPSAKES, TOTAL_KEEPSAKES, isKeepsakeUnlocked, type Keepsake } from "@/lib/keepsakes";
import { KeepsakeCard } from "./KeepsakeCard";
import { KeepsakeModal } from "./KeepsakeModal";

export function KeepsakesSection({ completedGames }: { completedGames: number[] }) {
  const [open, setOpen] = useState<Keepsake | null>(null);
  const collected = KEEPSAKES.filter((k) => isKeepsakeUnlocked(k, completedGames)).length;

  return (
    <section className="mt-16">
      <header className="animate-fade-up text-center">
        <h2 className="font-display text-2xl text-foreground">❤️ Keepsakes</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {collected} / {TOTAL_KEEPSAKES} Collected
        </p>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {KEEPSAKES.map((k, i) => (
          <KeepsakeCard
            key={k.id}
            keepsake={k}
            index={i}
            unlocked={isKeepsakeUnlocked(k, completedGames)}
            onOpen={setOpen}
          />
        ))}
      </div>

      <KeepsakeModal keepsake={open} onClose={() => setOpen(null)} />
    </section>
  );
}
