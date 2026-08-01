import confetti from "canvas-confetti";

const PASTELS = [
  "#F7C8C0",
  "#F9DFC0",
  "#FBEFC2",
  "#D6EFD1",
  "#C8E1F2",
  "#DCD2F0",
  "#F6D0E4",
  "#FFFFFF",
];

const PINKS = ["#F4A6B8", "#F7C8D8", "#EBA9C3"];

function heartShape() {
  // soft heart drawn from text — renders as a small pastel heart
  return confetti.shapeFromText({ text: "❤", scalar: 2 });
}

function sparkleShape() {
  return confetti.shapeFromText({ text: "✦", scalar: 1.6 });
}

/** Elegant, soft celebration burst lasting ~2.5s. */
export function launchCelebrationConfetti() {
  if (typeof window === "undefined") return;

  let heart: confetti.Shape | undefined;
  let sparkle: confetti.Shape | undefined;
  try {
    heart = heartShape();
    sparkle = sparkleShape();
  } catch {
    /* text shapes unsupported — fall back to default shapes */
  }

  const end = Date.now() + 2500;

  const drift = () => {
    confetti({
      particleCount: 4,
      startVelocity: 18,
      spread: 70,
      ticks: 260,
      gravity: 0.5,
      decay: 0.94,
      scalar: 0.9,
      shapes: ["circle", "square"],
      colors: PASTELS,
      origin: { x: Math.random(), y: -0.05 },
      disableForReducedMotion: true,
    });

    confetti({
      particleCount: 2,
      startVelocity: 22,
      spread: 60,
      ticks: 220,
      gravity: 0.45,
      scalar: 1.1,
      shapes: heart ? [heart] : ["circle"],
      colors: PINKS,
      origin: { x: Math.random(), y: -0.05 },
      disableForReducedMotion: true,
    });

    if (Math.random() > 0.5) {
      confetti({
        particleCount: 2,
        startVelocity: 14,
        spread: 90,
        ticks: 200,
        gravity: 0.3,
        scalar: 0.7,
        shapes: sparkle ? [sparkle] : ["star"],
        colors: ["#FFFFFF", "#FBEFC2", "#F7C8D8"],
        origin: { x: Math.random(), y: Math.random() * 0.3 },
        disableForReducedMotion: true,
      });
    }

    if (Date.now() < end) requestAnimationFrame(drift);
  };

  // a gentle opening puff from the middle
  confetti({
    particleCount: 40,
    spread: 100,
    startVelocity: 28,
    gravity: 0.6,
    scalar: 0.9,
    ticks: 220,
    colors: [...PASTELS, ...PINKS],
    origin: { x: 0.5, y: 0.45 },
    disableForReducedMotion: true,
  });

  drift();
}
