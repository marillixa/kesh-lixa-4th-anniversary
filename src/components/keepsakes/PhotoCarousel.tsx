import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

/**
 * Swipeable 4:5 photo frame.
 * Landscape photos are never cropped (contain, tint fills the gaps);
 * portrait photos fill the frame (cover).
 */
export function PhotoCarousel({
  images,
  alt,
  tint,
  tintFg,
  index,
  onIndexChange,
}: {
  images: string[];
  alt: string;
  tint: string;
  tintFg: string;
  index: number;
  onIndexChange: (i: number) => void;
}) {
  const count = images.length;
  const [drag, setDrag] = useState(0);
  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});
  const startX = useRef<number | null>(null);
  const width = useRef(1);
  const frameRef = useRef<HTMLDivElement>(null);

  if (count === 0) {
    return (
      <div
        className="mt-5 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl"
        style={{ backgroundColor: tint }}
      >
        <ImageIcon className="size-7" style={{ color: tintFg }} strokeWidth={1.25} />
      </div>
    );
  }

  const clamp = (i: number) => Math.max(0, Math.min(count - 1, i));

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    width.current = frameRef.current?.clientWidth || 1;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    // resist at the edges
    const resist =
      (index === 0 && dx > 0) || (index === count - 1 && dx < 0) ? 0.3 : 1;
    setDrag(dx * resist);
  };

  const endDrag = () => {
    if (startX.current === null) return;
    const threshold = Math.min(70, width.current * 0.18);
    if (drag <= -threshold) onIndexChange(clamp(index + 1));
    else if (drag >= threshold) onIndexChange(clamp(index - 1));
    startX.current = null;
    setDrag(0);
  };

  const dragging = startX.current !== null;

  return (
    <div className="mt-5">
      <div
        ref={frameRef}
        className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden rounded-2xl"
        style={{ backgroundColor: tint }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
            transition: dragging ? "none" : "transform 350ms cubic-bezier(0.22,0.61,0.36,1)",
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="h-full w-full shrink-0">
              {Math.abs(i - index) <= 1 ? (
                <img
                  src={src}
                  alt={`${alt} — photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onLoad={(e) => {
                    const el = e.currentTarget;
                    const fit = el.naturalWidth > el.naturalHeight ? "contain" : "cover";
                    setFits((f) => (f[i] === fit ? f : { ...f, [i]: fit }));
                  }}
                  className="size-full"
                  style={{ objectFit: fits[i] ?? "cover", objectPosition: "center" }}
                />
              ) : null}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => onIndexChange(clamp(index - 1))}
              disabled={index === 0}
              className="absolute left-2 top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground/70 backdrop-blur-sm transition-opacity disabled:opacity-0 sm:flex sm:hover:text-foreground"
            >
              <ChevronLeft className="size-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => onIndexChange(clamp(index + 1))}
              disabled={index === count - 1}
              className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground/70 backdrop-blur-sm transition-opacity disabled:opacity-0 sm:flex sm:hover:text-foreground"
            >
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => onIndexChange(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 16 : 6,
                height: 6,
                backgroundColor: i === index ? tintFg : tint,
                opacity: i === index ? 1 : 0.8,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
