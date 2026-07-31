import { Delete } from "lucide-react";

type KeypadProps = {
  onDigit: (d: string) => void;
  onDelete: () => void;
  disabled?: boolean;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function Keypad({ onDigit, onDelete, disabled }: KeypadProps) {
  return (
    <div className="grid w-full max-w-[19rem] grid-cols-3 gap-4">
      {KEYS.map((k) => (
        <KeypadButton key={k} label={k} onClick={() => onDigit(k)} disabled={disabled} />
      ))}
      <div aria-hidden />
      <KeypadButton label="0" onClick={() => onDigit("0")} disabled={disabled} />
      <button
        type="button"
        aria-label="Delete"
        onClick={onDelete}
        disabled={disabled}
        className="press mx-auto flex size-[4.5rem] items-center justify-center rounded-full text-muted-foreground active:scale-95 disabled:opacity-40"
      >
        <Delete className="size-6" strokeWidth={1.5} />
      </button>
    </div>
  );
}

function KeypadButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="surface press mx-auto flex size-[4.5rem] items-center justify-center rounded-full text-2xl font-light tracking-wide text-foreground active:scale-95 disabled:opacity-40 sm:hover:shadow-[var(--shadow-lift)]"
    >
      {label}
    </button>
  );
}
