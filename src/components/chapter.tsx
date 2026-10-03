import type { CSSProperties } from "react";

/** Liquid-glass chapter pill ("01 / About"), shared by every section. */
export function Chapter({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p
      className={`liquid-glass inline-block w-fit rounded-full px-5 py-2 t-label text-copy-primary ${className}`}
      style={style}
    >
      {children}
    </p>
  );
}

/** Small liquid-glass icon badge with an accent glow; replaces bare glyph markers. */
export function IconBadge({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span
      aria-hidden="true"
      className="liquid-glass grid h-11 w-11 place-items-center rounded-full bg-accent/10 shadow-[0_0_24px_rgba(76,159,255,0.28)]"
    >
      <Icon className="h-[18px] w-[18px] text-accent-soft" />
    </span>
  );
}
