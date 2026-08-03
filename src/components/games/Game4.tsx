import { useState } from "react";

type Step = 1 | 2 | 3 | 4;

export function Game4() {
  const [step, setStep] = useState<Step>(1);

  if (step === 1) {
    return (
      <Card>
        <h1 className="text-3xl">
          Wrong Turns
        </h1>

        <p className="max-w-sm leading-relaxed text-muted-foreground">
          Life doesn't always give us a straight path.
        </p>

        <p className="max-w-sm leading-relaxed text-muted-foreground">
          Sometimes we get lost, make wrong turns, or have to start over.
        </p>

        <p className="max-w-sm leading-relaxed text-muted-foreground">
          But every little step still brings us somewhere.
        </p>

        <p className="max-w-sm font-medium">
          And I'll always be cheering for you until you reach the finish. ❤️
        </p>

        <PrimaryButton
          onClick={() => setStep(2)}
        >
          Begin
        </PrimaryButton>
      </Card>
    );
  }

  return (
    <Card>

      <h2 className="text-2xl">
        Maze coming next...
      </h2>

    </Card>
  );
}

function Card({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <section
      className="surface mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl border p-8 text-center"
      style={{
        borderColor:"#F9DFC0",
        background:"#FFF9F2"
      }}
    >
      {children}
    </section>
  );
}

function PrimaryButton({
  children,
  onClick,
}:{
  children:React.ReactNode;
  onClick:()=>void;
}) {
  return (

<button
onClick={onClick}
className="rounded-full px-8 py-3 font-medium transition hover:scale-105"
style={{
background:"#F9DFC0"
}}
>

{children}

</button>

  );
}