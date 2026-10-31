import { memo, useMemo, useRef, useState } from "react";
import { MAP_HEIGHT, MAP_WIDTH, pathFor, STATE_FEATURES } from "../lib/geo";
import { SMALL_STATES, STATE_BY_CODE, STATE_BY_FIPS } from "../data/states";
import type { Tone } from "../data/topics";

export interface MapState {
  tone: Tone | "none";
  label: string;
}

interface Props {
  values: Record<string, MapState>;
  selected: string | null;
  onSelect: (code: string) => void;
}

// Pre-compute each state's path and label position once.
const SHAPES = STATE_FEATURES.map((f) => {
  const st = STATE_BY_FIPS[f.id];
  const [cx, cy] = pathFor.centroid(f);
  return { code: st.code, name: st.name, d: pathFor(f) ?? "", cx, cy };
});

// Labels sit where they fit; small Northeast states get chips instead.
const LABEL_NUDGE: Record<string, [number, number]> = {
  FL: [12, 6],
  LA: [-10, 0],
  MI: [10, 22],
  ID: [0, 16],
  KY: [6, 2],
  CA: [-8, 0],
  HI: [6, 6],
  AK: [0, 0],
};

const DARK_TEXT_TONES = new Set(["protect", "middle", "caution"]);

function UsMapInner({ values, selected, onSelect }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ code: string; x: number; y: number } | null>(null);

  const labels = useMemo(
    () =>
      SHAPES.filter((s) => !SMALL_STATES.includes(s.code) && Number.isFinite(s.cx)).map((s) => {
        const [dx, dy] = LABEL_NUDGE[s.code] ?? [0, 0];
        return { code: s.code, x: s.cx + dx, y: s.cy + dy };
      }),
    [],
  );

  function move(e: React.PointerEvent, code: string) {
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box) return;
    if (e.pointerType === "touch") return;
    // Keep the tooltip inside the map so it never pushes the page sideways.
    const x = Math.min(Math.max(e.clientX - box.left, 100), box.width - 100);
    setHover({ code, x, y: Math.max(e.clientY - box.top, 60) });
  }

  const hv = hover ? values[hover.code] : null;

  return (
    <div ref={wrapRef} style={{ position: "relative" }} onPointerLeave={() => setHover(null)}>
      <svg
        className="map-svg"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="group"
        aria-label="Map of U.S. states, colored by the selected topic"
      >
        {SHAPES.map((s) => {
          const v = values[s.code];
          return (
            <path
              key={s.code}
              d={s.d}
              className={`st fill-${v?.tone ?? "none"}${selected === s.code ? " sel" : ""}`}
              tabIndex={SMALL_STATES.includes(s.code) ? -1 : 0}
              role="button"
              aria-label={`${s.name}: ${v?.label ?? "not yet researched"}`}
              aria-pressed={selected === s.code}
              onClick={() => onSelect(s.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(s.code);
                }
              }}
              onPointerMove={(e) => move(e, s.code)}
            />
          );
        })}
        {/* Draw the selected outline on top so neighbors don't cover it. */}
        {selected && (
          <path
            d={SHAPES.find((s) => s.code === selected)?.d}
            fill="none"
            stroke="var(--paint)"
            strokeWidth={2.5}
            pointerEvents="none"
          />
        )}
        {labels.map((l) => {
          const tone = values[l.code]?.tone ?? "none";
          return (
            <text key={l.code} x={l.x} y={l.y} className={DARK_TEXT_TONES.has(tone) ? "" : "on-dark"} aria-hidden="true">
              {l.code}
            </text>
          );
        })}
      </svg>
      {hover && (
        <div className="tooltip" style={{ left: hover.x, top: hover.y }} aria-hidden="true">
          <strong>{STATE_BY_CODE[hover.code].name}</strong>
          {hv?.label ?? "Not yet researched"}
        </div>
      )}
    </div>
  );
}

export default memo(UsMapInner);
