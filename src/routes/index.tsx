import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Home } from "@/components/Home";
import { LockScreen } from "@/components/LockScreen";
import { IntroModal } from "@/components/IntroModal";
import { useProgress } from "@/lib/progress";

const INTRO_KEY = "anniversary-intro-seen";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Little Adventure — An Anniversary Scavenger Hunt" },
      {
        name: "description",
        content:
          "A cozy, passcode-protected anniversary scavenger hunt with nine little mysteries to discover together.",
      },
      { property: "og:title", content: "Our Little Adventure — An Anniversary Scavenger Hunt" },
      {
        property: "og:description",
        content: "A cozy, passcode-protected anniversary scavenger hunt with nine little mysteries to discover together.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { progress, loaded, unlock } = useProgress();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!loaded || !progress.unlocked) return;
    if (sessionStorage.getItem(INTRO_KEY)) return;
    setShowIntro(true);
  }, [loaded, progress.unlocked]);

  const closeIntro = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setShowIntro(false);
  };

  if (!loaded) return <div className="min-h-dvh" />;
  if (!progress.unlocked) return <LockScreen onUnlocked={unlock} />;

  return (
    <>
      <Home completedGames={progress.completedGames} />
      {showIntro && <IntroModal onClose={closeIntro} />}
    </>
  );

}
