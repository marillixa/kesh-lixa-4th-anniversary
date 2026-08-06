import { createFileRoute, Link } from "@tanstack/react-router";
import { KeepsakesSection } from "@/components/keepsakes/KeepsakesSection";
import { useProgress } from "@/lib/progress";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

export const Route = createFileRoute("/keepsakes")({
  head: () => ({
    meta: [
      { title: "Keepsakes — Our Little Adventure" },
      {
        name: "description",
        content: "A cozy collection of keepsakes unlocked one by one along our anniversary scavenger hunt.",
      },
      { property: "og:title", content: "Keepsakes — Our Little Adventure" },
      {
        property: "og:description",
        content: "A cozy collection of keepsakes unlocked one by one along our anniversary scavenger hunt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KeepsakesPage,
});

function KeepsakesPage() {
  const { progress, loaded } = useProgress();

  if (!loaded) return <div className="min-h-dvh" />;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 pb-20 pt-10 sm:px-8">
      <Link
        to="/"
        className="animate-fade-up text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back
      </Link>

      <div className="-mt-6">
        <KeepsakesSection completedGames={progress.completedGames} />
      </div>
    </main>
  );
}
