const STAGES = [
  { y: 36, label: "user query" },
  { y: 132, label: "retrieve + filter" },
  { y: 228, label: "assemble context" },
  { y: 324, label: "generate" },
];

const COLS = [300, 336, 372, 408, 444, 480];
const ROWS = [48, 84, 120, 156, 192, 228, 264, 300];
const TOP_K = new Set(["372-120", "408-192", "336-228"]);

/**
 * Abstract view of a retrieval pipeline: query → filtered vector lookup →
 * context assembly → generation. Decorative, so hidden from assistive tech;
 * the surrounding copy carries the same meaning in text.
 */
export function RetrievalDiagram() {
  return (
    <svg
      viewBox="0 0 520 420"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className="h-auto w-full"
    >
      <text x="300" y="26" className="fill-copy-muted font-mono text-[13px]">
        vector index
      </text>

      {COLS.map((cx) =>
        ROWS.map((cy) => {
          const hit = TOP_K.has(`${cx}-${cy}`);
          return (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={hit ? 5 : 3}
              className={hit ? "fill-accent" : "fill-ink-line"}
            />
          );
        }),
      )}

      {[
        "M 372 120 Q 300 132 232 152",
        "M 408 192 Q 310 190 232 160",
        "M 336 228 Q 292 200 232 166",
      ].map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          strokeWidth="1.5"
          className="flow-line stroke-accent/70"
        />
      ))}

      <text x="252" y="196" className="fill-copy-muted font-mono text-[13px]">
        top-k
      </text>

      {STAGES.slice(0, -1).map((stage) => (
        <line
          key={stage.y}
          x1="122"
          y1={stage.y + 48}
          x2="122"
          y2={stage.y + 96}
          strokeWidth="1.5"
          className="flow-line stroke-accent/60"
        />
      ))}

      {STAGES.map((stage) => (
        <g key={stage.label}>
          <rect
            x="24"
            y={stage.y}
            width="196"
            height="48"
            rx="10"
            className="fill-ink-raised stroke-ink-line"
            strokeWidth="1"
          />
          <text x="44" y={stage.y + 29} className="fill-copy-secondary font-mono text-[13px]">
            {stage.label}
          </text>
        </g>
      ))}

      <rect
        x="24"
        y="324"
        width="196"
        height="48"
        rx="10"
        fill="none"
        strokeWidth="1.5"
        className="stroke-accent/60"
      />
    </svg>
  );
}
