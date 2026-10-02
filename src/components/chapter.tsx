import type { CSSProperties } from "react";

/** Liquid-glass chapter pill ("01 / About"), shared by every section. */
export function Chapter({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p
      className={`liquid-glass inline-block w-fit rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-copy-primary ${className}`}
      style={style}
    >
      {children}
    </p>
  );
}
