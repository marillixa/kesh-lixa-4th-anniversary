import { useState, type ReactNode } from "react";
import { launchCelebrationConfetti } from "@/lib/confetti";

type Step = 1 | 2;

const DONUTS = [
  "donut1.png",
  "donut2.png",
  "donut3.png",
  "donut4.png",
  "donut5.png",
  "donut6.png",
  "donut7.png",
  "donut8.png",
  "donut9.png",
];

const ANSWER = [
  "donut3.png",
  "donut5.png",
  "donut8.png",
];

export function Game9() {
  const [step, setStep] = useState<Step>(1);

  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [wrongOrder, setWrongOrder] = useState(false);

  function chooseDonut(name: string) {
    if (solved) return;

    if (selected.includes(name)) return;

    if (selected.length >= 3) return;

    const next = [...selected, name];

    setSelected(next);

    if (next.length === 3) {

      const correct =
        ANSWER.every((d) => next.includes(d));

      if (correct) {

        setSolved(true);
        launchCelebrationConfetti();

      } else {

        setWrongOrder(true);

        setTimeout(() => {

          setWrongOrder(false);
          setSelected([]);

        }, 1000);

      }

    }
  }

  function removeDonut(name: string) {
    if (solved) return;

    setSelected(
      selected.filter((d) => d !== name)
    );
  }

  return (
    <div className="flex flex-1 flex-col">

      {step === 1 && (

        <Card>

          <h1 className="text-3xl">
            Our Little Tradition
          </h1>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Some memories aren't made from grand adventures.
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Sometimes they're made from tiny routines...
          </p>

          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Like knowing exactly what we'd order together.
          </p>

          <p className="font-medium">
            Let's see if you remember ours. ❤️
          </p>

          <PrimaryButton
            onClick={() => setStep(2)}
          >
            Begin
          </PrimaryButton>

        </Card>

      )}

      {step === 2 && (

        <GameBoard
          selected={selected}
          solved={solved}
          wrongOrder={wrongOrder}
          chooseDonut={chooseDonut}
          removeDonut={removeDonut}
          openEnvelope={openEnvelope}
          setOpenEnvelope={setOpenEnvelope}
        />

      )}

    </div>
  );
}

function GameBoard({
  selected,
  solved,
  wrongOrder,
  chooseDonut,
  removeDonut,
  openEnvelope,
  setOpenEnvelope,
}: any) {
  return (
    <Card>

      <p className="uppercase text-xs tracking-[0.35em] text-muted-foreground">
        Game 9
      </p>

      <h2 className="text-3xl">
        Our Usual Donut Order 🍩
      </h2>

      <div className="grid grid-cols-3 gap-4">

        {DONUTS.map((donut) => {

          const chosen =
            selected.includes(donut);

          return (

            <button
              key={donut}
              disabled={chosen || solved}
              onClick={() => chooseDonut(donut)}
              className="transition hover:scale-110 disabled:opacity-40"
            >

              <img
                src={`/images/puzzle/${donut}`}
                className="h-24 w-24 object-contain"
              />

            </button>

          );

        })}

      </div>

      <div
  className={`mt-8 w-full max-w-sm rounded-3xl border-2 bg-white p-6 transition ${
    wrongOrder ? "animate-shake-gentle" : ""
  }`}
  style={{
    borderColor: "#f0d9c7",
  }}
>

  <p className="mb-4 text-center text-sm text-muted-foreground">
    Our Order
  </p>

  <div className="flex justify-center gap-4">

    {[0,1,2].map((slot)=>{

      const donut = selected[slot];

      return (

        <button
          key={slot}
          onClick={()=>{
            if(donut) removeDonut(donut);
          }}
          className="flex h-24 w-24 items-center justify-center rounded-2xl border bg-[#fffaf6]"
        >

          {donut ? (

            <img
              src={`/images/puzzle/${donut}`}
              className="h-20 w-20 object-contain animate-soft-in"
            />

          ) : (

            <span className="text-4xl opacity-20">
              🍩
            </span>

          )}

        </button>

      );

    })}

  </div>

  {wrongOrder && (

    <p className="mt-5 text-center text-sm">
      That doesn't look like our order... ❤️
    </p>

  )}

</div>

{solved && (

<>
{!openEnvelope ? (

<button
onClick={()=>setOpenEnvelope(true)}
className="mt-8 animate-bounce text-7xl"
>

✉️

</button>

) : (

<button
onClick={()=>setOpenEnvelope(false)}
className="surface mt-6 max-w-sm rounded-3xl p-6 text-center"
>

<p className="uppercase text-xs tracking-[0.3em] text-muted-foreground">
Your next clue
</p>

<p className="mt-5 text-lg">
❤️
</p>

<p className="mt-4 leading-relaxed">

Look at the place where the ONLY cat in the house lives.

</p>

<p className="mt-6 text-xs text-muted-foreground">
Tap to close
</p>

</button>

)}

</>

)}

    </Card>
  );
}

function Card({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      className="surface animate-soft-in mt-8 flex flex-1 flex-col items-center justify-center gap-6 rounded-3xl p-8 text-center"
      style={{
        background: "#faf7f4",
        border: "1px solid #f0d9c7",
      }}
    >
      {children}
    </section>
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-8 py-3 font-medium transition hover:scale-105"
      style={{
        background: "#f0d9c7",
      }}
    >
      {children}
    </button>
  );
}
